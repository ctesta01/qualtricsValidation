# OIRE Qualtrics JavaScript Validators

This is the start of a pretty large project to build better validation into Qualtrics. Right now it can't do much past summing a single value, and validating against a single other question entry. 

Hopefully I can change that with enough JavaScript (it never ends).

## Example.js
    Qualtrics.SurveyEngine.addOnload(function()
    {
    function include(filename) {
        var head = document.getElementsByTagName('head')[0];
    
        var script = document.createElement('script');
        script.src = filename;
        script.type = 'text/javascript';
    
        head.appendChild(script)
    }
    
    include("https://rawgit.com/ctesta01/qualtricsValidation/master/matrixSummation.js");
    
    sumMatrix([$("QID1").select("td.c6")[0], $("QID1").select("td.c6")[1]], $("QID1").select("td.c6")[2].down())
    
    });
