# OIRE Qualtrics JavaScript Validators

This is the start of a pretty large project to build better validation into Qualtrics. Right now it can't do much past summing a single value, and validating against a single other question entry. 

Hopefully I can change that with enough JavaScript (it never ends).

## Example.js
    Qualtrics.SurveyEngine.addOnload(function()
    {

    // This function allows users to source externally hosted JavaScript and load it at runtime
    function include(filename) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.src = filename;
        script.type = 'text/javascript';
        head.appendChild(script)
    }
    
    include("https://rawgit.com/ctesta01/qualtricsValidation/master/oireQualtricsLibrary.js");
    

    // sumMatrix takes an array of cells and a cell to put the result of summing the array into.
    // Additionally, sumMatrix sets the output cell to update any time any of its sum-components is changed, 
    // as well as setting the output cell to readonly.


    sumMatrix($("QID1").select("td.c5").splice(-1,1), $("QID1").select("td.c5").last().down());

    sumMatrix([$("QID1").select("td.c6")[0], $("QID1").select("td.c6")[1]], $("QID1").select("td.c6")[2].down());

    equivValidate([$("QID1").select("td.c4")[0], $("QID1").select("td.c4")[1]]);
    
    });
The function include allows the user to import externally hosted JavaScript. With that done, the user can then run externally defined functions, like sumMatrix that let's users define an array to sum and an output cell. 
