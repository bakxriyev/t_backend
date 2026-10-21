#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json, os, subprocess, time, datetime, glob, urllib.request, urllib.parse

STATE = "/var/lib/ilmify-monitor"
LOG = "/var/log/ilmify-monitor.log"
CHAT_ID = "-1004294135248"
BOT_TOKEN = "8741066167:AAHpiNsi-WXcvBkZyaf0YIFRq4zRabXbhK4"
TRACK_APPS = ["ilmify-api", "ilmify-admin", "ilmify-frontend", "tashkentlaw-api"]
SUSPICIOUS = ["xmrig", "minerd", "kdevtmpfsi", "kinsing", "c3pool", "watchdogs", "kworkerds", "cronb", "sysupdate", "networkservice", "xmrigdaemon", "donate"]

os.makedirs(STATE, exist_ok=True)

def log(msg):
    line = "[%s] %s" % (datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"), msg)
    try:
        with open(LOG, "a") as f:
            f.write(line + "\n")
    except Exception:
        pass
    print(line)

def tg(text):
    data = urllib.parse.urlencode({"chat_id": CHAT_ID, "text": text}).encode()
    try:
        req = urllib.request.Request("https://api.telegram.org/bot%s/sendMessage" % BOT_TOKEN, data=data)
        with urllib.request.urlopen(req, timeout=20) as r:
            ok = json.loads(r.read()).get("ok")
        log("TG yuborildi OK" if ok else "TG javob ok emas")
    except Exception as e:
        log("TG xato: %s" % e)

def sget(n):
    return os.path.exists(os.path.join(STATE, "s_" + n))

def sset(n):
    open(os.path.join(STATE, "s_" + n), "w").close()

def sclr(n):
    p = os.path.join(STATE, "s_" + n)
    if os.path.exists(p):
        os.remove(p)

def cpu_usage():
    def rd():
        with open("/proc/stat") as f:
            parts = f.readline().split()[1:]
        return int(parts[3]), sum(int(x) for x in parts)
    i1, t1 = rd()
    time.sleep(2)
    i2, t2 = rd()
    return round((1 - (i2 - i1) / (t2 - t1)) * 100, 1)

def ram_info():
    d = {}
    with open("/proc/meminfo") as f:
        for line in f:
            k, v = line.split(":")
            d[k] = int(v.strip().split()[0])
    total = d["MemTotal"]
    avail = d["MemAvailable"]
    return round((total - avail) / total * 100, 1), round((total - avail) / 1048576, 1), round(total / 1048576, 1)

def disk_info():
    o = subprocess.check_output(["df", "-P", "/"]).decode().splitlines()[1].split()
    return int(o[4].rstrip("%")), round(int(o[2]) / 1048576, 0), round(int(o[1]) / 1048576, 0)

def pm2_apps():
    try:
        data = json.loads(subprocess.check_output(["pm2", "jlist"], timeout=15))
    except Exception as e:
        log("pm2 jlist xato: %s" % e)
        return {}
    out = {}
    for a in data:
        env = a.get("pm2_env", {})
        mon = a.get("monit", {})
        out[a["name"]] = {"status": env.get("status"),
                          "restarts": env.get("restart_time", 0),
                          "mem_mb": round(mon.get("memory", 0) / 1048576, 0),
                          "cpu": mon.get("cpu", 0)}
    return out

def suspicious_procs():
    try:
        out = subprocess.check_output(["ps", "aux"]).decode().lower()
    except Exception:
        return []
    return [p for p in SUSPICIOUS if p in out]

def public_ports():
    try:
        out = subprocess.check_output(["ss", "-tlnp"]).decode()
    except Exception:
        return set()
    ports = set()
    for line in out.splitlines()[1:]:
        cols = line.split()
        if len(cols) < 4:
            continue
        local = cols[3]
        addr, port = local.rsplit(":", 1)
        base = addr.split("%")[0]
        if base in ("127.0.0.1", "::1", "127.0.0.53", "[::1]") or base.startswith("127."):
            continue
        try:
            ports.add(int(port))
        except Exception:
            pass
    return ports

def backup_age_h():
    files = glob.glob("/var/backups/ilmify/backup_*.sql.gz")
    if not files:
        return None
    newest = max(files, key=os.path.getmtime)
    return round((time.time() - os.path.getmtime(newest)) / 3600, 1)

msgs = []
cores = os.cpu_count()
load = os.getloadavg()[0]
TS = datetime.datetime.now().strftime("%d.%m %H:%M")

apps = pm2_apps()
restarts_file = os.path.join(STATE, "restarts.json")
try:
    stored_restarts = json.load(open(restarts_file))
except Exception:
    stored_restarts = {}

for name in TRACK_APPS:
    a = apps.get(name)
    if a is None:
        if not sget("app_" + name):
            sset("app_" + name)
        msgs.append("🟠 %s: PM2 ro'yxatida yo'q (ishlamayapti)" % name)
        continue
    up = a["status"] == "online"
    if not up:
        if not sget("app_" + name):
            sset("app_" + name)
            msgs.append("🆘 %s TO'XTADI! (status: %s, mem: %sMB)" % (name, a["status"], a["mem_mb"]))
    else:
        if sget("app_" + name):
            sclr("app_" + name)
            msgs.append("✅ %s TIKLANDI (mem: %sMB)" % (name, a["mem_mb"]))
    prev = stored_restarts.get(name)
    cur = a["restarts"]
    if prev is not None and cur > prev + 2:
        msgs.append("⚠️ %s tez-tez qayta ishga tushmoqda (restartlar: %s)" % (name, cur))
    stored_restarts[name] = cur

json.dump(stored_restarts, open(restarts_file, "w"))

disk_pct, disk_used, disk_total = disk_info()
if disk_pct >= 85 and not sget("disk"):
    sset("disk")
    msgs.append("🟠 DISK to'lmoqda: %s%% (%s GB / %s GB)" % (disk_pct, disk_used, disk_total))
elif disk_pct < 80 and sget("disk"):
    sclr("disk")
    msgs.append("🟢 Disk holati normal: %s%%" % disk_pct)

ram_pct, ram_used, ram_total = ram_info()
if ram_pct >= 85 and not sget("ram"):
    sset("ram")
    msgs.append("🟠 RAM yuqori: %s%% (%s GB / %s GB)" % (ram_pct, ram_used, ram_total))
elif ram_pct <= 80 and sget("ram"):
    sclr("ram")
    msgs.append("🟢 RAM holati normal: %s%%" % ram_pct)

if load > cores * 0.9 and not sget("load"):
    sset("load")
    msgs.append("🟠 YUKLAMA yuqori: load=%.2f (CPU: %s yadro)" % (load, cores))
elif load < cores * 0.6 and sget("load"):
    sclr("load")
    msgs.append("🟢 Yuklama normal: load=%.2f" % load)

susp = suspicious_procs()
if susp:
    msgs.append("🔴 SHUBHALI JARAYON ANIQLANDI: %s" % json.dumps(susp))

ports = public_ports()
unknown = sorted(ports - {80, 443, 2244, 22, 3030, 4000, 4100, 4200})
if unknown:
    msgs.append("🔴 Notanish ochiq port(lar): %s" % unknown)

age = backup_age_h()
if age is not None and age > 26 and not sget("bak"):
    sset("bak")
    msgs.append("🟠 Backup %s soat davomida qilinmadi — tekshiring!" % age)
elif age is not None and age <= 12 and sget("bak"):
    sclr("bak")
    msgs.append("🟢 Backup qayta ishlayapti (oxirgisi %s soat avval)" % age)

if msgs:
    tg(TS + "\n\n" + "\n\n".join(msgs))
else:
    log("Holat normal — xabar yuborilmadi")