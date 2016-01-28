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
The minimal viable product was:
  - information about Curry
  - Interactive Scatterplot
  - Shot chart of best shooting season
  - line graph with efficiency data

later added:
  - interactive webpage
  - better css
  - interactive slider for all years
  - total 3fg line graph
  - hyperlinks to certain pages

## 2.2 - Scatterplot
The scatterplot is created by loading in a JSON file in javascript, and then drawing it using d3. I wanted to visualize the values at starting position as the same value, so I ditched the several colors to a even, lightgrey color. By using mouseover, mouseout and onclick functions it's possible to update and alter certain HTML elements and css aspects of the svg elements. Using these event handlers it's possible to send updated info to the other graphs and charts.

## 2.3 - Line Graphs
Because the x value will be the same in both the graphs, I needed to find a way to only update the y value and axis for both axes, but keeping the x axis constantly the same. This had proven to be quite the challenge, because a single small mistake will cause both graphs to not show and then it's kind of hard to find out what exactly goes wrong in either one of them. In the end I obviously created one and the applied the same logic and coding to the other graph. This was not as easy as expected, but after a while of working on it both came up perfectly on the screen.

## 2.4 - Shot Chart
Oh boy, this one was quite the challenge. There are several tutorials online on how to create these shot charts, but that's it. Because the way on how these shot charts are created and visualized are completely different, there is no way to find out how exactly to apply the same logic of the tutorial to my situation. In the end it all came down to trial and error, from getting the data in the desired format to actually displaying it on the page. The whole idea is based on tutorials, but the whole code in the end was written on a completely different way as the tutorials implied, the general idea was the same though. The javascript of the shot chart updates every time a player is selected on the scatterplot, then the id of this player is achieved by an updated hidden html element, the id is checked and then the years this player has played in the league are returned by a function. The slider value is the index in the years array, using this info the correct json file is loaded and then the javascript displays the shot chart.

# 3 - Challenges

## 3.1 - Data
The general idea was to just get the data of the best shooting seasons of each player, because this current season of Curry is aniticipated to be the best shooting season yet. I decided to do all the shooting data of the players: percentage, total shooting, shooting per year, shooting per season and even the advanced stats of each game (location in field, hit/miss, type of shot). Scraping wasn't the biggest issue, or so I thought. I started out with scraping my data in one day, which wasn't really an issue. After working around with the visualizations it became clear to me that it was easier to adapt my scraper to the desired format than to play with javascript to just get the right values. All in all this took another day, then the biggest issue approached me. Getting the data for the shot chart. All the data is available online, after what's called API scraping, the issue was to find the correct shotlog data. Knowing how to use the XHR, used to filter out the json files, it was possible to fetch the data. One array in this dataset was about 20 elements in size, of which I needed 4, and on 2 of those I needed to apply calculations to the get the translated value (x,y). The other 2 (miss/hit) were needed to calculate the shot percentage, the mean, the standard deviation and the efficiency factor. This had proven to be quite the task.

# 3.2 - visualizations
The visualization issues were mostly trial and error. Get an idea, try to implement it and if it doesn't work figure out what went wrong. Basically a life lesson I learned about programming this minor. Because of I wanted to visualize the data in a single interactive page, using bootstrap, there were some issues with the css of bootstrap and what I wanted to do with my visualizations. This was just some puzzling work but all worked out fine in the end. Trying to create two linegraphs in one javascript file with the same x axis was quite difficult as well. The graphs didn't update correctly and when they did the x axis disappeared. The colors of the lines didn't update correctly on mouse events, and after selecting a player in the scatterplot the graph was really laggy with updating the lines. After working all those problems out, the lines didn't append on the right way to the svg so the first created line is the one on the bottom, appending to the parent node wasn't quite as easy as expected and took a while to impelement as well.

# 3.3. - Slider
The slider updates worked horribly. First I started out with getting the slider to interact with the shot chart, after searching I found a function to check for the update, then implementing it correctly without any errors was difficult as well. The svg didn't update at first, then it updated but only with the latest data, then a new svg was created for every slide event but in the end it was fixed. Then the player selection had to be made interactive with the shot chart, the nodes didn't update on javascript update handlers so nothing happened in the first couple of hours trying to get it to work. Then I wrote a new function to run the same script everytime the scatterplot has been clicked, this proved to work. Then it was just a simple matter of fine tuning and bug fixing certain issues to get the scatterplot, the slider and the shotchart to work smoothly together. Still, not as smooth as I wanted it to be, because sometimes after moving the slider way to fast, the chart takes about 1/2, 1/3 of a second to update. I'd loved to see that be instantly. Also, for some reason the last couple of seasons for Reggie Miller are not shown, and I have no idea why that happens.

# 4 - bugs
There are still bugs in the page:
  - When selecting a player, the line higlights red. This red line is appended to the parent node of the svg, so it appears on top, the same thing happens when hovering over a line. So when hovering over a line this one overwrites the red selected line causing the line to go over the red line. I wanted to append this line not to the end, but index it to one before that. I tried several functions and things to fix that, but it didn't work. I could've tried to append the same red line again to the svg after a mouse out, but I didn't have the time to implement that yet, because the shot chart was not working correctly yet and that was my main concern.
  - The last 5 or so seasons of Reggie Miller are not shown in the shot chart. I don't know why, the json is in the exact same format as the other ones but these just don't decide to work. It could be some issue because he is the oldest player that these seasons didn't apply the right format for these years.

# 5 - Design decisions
I decided to use light grey as a base color to keep an even overall view of all visualizations. Selecting red was quite difficult to decide, I didn't want it to imply anything bad, but I wanted it to be visible, easy on the eye and most importantly, eye catching. Because of the way the line graph works, it didn't really matter which color the selected line was, only if it's visible and easily comparible to the other selected green lines. I chose the purple color of the page because the color of Stephen Curry's team is dark blue and yellow, the dark blue was a bit depressing, the yellow was way to bright. The purple still fits well in the color palette of these colors, so I tested it out and it fits well. The "Show Graphs" button was implemented to keep the user on the scatterplot page when scrolling down. Then the user sees the short explanation about how the interactivity works and then by clicking the button the rest of the graphs show up. I decided to not show the title of what the user is seeing because I wanted the focus to be on the graphs, and not what the title is. The data is the most important part, the user is challenged to come to the conclusion to who the best shooter is, and by showing the graph on the whole visible page is in my opinion the better way to do this.
