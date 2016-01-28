# scrapes the total 3 pointers made for the top 3 point shooters, needed for scatterplot, created seperately because different graphs are used

import requests
from lxml import html
import json
import re
import csv
from pattern.web import URL, DOM, plaintext
from collections import defaultdict

filterlist = ["1","2","3","4","5","6","7","8","9","0","/","-"]

playerlist = list()

players = ["3975/stephen-curry", "9/ray-allen", "552/reggie-miller", "841/jason-terry", "662/paul-pierce", "429/jason-kidd", "136/vince-carter", "165/jamal-crawford", "63/chauncey-billups", "2011/kyle-korver", "469/rashard-lewis", "813/peja-stojakovic", "1007/joe-johnson", "110/kobe-bryant"]

htmllink = "http://espn.go.com/nba/player/stats/_/id/"

output_file = open('total3pointers.json', 'w')

for player in players:
    TARGET_URL = URL(htmllink + player)
    dom = DOM(TARGET_URL.download(cached=True))
    dataofyear = dict()

    print player
    total3pointers = 0;

    for e in dom.by_tag("div.mod-container mod-table mod-player-stats"):
        for a in e.by_tag("div.mod-content")[1:2]:
            for tablehead in a.by_class("tablehead"):
                year = -1
                for oddrow in tablehead.by_class("oddrow"):
                    madeshots = oddrow[4].content[:3]
                    madeshots = int(madeshots.replace("-", ""))

                    total3pointers += int(madeshots)

                    year += 2

                year = 0
                for evenrow in tablehead.by_class("evenrow"):
                    madeshots = evenrow[4].content[:3]
                    madeshots = int(madeshots.replace("-", ""))

                    total3pointers += int(madeshots)

                    year += 2

                dataofyear["years"] = year
                dataofyear["player"] = re.sub("[^a-zA-Z]+", "", player)
                dataofyear["total3pointers"] = total3pointers

    playerlist.append(dataofyear)
    dataofyear = []

json.dump(playerlist, output_file, indent = 4)
output_file.write('\n')
