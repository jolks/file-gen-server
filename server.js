var express = require('express');
var stringify = require('csv-stringify');
var app = express();

var data = [["id", "subject1", "subject2", "subject3"], ["jack", 85, 90, 68], ["sam", 77, 89, 69]];

app.get('/download', function(req, res){

    stringify(data, function(err, output){
        res.setHeader('Content-disposition', 'attachment; filename=testing.csv');
        res.set('Content-Type', 'text/csv');
        //console.log(res);
        res.send(output);
    });
    
});

app.listen(3000);

