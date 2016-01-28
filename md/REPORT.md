# Final Report
Name: Bart Quaink
St. nr.: 11121424
Final project Data Processing - Minor Programmeren

## 1 - Description
The application is made to visualize certain data about shooting in the NBA. The NBA is the national league of the USA, but they also have a team based in Toronto, Canada. In basketball you score 2 points for every regular shot inside the 3 point line. As the name already implies, everything behind the 3 point line counts as 3 points. Because of this extra point, there have been players in the league dedicated to shooting 3 pointers. This page has been created as a tool to visualize the data of these 3 pointers. First of all, 4 visualizations have been made. Most of these revolt around the scatterplot, where the total 3 pointers of some legendary 3 point shooters have been visualized. By selecting a player the other 3 graphs are updated to show the data of this certain player.

### 1.1 - Line graph with total 3 pointers per season
The first line graph visualizes the total 3 pointers made in each season, by selecting a player in the scatterplot the selected line highlights up red. By hovering over another line, this line turns green. This makes it easy to compare 2 players with each other.

### 1.2 - Line graph with efficiency
The same thing applies here as with the total 3 pointers line graph. Only now it applies to efficiency, aka how efficient is a player shooting for the season. The data is shown in 3 point percentage, this means how much of the attempted 3 point shots did a player hit in a season?

### 1.3 - Shot Chart for each season
By selecting a player, the shot chart data is shown, starting a the first season. With the slider you can check the shot chart data for each season a player has played in the NBA. The efficiency is calculated of a big dataset of all shots a player has taken in a year. An efficiency factor calculates the legend and how efficient a player has shot from a certain spot.

# 2 - Technical Design
Based on [this](https://www.behance.net/gallery/26219339/Unika-One-page-PSD-template) template, with a lot of tweaks I accomplished to make an interactive single page website. Looking back on the old design document, a lot of desired interactivity has actually been accomplished. Several scrapers made in python and javascript scraped the data from several data providers. These can be found in the bottom of the page. The data, converted to a valid JSON format then will be visualised using the javascript d3 library. A button to hide/show the graphs is available as well.

## 2.1 - MVP

## 2.2 - Scatterplot
The scatterplot is created by loading in a JSON file in javascript, and then drawing it using d3. I wanted to visualize the values at starting position as the same value, so I ditched the several colors to a even, lightgrey color. By using mouseover, mouseout and onclick functions it's possible to update and alter certain HTML elements and css aspects of the svg elements. Using these event handlers it's possible to send updated info to the other graphs and charts.

## 2.3 - Line Graphs
Because the x value will be the same in both the graphs, I needed to find a way to only update the y value and axis for both axes, but keeping the x axis constantly the same. This had proven to be quite the challenge, because a single small mistake will cause both graphs to not show and then it's kind of hard to find out what exactly goes wrong in either one of them. In the end I obviously created one and the applied the same logic and coding to the other graph. This was not as easy as expected, but after a while of working on it both came up perfectly on the screen.

## 2.4 - Shot Chart
Oh boy, this one was quite the challenge. There are several tutorials online on how to create these shot charts, but that's it. Because the way on how these shot charts are created and visualized are completely different, there is no way to find out how exactly to apply the same logic of the tutorial to my situation. In the end it all came down to trial and error, from getting the data in the desired format to actually displaying it on the page. The whole idea is based on tutorials, but the whole code in the end was written on a completely different way as the tutorials implied, the general idea was the same though. The javascript of the shot chart updates every time a player is selected on the scatterplot, then the id of this player is achieved by an updated hidden html element, the id is checked and then the years this player has played in the league are returned by a function. The slider value is the index in the years array, using this info the correct json file is loaded and then the javascript displays the shot chart.

# 3 - Challenges
