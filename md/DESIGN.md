# Design Document

In dit design document wordt de website op een wat technischere wijze toegelicht.

## Minimal Viable Product
Het minimale werkbare product wat ik werkend wil krijgen is tenminste de belangrijkste visualisaties: de shot chart en de scatterplot met daarin de data.
Het belangrijkste is om te laten zien dat Curry ook daadwerkelijk zover voorstaat op de andere spelers, met een scatterplot is dit mogelijk.
Vervolgens wil ik tenminste dat de interactiviteit met de scatterplot werkt en dat daarmee een shotchart gemaakt wordt.

## Framework mapping

* Vanaf het begin van het openen van de pagina de scatterplot zal zichtbaar zijn. Dit zal gedaan worden door de 3FG data van JSON formaat tot een visualisatie te maken. Door de scatterplot als centrale focuspunt te nemen wanneer men de pagina opent zal de aandacht daar ook direct naar getrokken worden.
Een scatterplot is makkelijk te snappen en snel te overzien, waardoor het algemene idee achter de pagina snel duidelijk wordt.
Door middel van een onclick functie binnen javascript zal de rest van de pagina geladen worden wanneer men op een specifieke speler in de scatterplot klikt.

* Alle data is echter online als JSON the vinden of zelf gescraped en vervolgens in een goed JSON formaat gezet. Hierdoor zal alle data die gebruikt wordt JSON zijn.

* Wanneer een specifieke speler geselecteert is zal de rest van de pagina geladen worden en zullen de grafieken zichtbaar worden. Een javascript functie zal de data van de speler ophalen en deze dan visualiseren.

* De algemene layout van de pagina zal door middel van bootstrap gecreëerd worden. Het idee is dat de pagina zal laden waarin de scatterplot zichtbaar is, en wanneer en geklikt en gescrollt wordt zal deze pagina verder laden.

* Er zullen verschillende soorten datasets verkregen worden. Ten eerste voor de informatie betrekkende op de 3FG en 3FG% van de speler, deze kan via basketball-reference verkregen worden. De locatie van de schoten van de speler, en of deze raak zijn of mis worden van stats.nba.com gehaald. Beide data zal in een JSON tabel omgezet worden voor gemakkelijk gebruik met javascript.

# Project - 3 point legend Steph Curry

# 1 - Introductie, features, probleemstelling

Sinds dat Steph Curry terug is gekomen van zijn meerdere blessures zet hij allemaal records binnen de NBA (National Basketball Association). Door velen wordt hij gezien als de nieuwe beste schutter aller tijden. Door zijn statistieken tegen andere legendes zoals Larry Bird, Reggie Miller of Ray Allen uit te zetten kan er pas objectief gekeken worden naar wat voor een goede schutter hij wel niet is.

Door middel van verschillende manieren van het representeren van data te gebruiken kunnen deze spelers tegen elkaar afgewogen worden. Denk hierbij aan scatterplots met het totaal aantal gemaakte 3FG (3 point field goals) per wedstrijd van een seizoen, linegraphs waarin het totale aantal 3 punters over de loop van een carriëre uitgezet worden of shotcharts van de 3FG% op een gebied op het veld. Door deze uit te zetten in een interactieve visualisatie kunnen deze spelers snel en gemakkelijk vergeleken worden.

Het probleem wat dus opgelost gaat worden is een feitelijke conclusie geven aan wie nu precies in zijn looptijd de beste 3-punt schutter is.

Een shotchart, een groen vinkje staat voor een gemaakt schot en een rood kruisje voor een gemiste poging.
![shotchart](doc/shotchart.jpg)

Een linegraph.
![linegraph](doc/linegraph.jpg)

Een scatterplot.
![scatterplot](doc/scatterplot.gif)

# 2 - Schets webpagina

Een schets van hoe de webpagina er uit zal komen te zien.
![webpage](doc/schets.png)

# 3 - Data sets

Via www.basketball-reference.com zijn alle statistieken te vinden over al deze schutters. De data is te downloaden in verschillende data formaten, ik zal voor csv kiezen en hiervan gebruik maken. Via een python script zal deze data omgezet worden naar een JSON bestand, waardoor ik de data interactief kan maken via javascript en HTML.

# 4 - Onderdelen

De onderdelen van deze visualisatie kunnen apart bekeken worden, de scatterplots, lijngrafieken en shotcharts kunnen op zich bekeken worden en per deze kunnen er verschillende conclusies getrokken worden. Pas wanneer de grafieken met elkaar vergeleken worden kan er naar een groter geheel gekeken worden; wie nu daadwerkelijk de titel verdiend om beste 3-punt schutter genoemd te worden. Interactiviteit binnen de grafieken is eigenschap, door een selectie te maken onder deze schutters kan de grafiek gefocused worden op een specifieke speler om van deze de 3-punt loopbaan te bekijken.

# 5 - Programma's

Bij het visualiseren van de data zal gebruik gemaakt worden van de D3 javascript library. Door middel van D3 kan er de gewenste interactiviteit gecreëerd worden. Het opschonen van de site over het algemeen zal via CSS gedaan worden. Zo zal er een toelichting bij elke speler gegeven worden. Echter, de visualisaties zullen alleen met D3 en javascript gemaakt worden.

# 6 - Problemen

Tijdens het creëeren en gebruik van deze visualisaties kunnen enkele problemen voorkomen. Ten eerste tijdens de creatie. Uit ervaring met het werken van D3 kan ik zeggen dat het lastig is precies het gewenste resultaat te krijgen, de interactiviteit kan wegens simpele fouten niet optimaal werken. Het visualiseren moet volgens bepaalde standaarden zijn, veel tijdens Data Processing geleerd. Natuurlijk is het vaak een mening over wat precies de optimale manier is om een boodschap over te brengen, niet iedereen heeft hier het beste oog voor, inclusief ik. Door middel van de kritiek momenten kan dit probleem verholpen worden, veel mensen die een oog op een visualisatie hebben helpt hier de optimale manier van design voor te kiezen.

Ten tweede, het gebruik van de webpagina. De gebruiker kan enkele problemen tegemoetkomen. Zo kan de interactie niet optimaal werken, kunnen enkele delen van de pagina niet goed verschijnen of nog erger, de gebruiker kan niet duidelijk de relatie tussen de visualisaties concluderen. De grafieken moeten in goed verband met elkaar staan en de gebruiker moet direct weten waar de grafieken over gaan en wat precies de boodschap is. Als alle visualisaties werken is het dus van belang een duidelijke toelichting te schrijven en de grafieken in een logische volgorde te plaatsen. De interactie tussen de grafieken moet duidelijk zijn, niet alleen hoe het werkt maar ook waarom er precies een interactie is.

# 7- Vergelijkbare projecten

Er zijn niet veel vergelijkbare projecten, doordat er zoveel data te vinden is in de NBA zijn er ontzettend veel verschillende visualisaties te vinden, en daardoor ook veel verschillende. Hier zijn wel enkele die het idee redelijk overbrengen.

http://asbcllc.com/blog/2014/november/big_data_exploration_in_r/unscaled/

https://i.imgur.com/MxXTCr4.jpg

En de zeer uitgebreide, prachtige
http://peterbeshai.com/buckets/app/#/playerView/201935_2015
