# Road Ranger: Master the Road!

Created using React Native, this Android/IOS app makes travel better by letting users create custom map markers via voice/text or a lean button-based UI, and then share them with other users, receiving updates via text to voice. Created with React Native, MongoDB, Node/Express, and community libraries this app represents the culmination of knowldge and skills gained at the SMU Coding Bootcamp. 

<img src="./src/assets/images/readmepic.png" alt="drawing" width="200"/>

# Project Features
1. [Overview](#Overview)
2. [See It In Action](#Demo-Gifs)
3. [Technology Used](#Technology-Used)
4. [Challenges](#Challenges)
5. [Final Thoughts](#Final-Thoughts)

# Overview

## Adding a Marker 

This app is designed to help users navigate the dynamic world of the road. Creating a new marker is easy, and contolled by a simple UI: Users can create custom markers by pressing and holding the central button, and then speaking their message into their phone. For those who prefer not to use voice recognition, tapping the button will bring up a modal with several buttons describing common road conditions, each of which can add a marker on a single tap. For those with a more complex message, there is an input box to type up a custom message. 

## Always Aware Of the Road

Once added, a marker will appear on the map for all other users of Road Ranger. Further, when a driver using our app gets within half a mile of a marker, text to voice software will inform them of the situation. To make sure that users never miss a marker, markers are retrieved from the database every half mile, providing full coverage with minimal api calls. You can check out the back end code for this React Native app [here](https://github.com/Nick-Haer/roadRangerBackend).


## Demo-Gifs



## Technology-Used

* [React-Native](https://facebook.github.io/react-native/)
* [React-Vector-Icons](https://github.com/oblador/react-native-vector-icons)
* [React-Native-Maps](https://github.com/react-native-community/react-native-maps)
* [Google-Maps-API](https://developers.google.com/maps/documentation/?_ga=2.187019944.-1474704009.1568742778&_gac=1.229229294.1574740445.CjwKCAiAlO7uBRANEiwA_vXQ-_zyoNwzJ7qzuFRqLLAKIlarUTxEfofwA9eu1Co6nBSGkqhmH_8TGBoCgX0QAvD_BwE)
* [Haversine](https://www.npmjs.com/package/haversine)
* [React-Navigation](https://reactnavigation.org/)
* [Axios](https://www.npmjs.com/package/axios)
* [React-Native-Voice](https://github.com/react-native-community/react-native-voice)
* [Text-To-Speech](https://www.npmjs.com/package/react-native-tts)

### Backend
* [Mongoose](https://mongoosejs.com/)
* [MongoDB](https://docs.mongodb.com/)
* [Node](https://nodejs.org/en/)

## Challenges

The first project to incorporate MongoDB as a backend, along with several express routes, this project proved one of the most time consuming, but also one of the most rewarding. Working on it helped build understanding of how the MongoDB database worked, how to organize several different routes, and how to incorporate scraped web data into an app. 

## Final-Thoughts

I completed this project, which would have worked very well paired with React, while on the edge of learning React. As a result, I began learning how to make MERN apps with an appreciation for how it streamlined some of the processes that were intensive to build in this app.
