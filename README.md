# Find-a-Hobby 2.0

Find-a-Hobby 2.0 contributed in an Open Source project with Rodrigo Sanchez ([Github]( https://github.com/RodriFS/).
([Find a Hobby Client]( https://github.com/alvaroha1/find-a-hobby-client)

## Idea
We decided to remade the whole look of the application and focus on improving the user experience.

## Motivation
The main objective of this project was to take an already existing project and continue working on it.
The original Find-A-Hobby was a great fit for us as a team because we both like the original idea but at the same time we thought we could take it to a whole new level.

## Tech Stack

### 1.0
* [React](https://github.com/facebook/react) - Front end library for building user interfaces
* [Bootstrap](https://github.com/twbs/bootstrap) - Framework for UI elements.
* [Onsenui](https://github.com/OnsenUI/OnsenUI) - Mobile friendly framework for responsive elements.
* [Font Awesome](https://fontawesome.com/) - Icons library. Used for the football ball, dollar sign and ballon icons.

### 2.0
* SASS
* Unsplash API
* Redux

## Screenshots

![dashboard](https://github.com/alvaroha1/sehnsucht/blob/master/assets/screenshot1.JPG)
![select a picture](https://github.com/alvaroha1/sehnsucht/blob/master/assets/screenshot2.JPG)


## Getting started
Install mongodb and redis in your computer if you don't have done it already. <br>
https://www.mongodb.com/ <br>
https://redis.io/

1. Clone the repo

```
$ git clone https://github.com/jportella93/find-a-hobby-server.git
$ cd find-a-hobby-server
```

2. Install dependencies
```
$ npm install
```

3. Start redis database
```
$ redis-server
```

4. In a new terminal window (keep the other one also open): Start mongodb database
```
$ mongod
```

5. In a new terminal window (keep the other two also open): Start development server
```
$ npm run start
```
If everything went good you will see a message like:

  <p align="center"><em>Mongoose connected to mongodb://localhost/find-a-hobby <br>
  find a Hobby! Server connected on port 3000</em></p>

The number of the port that logs in (3000 in this case) is what you have to write in the client in the file /src/lib/apiClient.js

6. Connect with client.
Go to https://github.com/jportella93/find-a-hobby-client and follow the getting started instructions.


## Built with

* [Koa](https://github.com/koajs/koa) - Async middleware for Node.
* [Reccomendation Raccoon](https://github.com/guymorita/recommendationRaccoon) - Recommendation engine.
* [node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - JSON web token implementation for Node.
* [Mongodb](https://github.com/mongodb/mongo) - No relational database.
* [Mongoose](https://github.com/Automattic/mongoose) - Layer for mongodb.


## Author

Jon Portella - [Github](https://github.com/jportella93) - [LinkedIn](https://www.linkedin.com/in/jonportella/)


## License

This project is licensed under the MIT License.

<p align="center">
  <img src="https://imgur.com/W3jHOFM.png" />
</p>
