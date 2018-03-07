var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var content = {
    title:'Article One',
    heading: 'Article One',
    content:`
    <p>
                After Vladimir Lenin's statue was brought down at Belonia College Square in Agartala following the BJP's victory in the Tripura Assembly election, there have been reports of vandalism on statues across the country.
                A post in BJP's National Secretary H.Raja's Facebook Page against Periyar statues in Tamil Nadu triggered Statewide protests. Mr. Raja subsequently removed the post and expressed regret, but the issue refused to die down.
            </p>`
    
};

function createtemplate (data){
    var title=data.title;
    var heading=data.heading;
    var content=data.content;
    
    var htmltemplate = `
    <!DOCTYPE html>
    <html>
        <head>
            <title>
                ${title}
            </title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
            <div class=wholebody>
            <div>
                <a href="/">Home</a>
            </div>
            <hr>
            <h2>${heading}</h2>
            <div>
                ${content}
            </div>
            </div>
        </body>
    </html>
    `;
    return htmltemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/article-one', function(req,res){
   res.send(createtemplate(content));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
