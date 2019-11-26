# Road Ranger: Master the Road!

Created using React Native, this Android/IOS app makes travel better by letting users create custom map markers via voice/text or a lean button-based UI, and then share them with other users, receiving updates via text to voice. Created with React Native, MongoDB, Node/Express, and community libraries this app represents the culmination of knowldge and skills gained at the SMU Coding Bootcamp. the

# Project Features
1. [Overview](#Overview)
2. [See It In Action](#Demo-Gifs)
3. [Technology Used](#Technology-Used)
4. [Challenges](#Challenges)
5. [Final Thoughts](#Final-Thoughts)

## Overview

### Adding a Marker 

This app is designed to help users navigate the dynamic world of the road. Creating a new marker is easy, and contolled by a simple UI: Users can create custom markers by pressing and holding the central button, and then speaking their message into their phone. For those who prefer not to use voice recognition, tapping the button will bring up a modal with several buttons describing common road conditions, each of which can add a marker on a single tap. For those with a more complex message, there is an input box to type up a custom message. 

### Stay Aware Of the Road

Once added, a marker will appear on the map for all other users of Road Ranger. Further, when a driver using our app gets within half a mile of a marker, text to voice software will inform them of the situation. To make sure that users never miss a marker, markers are retrieved from the database every half mile, providing full coverage with minimal api calls. You can check out the backend for this React Native app [here]().


# Demo-Gifs



## Technology-Used

* React Native
* React-vector-icons
* Handlebars
* Bootstrap
* Jquery
* Cheerio
* Mongoose
* MongoDB
* Axios

## Challenges

The first project to incorporate MongoDB as a backend, along with several express routes, this project proved one of the most time consuming, but also one of the most rewarding. Working on it helped build understanding of how the MongoDB database worked, how to organize several different routes, and how to incorporate scraped web data into an app. 

## Final-Thoughts

I completed this project, which would have worked very well paired with React, while on the edge of learning React. As a result, I began learning how to make MERN apps with an appreciation for how it streamlined some of the processes that were intensive to build in this app.










# Project-## Problem: This app will address the need to offer location based alerts to drivers and shoppers that are relevant to their map position, and makes use of a lean and effective UI that is hands-free, and voice based, creating an app specifically suited for safe use on roads.

Technology Requirements:

voice to text
positioning
access to phone microphone
database to store users
a clean and polished UI to add alerts in a hands free way

This app allows for alerts to be posted, which will then be shared with everyone who has the app running. The intent is to make it easy and hands free to hear relevant alerts (1-10) miles radius configurable, and to allow easy finding of the location that is alerted. As an alternative to Waze, it is leaner, and more usable with other software, like google maps.
