# Process book

# Day 1

* Decided on the project
* worked out the proposal of project idea

# Day 2
* Created a python scraper to scrape the NBA stats website.
  - NBA stats is difficult to find the correct format for, data on the html is not ordered that logically

# Day 3
* Python scraper is working and data is in correct format, start working on another scraper to scrape espn statistics page.
  - espn page has the table not in order, it's odd/even. A workaround has to be made to sort the data
* Start working on the d3 shotchart using the data scraped by the scraper of day 2
  - Copy tutorial to get an insight how it works exactly

# Day 4
* New python scraper is working, started working on the scraper to also convert the data into the correct JSON format
  - Correct json format is hard, because I don't really know exactly how I need the data to be
* Created a javascript scraper to scrape the NBA stats website.
  - Doesn't work in the end

# Day 5
* Part of the shotchart is working, it doesn't really perform well while using bootstrap.
  - A fix for this is the goal of next week.
  - Main focus point is to get the scatterplot to work.
* Start investigating on how scatterplots work in d3
  - Start work on scatterplot, reading in data etc. Nothing shows up yet with the code I wrote at the end of the day

# Day 6
* Continue working on scatterplot
  - Axes are there, the dots are not displayed correctly
* Trying to fix the shotchart issue, try to implement different bootstrap templates
  - selected a bootstrap template

# Day 7
* Finished scatterplot
  - CSS still needs to be done, think about how I want that to be
  - Added tooltips
* Played around with bootstrap
  - Tweaked the bootstrap to my liking
  - Adjusted CSS

# Day 8
* Started on linegraphs
  - Reading in data etc
  - Axes work

# Day 9
* Continue working on linegraphs
  - Values are displayed correctly
* Fix up data for line graph
  - After this the line displays correctly
  - Think about css for the linegraph

# Day 10
* Finished first linegraph
  - Added coloring to the linegraph
* Finished second linegraph

# Day 11
* Start on interaction
  - scatterplot & first line graph
* Merged the two linegraphs in one javascript file
  - not completely working yet

# Day 12
* Finished interaction
  - start working on interaction with second line graph
  - made that work in the evening

# Day 13
* Due to issues with javascript scraping, made a new scraper
  - data wasn't in correct format, couldn't get it to work, found a new solution, tweaked the scraper
  - new data works
* Start working on shot chart calculations
  - x,y transformation
  - z value for efficiency

# Day 14
* Continue working on shotchart, x,y is working, z value not yet, continue on calculations for good z value
* ditched the tooltips, added text to graphs for better clarity

# Day 15
* Calculations complete for z value, started working on implementing the final interaction, done in the weekend
   - added slider
   - create shot chart

# Day 16
* Fixed the shotchart to work with the data, shows correctly
  - data shows up correctly, still not completely interactive

# Day 17
* Slider implemented, still some bugs with updating the chart
  - slider works, selecting a player still has some bugs, new svgs get appended to the whole body instead of overwriting
  - bootstrap CSS went mental after applying fixes to the slider, so a new idea has to be used

# Day 18
* fixed all the final bugs
  - slider works, shot chart updates,

# Day 19
* cleaining up data, commenting, finishing report

# Day 20
* presentations
* end of minor :(
