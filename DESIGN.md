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
