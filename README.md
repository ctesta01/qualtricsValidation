# Qualtrics JavaScript Validation

This is the start of a pretty large project to build better validation into Qualtrics. Right now it can't do much past summing a single value, and validating against a single other question entry. 

Hopefully I can change that with enough JavaScript (it never ends).

## Installing: 
Go to your Qualtrics survey -> Look & Feel -> Advanced -> Paste into Header:

`<script src="https://rawgit.com/ctesta01/qualtricsValidation/master/oireQualtricsLibrary.js"></script>`

## Use in Survey: 
Go to your Qualtrics survey -> Question -> Advanced Question Options (Gear under QID) -> Add Javascript...

Insert here any commands you want to run specific to that question.


## Demonstrations:
### Admissions Raw Data:
Using `qualtricsMath()` and `qualtricsPercentage()` to immediately calculate percentages and relative size validation.
![](http://giant.gfycat.com/MedicalSlushyDogwoodclubgall.gif)

    Qualtrics.SurveyEngine.addOnload(function(){
    	qualtricsPercentage("A2 / A1", cell("A4","QID17"), "QID17");
    	qualtricsPercentage("A3 / A2", cell("A5","QID17"), "QID17");
    	qualtricsLess(cell("A3","QID17"),cell("A2","QID17"));
    	qualtricsLess(cell("A2","QID17"),cell("A1","QID17"));
    });


### Applicants/Acceptances/Enrollments by Race/Ethnicity and Gender:
A table with read-only cell headers, subtotals, and totals validating against previously entered data.
![](http://giant.gfycat.com/BelatedThatAztecant.gif)
http://pastebin.com/embed_iframe.php?i=Jegatvv1

### Characteristics of Entering Class:
Subgroups of total entering students, totaling to previously entered values for enrollees, with automatically calculated percentages.
![](http://fat.gfycat.com/BrokenElasticBichonfrise.gif)

    Qualtrics.SurveyEngine.addOnload(function()
    {
    	qualtricsSum([cell("A3","QID17")], cell("A5","QID3"));
    	setReadOnly(cell("A5","QID3"));
    	setReadOnly(cell("A4","QID3"));
    	hideBox(cell("B4","QID3"));
    	hideBox(cell("B5","QID3"));
    	qualtricsPercentage("A1 / A5",cell("B1","QID3"),"QID3");
    	qualtricsPercentage("A2 / A5",cell("B2","QID3"),"QID3");
    	qualtricsPercentage("A3 / A5",cell("B3","QID3"),"QID3");
    	qualtricsSum(cellRange("A1","A3","QID3"),cell("A4","QID3"));
    	qualtricsEqual([cell("A4","QID3"),cell("A5","QID3")],cellRange("A1","A3","QID3"));
    });

