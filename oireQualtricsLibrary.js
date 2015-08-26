// Add all the arithmetical operators
// All the equivalency operators

function readonlyAndWatch(mathFunction, set, output) {
    setSize = set.length;
    output.setAttribute("readonly", "readonly");
    for (var i=0; i < setSize; i++) {
        set[i].down().observe("keyup", function(){
            mathFunction(set, output);
        });
    }
}

function mathSum(set, output) {
    var setTotal = 0;
    for (var j=0; j < (set.length); j++) {
        var setInputValue = parseInt(set[j].down().value);
        if (isNaN(setInputValue)) setInputValue = 0;
        setTotal = setTotal + setInputValue;
    }
    output.value = setTotal;
}

function validateError(array) {
    for (var k=0; k < array.length; k++) {
        array[k].down().setAttribute("style", "background-color: pink;");
    }
    $('NextButton') && $('NextButton').hide();
}

function validateSuccess(array) {
    for (var k=0; k < array.length; k++) {
        array[k].down().setAttribute("style", "background-color: white;");
    }
    $('NextButton') && $('NextButton').show();
}

function mathEquiv(array) {
    var validateStatus = 0;
    for (var l=1; l < array.length; l++) {
        if (array[l].down().value != array[l-1].down().value) {
           validateStatus = 1; 
        }
    }
    if (validateStatus == 1) {
        validateError(array);
    } else validateSuccess(array);
}

function equivValidate(array) {
    for (var m=0; m < array.length; m++) {
        array[m].down().observe("keyup", function(){
            mathEquiv(array)
        });
    }
}

function sumMatrix(array, output) {
    readonlyAndWatch(mathSum, array, output);
}

function dateValidate() {
}

function hideBox(cells) {
    for (var i=0; i<cells.length; i++) {
        cells[i].setAttribute("style", "visibility: hidden;");
    }
}

function mathGreater() {}

function mathLesser() {}

function cell(string) {
    r1 = /^[A-Za-z]/;
    r2 = /\d{1,3}/;
    column = r1.exec(string);
    row = r2.exec(string.replace(r1, ""));
    if (column === null) {
        alert(string.concat(": Cell misformatted. Column is not single letter"));
    }
    if (row === null) {
        alert(string.concat(": Cell misformatted. Row is not number between 1 and 3 digits"));
    }
    qColumn = column[0].charCodeAt(0) - 93;
    qRow = row;
    return ($(this.QuestionId).select("td.c".concat(qColumn))[qRow]);
}


