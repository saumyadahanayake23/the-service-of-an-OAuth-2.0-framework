const express = require("express");
const axios = require('axios');
const bodyParser = require("body-parser");
const cross = require("./cross.js");
const app = express();

app.use(bodyParser.json());
app.use(cross);

// Using POST request send the token and registerd
app.post('/token', (req, res, next) => {

  axios.post('https://github.com/login/oauth/access_token', {
    "client_id": "e5e5ec9aa47b43b92ebe",
    "client_secret": "72b7f7778830301da86d9d9e93b80d4f3cc0cda9",
    "code": req.body.code,
    "redirect_uri": "http://localhost:4200/user",
    "state": "121212"
  })
    .then(function (response) {
      console.log(response.data.split('&')[0].split('=')[1]);
      res.send({ "access_token": response.data.split('&')[0].split('=')[1] })
    })
    .catch(function (error) {
      console.log(error);
    });
})

//Using GET request pass the access token and get user details
app.post('/data', (req, res, next) => {
  axios.get('https://api.github.com/user?access_token='+req.body.accessToken)
    .then(function (data) {
      res.send(data.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.listen(9000, () => {
  console.log("Server running on" + 9000);
});
