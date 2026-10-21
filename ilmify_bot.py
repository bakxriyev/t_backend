#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json, subprocess, sys, time, urllib.request, urllib.parse

sys.path.insert(0, "/usr/local/bin")
from ilmify_report import build_report, tg_send

BOT_TOKEN = "8741066167:AAHpiNsi-WXcvBkZyaf0YIFRq4zRabXbhK4"
offset = 0
LOG = "/var/log/ilmify-bot.log"


def log(msg):
    line = "[%s] %s" % (time.strftime("%Y-%m-%d %H:%M:%S"), msg)
    try:
        with open(LOG, "a") as f:
            f.write(line + "\n")
    except Exception:
        pass
    print(line)


def get_updates(off, timeout=25):
    url = "https://api.telegram.org/bot%s/getUpdates?timeout=%d&offset=%d" % (BOT_TOKEN, timeout, off)
    try:
        with urllib.request.urlopen(url, timeout=timeout + 10) as r:
            return json.loads(r.read()).get("result", [])
    except Exception as e:
        log("poll xato: %s" % e)
        return []


log("Bot ishga tushdi — /test yoki /holat so'zlarini kutmoqda...")

while True:
    ups = get_updates(offset)
    for u in ups:
        offset = u["update_id"] + 1
        msg = u.get("channel_post") or u.get("message")
        if not msg:
            continue
        chat_id = msg.get("chat", {}).get("id")
        text = (msg.get("text") or "").strip().lower()
        if not text or not chat_id:
            continue
        log("Xabar keldi (chat=%s): %s" % (chat_id, text))
        if any(k in text for k in ["backup"]):
            tg_send(chat_id, "⏳ Backup olinyapti (bir necha soniya)...")
            try:
                rc = subprocess.call(["/usr/local/bin/ilmify_backup.sh"], timeout=600)
            except Exception as e:
                rc = 1
                log("backup subprocess xato: %s" % e)
            if rc == 0:
                tg_send(chat_id, "✅ Backup olindi va kanalga yuborildi.")
                log("Backup buyrug'i bajarildi (chat=%s)" % chat_id)
            else:
                tg_send(chat_id, "❌ Backup da XATO yuz berdi — /usr/local/bin/ilmify_backup.sh logini tekshiring.")
                log("Backup buyrug'i XATO (chat=%s)" % chat_id)
        elif any(k in text for k in ["test", "holat", "status", "salom", "start"]):
            report = build_report()
            if tg_send(chat_id, report):
                log("Hisobot yuborildi (chat=%s)" % chat_id)
            else:
                log("Hisobot yuborishda XATO (chat=%s)" % chat_id)
    time.sleep(1)