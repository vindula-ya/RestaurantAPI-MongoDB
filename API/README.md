# RestaurantAPI-MongoDB
#Created by Vindula Yasas
#For 3rd Year SPDC module
## Technologies used
1) Express (Framework)
2) MongoDB (Database)
3) JSON Web Tokens (Authentication)

## Configure the API
The API can be configured through the default.json file in the config folder.

**Please configure the email, senderNumber and sms values with your own values. For the sms values get a secret and and API key from nexmo.com** 

## How to run and install
Before running the API for the first time install the node modules and set up the database.
### To install the node modules
```
npm install
```
### Start the server
```
npm test
```
To stop the server ctrl+C

## How to use the routes
The routes.js file has a list of all the routes. All that has to be done is added the route to the end of the base URL which is "http://localhost:8080" with the prefix of "/restaturant" such as "http://localhost:8000/restaurant/user". 

The "POST /login" route will return a JSON Web Token which is needed to access the routes with the authentication middleware function. Once the token is returned by that route, the token should be passed in the request with a header called "token".