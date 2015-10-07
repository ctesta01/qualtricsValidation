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
Using `qualtricsMath()` and `qualtricsPercentage()` to immediately calculate percentages, as well as validation that #(Enrollments) < #(Acceptances) < #(Applicants).
![](http://giant.gfycat.com/MedicalSlushyDogwoodclubgall.gif)

### Applicants/Acceptances/Enrollments by Race/Ethnicity and Gender:
A table with some read only headers, subtotals, and totals validating against previously entered data.
![](http://giant.gfycat.com/BelatedThatAztecant.gif)

### Characteristics of Entering Class:
Subgroups of total entering students, totaling to previously entered values for enrollees, with automatically calculated percentages.
![](http://giant.gfycat.com/BrokenElasticBichonfrise.gif)


