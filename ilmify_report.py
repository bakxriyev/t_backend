#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json, subprocess, datetime, glob, os, time, urllib.request, urllib.parse

CHAT_ID = "-1004294135248"
BOT_TOKEN = "8741066167:AAHpiNsi-WXcvBkZyaf0YIFRq4zRabXbhK4"
TRACK = ["ilmify-api", "ilmify-admin", "ilmify-frontend", "tashkentlaw-api"]


def run(cmd):
    try:
        return subprocess.check_output(cmd).decode()
    except Exception:
        return ""


def cpu_now():
    with open("/proc/stat") as f:
        p = f.readline().split()[1:]
    return int(p[3]), sum(int(x) for x in p)


def build_report():
    up = run(["uptime"])
    ux = up.split("up", 1)[1].split("load", 1)[0].strip() if "up" in up else "?"

    load = os.getloadavg()[0]
    cores = os.cpu_count()

    d = {}
    with open("/proc/meminfo") as f:
        for line in f:
            k, v = line.split(":")
            d[k] = int(v.strip().split()[0])
    ram_total = d["MemTotal"] / 1048576
    ram_avail = d["MemAvailable"] / 1048576

    disk = run(["df", "-P", "/"]).splitlines()[1].split()

    i1, t1 = cpu_now()
    time.sleep(1)
    i2, t2 = cpu_now()
    cpu_pct = round((1 - (i2 - i1) / (t2 - t1)) * 100, 1)

    apps = {}
    try:
        data = json.loads(run(["pm2", "jlist"]))
        for a in data:
            env = a.get("pm2_env", {})
            mon = a.get("monit", {})
            if a["name"] in TRACK:
                apps[a["name"]] = {"status": env.get("status"),
                                   "mem": round(mon.get("memory", 0) / 1048576, 0),
                                   "cpu": mon.get("cpu", 0),
                                   "restarts": env.get("restart_time", 0)}
    except Exception:
        pass

    files = glob.glob("/var/backups/ilmify/backup_*.sql.gz")
    if files:
        newest = max(files, key=os.path.getmtime)
        age_h = round((time.time() - os.path.getmtime(newest)) / 3600, 1)
        fsize = run(["du", "-h", newest]).split()[0]
        bak = os.path.basename(newest) + " | " + fsize + " | " + str(age_h) + "s avval"
    else:
        bak = "YO'Q"

    f2b = run(["fail2ban-client", "status", "sshd"])
    c = [l for l in f2b.splitlines() if "Total banned" in l]
    banned = (c[0].split(":")[-1].strip() if c else "?")

    ufw = "active" if "Status: active" in run(["ufw", "status"]) else "INACTIVE"

    ports = []
    out = run(["ss", "-tlnp"])
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
            ports.append(int(port))
        except Exception:
            pass
    ports = sorted(set(ports))

    now = datetime.datetime.now().strftime("%d.%m.%Y %H:%M")

    lines = []
    lines.append("📊 ILMIFY SERVER HOLATI")
    lines.append("🕒 " + now + " (Toshkent)")
    lines.append("")
    lines.append("🖥️ CPU: " + str(cpu_pct) + "%  |  📈 Load: " + "%.2f" % load + " / " + str(cores) + " yadro")
    lines.append("💾 RAM: %.1f GB bo'sh / %.1f GB (%.0f%% ishlatilgan)" % (ram_avail, ram_total, (1 - ram_avail / ram_total) * 100))
    lines.append("💿 Disk: " + disk[4] + " ishlatilgan")
    lines.append("⏱️ Uptime: " + ux)
    lines.append("")
    lines.append("🚀 Ilovalar:")
    for name in TRACK:
        a = apps.get(name)
        if a:
            ic = "🟢" if a["status"] == "online" else "🔴"
            lines.append(" " + ic + " " + name + "  [mem " + str(a["mem"]) + "MB | cpu " + str(a["cpu"]) + "% | restarts " + str(a["restarts"]) + "]")
        else:
            lines.append(" ⚪ " + name + "  (topilmadi)")
    lines.append("")
    lines.append("🔒 Xavfsizlik:")
    lines.append(" • UFW: " + ufw)
    lines.append(" • fail2ban: " + banned + " ta IP bloklangan")
    lines.append(" • Ochiq portlar: " + (", ".join(str(p) for p in ports) if ports else "—"))
    lines.append("")
    lines.append("🗄️ Backup: " + bak)
    return "\n".join(lines)


def tg_send(chat_id, text):
    data = urllib.parse.urlencode({"chat_id": chat_id, "text": text}).encode()
    try:
        req = urllib.request.Request("https://api.telegram.org/bot%s/sendMessage" % BOT_TOKEN, data=data)
        with urllib.request.urlopen(req, timeout=20) as r:
            return json.loads(r.read()).get("ok") is True
    except Exception:
        return False