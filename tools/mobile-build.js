var fs = require('fs')
fs.readFile('www/build/main.js', 'utf8', function(err, data)
{
    if (err)
    {
        console.log("Error in parsing build")
    }
    var linesWithMode = linesExceptDecorator.split("AppComponent.mode = Mode.browser;").join("AppComponent.mode = Mode.mobile;");

    fs.writeFileSync('www/build/main.js', linesWithMode);
});

