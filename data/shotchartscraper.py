# scraping NBA player information tutorial from http://www.gregreda.com/2015/02/15/web-scraping-finding-the-api/
from __future__ import division

import requests
import json
import numpy

players = ["201939"]

seasons =["2015-16","2014-15","2013-14"]

x = []
y = []
made = []
attempts = []
percentage = []

i=0

for player in players:
    for season in seasons:
        shots_url = 'http://stats.nba.com/stats/shotchartdetail?CFID=33&CFPAR'+\
        'AMS='+season+'&ContextFilter=&ContextMeasure=FGA&DateFrom=&D'+\
        'ateTo=&GameID=&GameSegment=&LastNGames=0&LeagueID=00&Loca'+\
        'tion=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&'+\
        'PaceAdjust=N&PerMode=PerGame&Period=0&PlayerID='+player+'&Plu'+\
        'sMinus=N&Position=&Rank=N&RookieYear=&Season='+season+'&Seas'+\
        'onSegment=&SeasonType=Regular+Season&TeamID=0&VsConferenc'+\
        'e=&VsDivision=&mode=Advanced&showDetails=0&showShots=1&sh'+\
        'owZones=0';

        # request the URL and parse the JSON
        response = requests.get(shots_url)
        response.raise_for_status() # raise exception if invalid response
        headers = response.json()['resultSets'][0]['headers']
        shots = response.json()['resultSets'][0]['rowSet']

        tenderData = []

        for value in shots:
            valx = ((shots[i][-4:-3][0] + 243) // 10)
            valy = ((shots [i][-3:-2][0] + 17) // 9)

            x.append(valx)
            y.append(valy)

            scored = shots[i][-1:][0]
            tries = shots[i][-2:-1][0]

            made.append(scored)
            attempts.append(tries)

            i+=1

        i=0

        perc = (sum(made)/sum(attempts))

        for value in shots:
            tenderData.append({"x": x[i], "y":y[i], "made": made[i], "attempts": attempts[i], "z": 1})
            i+=1
        i=0

        # pretty print json file
        with open("shotchartdata/" + player + "/" + season + ".json", 'w') as outputjson:
            json.dump(tenderData, outputjson)
