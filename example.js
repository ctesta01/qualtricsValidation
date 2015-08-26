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


sumMatrix($("QID1").select("td.c5").splice(-1,1), $("QID1").select("td.c5").last().down());

sumMatrix([$("QID1").select("td.c6")[0], $("QID1").select("td.c6")[1]], $("QID1").select("td.c6")[2].down());

equivValidate([$("QID1").select("td.c4")[0], $("QID1").select("td.c4")[1]]);

});
