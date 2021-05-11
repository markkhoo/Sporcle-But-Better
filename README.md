# Sporcle But Better

Sporcle But Better is an quiz game that tests your knowledge of world capitals. Once you log in, you can select a continent, then start the game. Capital cities will be displayed and you must select the corresponding country it belongs to. You get one point for every correct answer while you are being timed. Once you finish, your score and time will be recorded to your profile wherein you can see your top scores and charts with data on how you've progressed. There is also a leaderboard that ranks top scores of all users. Finally, the mainpage has a search bar that allows you to view the profile of other users. 

To visit the site please click the link below:

[Site](https://radiant-chamber-32939.herokuapp.com/)

## Table of Contents


* [Technology-Used](#technology-used)

* [Contribute](#contribute)

* [Tests](#tests)

* [Making](#making)

* [Authors](#authors)

* [License](#license)


## Technology-Used


- CSS - adds styling to the webpage

- Javascript - adds special effects on pages

- Node.js - an open source server environment that uses JavaScript on the server

- MySQL - fully managed database service to deploy cloud-native applications

- Handlebars - compiles templates into JavaScript functions

- GitBash - for cloning repository and pushing code to GitHub

- GitHub - holds repository that deploys to GitHub Pages


## Contribute

In order to contribute, you will need to know the following languages:

    - Node, Javascript, MySQL, Sequelize, Express, Handlebars, CSS, HTML.

## Tests

To run tests, please use the following command:

    - npm start / node server.js


## Making

In this project we used handlebars to dynamically generate our HTML pagegs from the servevr side of the application. Handlebars makes it easy to implement data from the server onto the client side of the application.

![Code-Snippet](/images/mainhandlebar.PNG)

![EndingGIF](/imagges/endingframe.gif)


Our application allows a user to create an account and save their scores to their account inside of our database. This way we can track the progress they are making and show differences between scores on the leaderboards.

![Code-Snippet](/images/createusercode.PNG)

![CreateGIF](/images/createuser.gif)


After a user has signed up or logged in, they are then ready to play the game. Clickngg play now will take the user to the game page where they can choose their category of game. The server will respond with the game appended to the page.

![Code-Snippet](/images/rendergame.PNG)

![GameGIF](/images/continentrenderexample.gif)


When a user finishes the game they can send their score. This will post the score in the database for the user and be saved to their profile.

![Code-Snippet](/images/scorepost.PNG)


A user can check their status on the leaderboard. Tracking where they are compared to all other users that have played the game.

![Code-Snippet](/images/leaderggetrequest.PNG)

![Code-Snippet](/images/leaderboardget.PNG)

![LeaderboardGIF](/images/leaderboardresult.gif)




## Authors

Jake Novelli

[LinkedIn](https://www.linkedin.com/in/david-jacob-novelli/)

[GitHub](https://github.com/dnovelli1)


Mark Khoo

[LinkedIn]()

[GitHub](https://github.com/markkhoo)


Rosario Terese Miranda

[LinkedIn](https://www.linkedin.com/in/rosario-miranda-b81170132/)

[GitHub](https://github.com/rtmiranda18)


## License

This project is currently licensed under the MIT [License](https://choosealicense.com/licenses/mit/)