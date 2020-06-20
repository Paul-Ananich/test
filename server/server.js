const express = require("express");
const app = express();
const host = "5.9.55.116";
const port = "5000";
const mysql = require("mysql");

app.get("/message", function(request, response) {
  const connection = mysql.createConnection({
    host: host,
    user: "test",
    password: "whigdyetiabEnok8",
    database: "test"
  });
  module.exports = connection;
  connection.connect(function(err) {
    if (err) throw err;
    connection.query(
      "SELECT message.date, message.source_url, account.name, essence.essence\n" +
        "FROM user\n" +
        "INNER JOIN user_subscription ON user_subscription.user_id = user.id\n" +
        "INNER JOIN account ON account.id = user_subscription.account_id\n" +
        "INNER JOIN message on message.account_id = user_subscription.account_id\n" +
        "INNER JOIN essence on essence.message_id = message.id\n" +
        "WHERE user.id = 1",
      function(error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) console.log(error);

        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        console.log(results, "results");
        response.send(results);
      }
    );
  });
});

app.get("/test", function(request, response) {
  response.send("Hello Pavel!");
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}/message`)
);
