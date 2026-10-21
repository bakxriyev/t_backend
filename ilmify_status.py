#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys

sys.path.insert(0, "/usr/local/bin")
from ilmify_report import build_report, tg_send, CHAT_ID

report = build_report()
print(report)
ok = tg_send(CHAT_ID, report)
print("TG:", "OK" if ok else "XATO")