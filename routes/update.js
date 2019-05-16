
https://stackoverflow.com/questions/31235270/mongoose-update-not-updating
updateMerchantLastProductUpdate: function (mID) {
    var now = new Date(),
        query = { "merchant_aw_id" : parseInt(mID) },
        update = {
            "$set": { "product_feed_updated": now } 
        },
        options = { "multi": true };

    Merchants.update(query, update, options, function (err) {
        if (err) return console.error(err);         
    })
}




{ _id : someMongooseGeneratedId,
    name : 'myBook',
    data : [
        {_id : 'page', name : 'one'},
        { _id : 'chapter', name : 'Chapter 1' }
    ]
   }

   Model.findOneAndUpdate({ name : 'myBook', "data._id" : 'chapter' }, { "data.$.name" : 'Chapter 1' });




{
    "_id" : "Manasa",
    "name" : "Manasa Sub",
    "sensors" : [ 
        {
        "sensor_name" : "ras",
        "_id" : ObjectId("57da0a4bf3884d1fb2234c74"),
        "measurements" : [ 
            {
                "time" : "8:00"
            },
            {
                "time" : "9:00"
            }
        ]
    },
    {
        // next sensor in the sensors array with similar format
        "_id": "",
        "name": "",
        "measurements": []
    }],
    }


    Recipe.findOneAndUpdate(
        {  _id:req.body._id, "sensors.sensor_name": req.body.sensor_name },
        { $push: { "sensors.0.measurements": { "time": req.body.time } } }
    );