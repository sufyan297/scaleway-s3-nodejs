//@ts-check
var AWS = require('aws-sdk');
var fs = require('fs');
var mime = require('mime');
var ep = new AWS.Endpoint('s3.nl-ams.scw.cloud');

//Loading AWS Config
AWS.config.loadFromPath('config/aws_config.json');

var s3 = new AWS.S3({
  endpoint: ep,
  params: {
    Bucket: 'BUCKET_NAME'
  },
  http: {
    verify: false //allow http
  }
});

///=--==--
var stdout = fs.createReadStream('happy_birthday_aafiya.jpg'); //create Read Stream
var buf = new Buffer('');

stdout.on('data', function(data) {
  buf = Buffer.concat([buf, data]);
});

var file_name = 'pictures/happy_birthday_aafiya.jpg'; //Path to File

stdout.on('end', function(data) {

    var param = {
        Key:  file_name,
        Body: buf,
        ACL: 'public-read',
        ContentType: mime.getType(file_name)
    };

    s3.putObject(param, function(err, data) {
        if(err) {
          console.log("ERROR: ");
          console.log(err);
        }
        else {
          console.log("SUCCESS: ");
          console.log(data);
        }
    });
});
