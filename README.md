# OIRE Qualtrics JavaScript Validators

This is the start of a pretty large project to build better validation into Qualtrics. Right now it can't do much past summing a single value, and validating against a single other question entry. 

Hopefully I can change that with enough JavaScript (it never ends).

## Example.js
    Qualtrics.SurveyEngine.addOnload(function()
    {

    // include(filename)
    // This function allows users to source externally hosted JavaScript and load it at runtime
    function include(filename) {
        var head = document.getElementsByTagName('head')[0];
    
        var script = document.createElement('script');
        script.src = filename;
        script.type = 'text/javascript';
    
        head.appendChild(script)
    }
    
    // Here we're including my matrixSummation.js file for the sumMatrix function
    include("https://rawgit.com/ctesta01/qualtricsValidation/master/matrixSummation.js");
    
    // sumMatrix takes its arguments in the form sumMatrix([array of cells], cell-for-output)   
    
    // Here is the sumMatrix function summing all but the last cell in the second column
    // and putting the results in the last cell.
    sumMatrix($("QID1").select("td.c5").splice(-1,1), $("QID1").select("td.c5").last().down() 

    // Here is sumMatrix summing the first and second cells in the third column and 
    // putting it in the third cell.  
    sumMatrix([$("QID1").select("td.c6")[0], $("QID1").select("td.c6")[1]], $("QID1").select("td.c6")[2].down())
    
    });
The function include allows the user to import externally hosted JavaScript. With that done, the user can then run externally defined functions, like sumMatrix that let's users define an array to sum and an output cell. 
