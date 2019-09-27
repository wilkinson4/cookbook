const express     = require("express"),
    app         = express();

    app.listen(4000, process.env.IP, () =>{
        console.log("What's Cooking Server Has Started!");
     });