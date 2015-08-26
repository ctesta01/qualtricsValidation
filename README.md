# OIRE Qualtrics JavaScript Validators

This is the start of a pretty large project to build better validation into Qualtrics. Right now it can't do much past summing a single value, and validating against a single other question entry. 

Hopefully I can change that with enough JavaScript (it never ends).

## Installing: 
Go to your Qualtrics survey -> Look & Feel -> Advanced -> Paste into Header:

`<script src="https://rawgit.com/ctesta01/qualtricsValidation/master/oireQualtricsLibrary.js"></script>`


### Hiding a cell
![](http://giant.gfycat.com/DeepGranularFrenchbulldog.gif)
`hideBox([$("QID1").select('td.c4')[0]]);`

### Summing a Column
![](http://giant.gfycat.com/PastKaleidoscopicLamprey.gif)
`sumMatrix($("QID1").select('td.c5').slice(0,-1), $("QID1").select('td.c5').last().down());`

### Summing Specific Cells
![](http://giant.gfycat.com/UnimportantCourageousAngora.gif)
`sumMatrix([$("QID1").select('td.c6')[0], $("QID1").select('td.c6')[1], 
               $("QID1").select('td.c6')[2]], $("QID1").select('td.c6')[3].down());`

### Equivalency Validation
`equivValidate([$("QID1").select('td.c7')[0],$("QID1").select('td.c7')[1]]);`

