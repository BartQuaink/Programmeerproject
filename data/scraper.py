# scraping NBA player information tutorial from http://www.gregreda.com/2015/02/15/web-scraping-finding-the-api/

import requests
import json

players = ["201939"]

for player in players:
    shots_url = 'http://stats.nba.com/stats/shotchartdetail?CFID=33&CFPAR'+\
    'AMS=2014-15&ContextFilter=&ContextMeasure=FGA&DateFrom=&D'+\
    'ateTo=&GameID=&GameSegment=&LastNGames=0&LeagueID=00&Loca'+\
    'tion=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&'+\
    'PaceAdjust=N&PerMode=PerGame&Period=0&PlayerID='+player+'&Plu'+\
    'sMinus=N&Position=&Rank=N&RookieYear=&Season=2014-15&Seas'+\
    'onSegment=&SeasonType=Regular+Season&TeamID=0&VsConferenc'+\
    'e=&VsDivision=&mode=Advanced&showDetails=0&showShots=1&sh'+\
    'owZones=0';

    # request the URL and parse the JSON
    response = requests.get(shots_url)
    response.raise_for_status() # raise exception if invalid response
    shots = response.json()['resultSets'][0]['rowSet']

    # pretty print json file
    with open(player+"json.json", 'w') as outputjson:
        json.dump(shots, outputjson, indent=4)
