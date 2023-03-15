# date-night-project

## Description


Creating an app that finds a movie and restaurant in your area for the perfect date night :)

The goal of this project was to work with a team to create a real-world front-end application that you’ll be able to showcase to potential employers. In our app we used a combination of HTML, CSS, and Javascript and leveraged two Google APIs (GeoCode & Google Maps). See Screenshots below for a visual walkthrough of our application.

## User Stories

AS A user
I WANT to pick a movie/theater/restaurant based on zip code
SO THAT I plan the perfect date night

AS A user
I WANT to input a zip code
SO THAT I can display all available movies, theaters, and restaurants within the zip code I submitted

AS A user
I WANT to select a theater
SO THAT I can save my preferences for my date night

AS A user
I WANT to select a movie
SO THAT I can save my preferences for my date night

AS A user
I WANT to select a restaurant
SO THAT I can save my preferences for my date night

AS A user
I WANT to build connectivity to Google Maps API
SO THAT I can fetch the details for the theater and movie

AS A user
I WANT to build connectivity to Geo Code API
SO THAT I can convert zip code into latitude/longitude coordinates

## Acceptance Criteria

GIVEN I have called the Google Maps API
WHEN I attempt to fetch data from Google Maps
THEN I receive full payload with Google Maps API Data

GIVEN I have called the Geo Code API
WHEN I pass through zip code collected from user
THEN I receive latitude/longitude coordinates

GIVEN I have inputted a zip code
WHEN I hit "Search"
THEN I am presented with available movies in my area

GIVEN I have been presented a list of movies
WHEN I hit "Select"
THEN I am presented with available theaters featuring that movie in my area

GIVEN I have been presented with a list of theaters
WHEN I hit "Select"
THEN I am presented with a list of restaurants

GIVEN I am presented with a list of restaurants
WHEN I hit "Select"
THEN I am redirected to a Summary of my selected items.

## Preview
=======


The following video shows the web application appearance and functionality once deployed:


![deployed app](/images/MovieNightPlannerDemo.gif)





