var express = require('express');
var stringify = require('csv-stringify');

var app = express();
app.use(express.bodyParser());

//var filename = "test";
//var data = [["id", "subject1", "subject2", "subject3"], ["jack", 85, 90, 68], ["sam", 77, 89, 69]];
// To test e.g. http://localhost:3000/download/csv?filename=test&data=[["id", "subject1", "subject2", "subject3"], ["jack", 85, 90, 68], ["sam", 77, 89, 69]]

// Note: to call this service from front-end layer, use:-
// window.open('/download/csv?filename=' + filename + '&data=' + encodeURIComponent(JSON.stringify(data)));

app.get('/download/csv', function(req, res){
    
    //console.log(req.query);
    var filename = req.query.filename;
    var data = req.query.data;

    if(typeof(data) != 'object' && data != undefined) {
        data = JSON.parse(data);
    } 

    stringify(data, function(err, output){
        if(err) {
            res.send(404, err);
        }
        else {
            res.setHeader('Content-disposition', 'attachment; filename=' + filename + '.csv');
            res.set('Content-Type', 'text/csv');
            res.send(output);
        }
    });
    
});

app.listen(3000);

