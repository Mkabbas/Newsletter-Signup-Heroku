const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running at Port 3000.");
});

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.emailid;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    var options = {
        url: "https://us11.api.mailchimp.com/3.0/lists/714a8b061d",
        method: "post",
        headers: {
            Authorization: "Kazim a965117e6c7353c634d45eec8b11a232-us11"
        },
        body: JSON.stringify(data)
    }
    
    request(options, function(error, response, body) {
        if (response.statusCode == 200) {
            console.log("success");
            res.sendFile(__dirname + "/success.html");
        }
        else {
            console.log("failure");
            res.sendFile(__dirname + "/failure.html");
        }
    })


});

//MailChimp API Key - a965117e6c7353c634d45eec8b11a232-us11
//List ID - 714a8b061d