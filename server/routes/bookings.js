var express = require('express');
var router = express.Router();
var db = require("../config/mongoDBuri");

router.get("/bookings", function(req, res, next){
    db.bookings.find(function(err, bookings){
            if(err){
                res.send(err);
            }else{
                res.json(bookings);
            }
    });
});

router.post("/bookings", function(req, res, next){
    var booking = req.body.data;

    if(!booking.userName){
        res.status(400);
        res.json({
            error:"Bad data"
        });
    }else{
        db.bookings.save(bookings, function(err, savedBooking){
            if(err){
                res.send(err);
            }else{
                res.json(savedBooking);
            }
        });
    }
});

module.exports = router;





