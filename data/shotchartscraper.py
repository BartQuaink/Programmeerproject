# scraping NBA player information tutorial from http://www.gregreda.com/2015/02/15/web-scraping-finding-the-api/
from __future__ import division

import requests
import json
import numpy

players = ["201939","397", "467", "951", "977", "978", "1497", "1713", "1718", "1740", "1891", "2037", "2207", "2594"]

seasons =["2015-16","2014-15","2013-14","2012-13", "2011-12","2010-11", "2009-10", "2008-09","2007-08", "2006-07","2005-06","2004-05","2003-04","2002-03", "2001-02", "2000-01", "1999-00", "1998-99", "1997-98", "1996-97", "1995-96", "1994-95", "1993-94", "1992-93", "1991-91", "1990-89", "1988-89", "1987-88"]

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
        print response
        response.raise_for_status() # raise exception if invalid response
        headers = response.json()['resultSets'][0]['headers']
        shots = response.json()['resultSets'][0]['rowSet']

        tenderData = []

        for value in shots:
            valx = ((shots[i][-4:-3][0] + 260) // 10)
            valy = ((shots [i][-3:-2][0] + 55) // 10)

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

        #print json file
        # if not (len(tenderData) == 0):
        if tenderData:
            print season
            with open("shotchartdata/" + player + "/" + season + ".json", 'w') as outputjson:
                json.dump(tenderData, outputjson)
