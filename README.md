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

## Screenshots
=======

First, the user is presented with a screen where they can input their zip code

![Screen Shot 2023-03-14 at 11 26 39 AM](https://user-images.githubusercontent.com/122952630/225052176-08d4d85c-6230-4b38-b80b-f66b54d66bbe.png)

When they hit "Submit", they are presented with list of available movies

![Screen Shot 2023-03-14 at 11 27 01 AM](https://user-images.githubusercontent.com/122952630/225052432-eb2a0d86-3141-40ce-91e1-2b2b6c3e5650.png)

After they select a movie, a list of theaters where the movies are playing is displayed

![Screen Shot 2023-03-14 at 11 27 13 AM](https://user-images.githubusercontent.com/122952630/225053134-8e6f886c-cd60-4f65-a3c9-9f99fd420a6a.png)

Once they select a theater, they are presented with list of restaurants

![Screen Shot 2023-03-14 at 11 27 24 AM](https://user-images.githubusercontent.com/122952630/225053439-d84e30a2-d3e8-4046-aa9b-0a0f493f80d7.png)

Once they've selected a restaurants, they shown a summary of the selections the user had made.

![Screen Shot 2023-03-14 at 11 27 47 AM](https://user-images.githubusercontent.com/122952630/225053660-0e58b6ac-d435-4034-a206-ed9a2cb07761.png)

=======
