function watchSet(set, mathFunction) {
    var setSize = set.length;
    for (var i=0; i < setSize; i++) {
        set[i].down().observe("keyup", mathFunction);
    }
}

function setReadOnly(readOnlyCells) {
    if (isCell(readOnlyCells)) {
        readOnlyCells.down().setAttribute("readonly", "readonly");
        readOnlyCells.down().setAttribute("style", "background-color: gainsboro;");
    } 
    if (isCellArray(readOnlyCells)) {
        for (var i=0; i<readOnlyCells.length; i++) {
            readOnlyCells[i].down().setAttribute("readonly", "readonly");
            readOnlyCells[i].down().setAttribute("style", "background-color: gainsboro;");
        }
    }
}

function mathSum(set, output) {
    var setTotal = 0;
    for (var j=0; j < (set.length); j++) {
        var setInputValue = parseInt(set[j].down().value, 10);
        if (isNaN(setInputValue)) { setInputValue = 0; }
        setTotal = setTotal + setInputValue;
    }
    output.down().value = setTotal;
}

function validateError(cells, color) {
    if (color === undefined) {
        color = "pink";
    }
    color = color.concat(";");
    if (isCellArray(cells)) {
        for (var k=0; k < cells.length; k++) {
            cells[k].down().setAttribute("style", "background-color: ".concat(color));
        }
    }
    else if (isCell(cells)) {
        cells.down().setAttribute("style", "background-color: ".concat(color));
    }
    $('NextButton') && $('NextButton').hide();
}

function validateSuccess(cells, color) {
    if (color === undefined) {
        color = "white";
    }
    color = color.concat(";");
    if (isCellArray(cells)) {
        for (var k=0; k < cells.length; k++) {
            cells[k].down().setAttribute("style", "background-color: ".concat(color));
        }
    }
    else if (isCell(cells)) {
        cells.down().setAttribute("style", "background-color: ".concat(color));
    }
    $('NextButton') && $('NextButton').show();
}

function mathEqual(array) {
    var validateStatus = 0;
    for (var l=1; l < array.length; l++) {
        if (array[l].down().value != array[l-1].down().value) {
            validateStatus = 1;
        }
    }
    if (validateStatus == 1) {
        validateError(array);
    } else {validateSuccess(array); }
}

function qualtricsEqual(array, watchCells) {
    if (watchCells === undefined) {
        watchCells = array;
    }

    watchSet(watchCells, function(){mathEqual(array)});
}

function qualtricsSum(array, output) {
    watchSet(array, function(){mathSum(array, output)});
    setReadOnly(output);
}

function hideBox(cells) {
    if (isCell(cells)) {
        cells.setAttribute("style", "visibility:hidden;");
    }
    if (isCellArray(cells)) {
        for (var i=0; i<cells.length; i++) {
            cells[i].setAttribute("style", "visibility: hidden;");
        }
    }
}

function cell(string, qid) {
    var r1 = /^[A-Z]/;
    var r2 = /\d{1,3}/;
    var column = r1.exec(string);
    var row = r2.exec(string.replace(r1, ""));
    if (qid === undefined) {
        //qid = this.QuestionId;
        qid = "QID1";
    }
    if (column === null) {
        alert(string.concat(": Cell misformatted. Column is not single uppercase letter"));
    }
    if (row === null) {
        alert(string.concat(": Cell misformatted. Row is not number between 1 and 3 digits"));
    }
    var qColumn = column[0].charCodeAt(0) - 61;
    var qRow = row - 1;
    return ($(qid).select("td.c".concat(qColumn))[qRow]);
}

function isCell(cell) {
    var re = /<td[^>]*>((?:.|\r?\n)*?)<\/td>/g;
    return re.test(cell.outerHTML);
}

function isCellArray(array) {
    var re = /<td[^>]*>((?:.|\r?\n)*?)<\/td>/;
    var arrayStatus = true;
    if (array.constructor !== Array) {
        arrayStatus = false;
    }
    for (var i=0; i<array.length; i++) {
        if (re.test(array[i].outerHTML) == false) {
            arrayStatus = false;
        }
    }
    return arrayStatus;
}

function cellRange(startCell, endCell, qid) {
    var r1 = /^[A-Z]/;
    var r2 = /[0-9]{1,3}$/;

    if (qid === undefined) {
        qid = this.QuestionId;
    }


    var startCellColumn = r1.exec(startCell)[0].charCodeAt(0) - 61;
    var endCellColumn = r1.exec(endCell)[0].charCodeAt(0) - 61;
    var startCellRow = parseInt(r2.exec(startCell)[0], 10);
    var endCellRow = parseInt(r2.exec(endCell)[0], 10);

    var tempRange = [];
    for (var q=startCellColumn; q<=endCellColumn; q++) {
        for (var r=startCellRow; r<=endCellRow; r++) {
            tempRange.push(q);
            tempRange.push(r);
        }
    }

    var outputRange = [];
    for (var orJKL=0; orJKL < tempRange.length; orJKL+=2) {
        outputRange.push(cell(String.fromCharCode(tempRange[orJKL]+61).concat(tempRange[orJKL+1]), qid));
    }
    return outputRange;
}

function mathCalc(origString, output, qid) {
    var string = origString;
    var cellMatch = /^[A-Za-z0-9\s]{2,4}/;
    var operatorMatch = /^[\+\-\/\*()\s]/;
    var validStringMatch = /[A-Za-z0-9\+\-\/\*\s]{2,50}/g;
    var operation = [];
    var cells = [];

    if (qid === undefined) {
        qid = this.QuestionId;
    }

    // alert if the input arithmetic operation isn't valid input
    if (validStringMatch.test(string) == false) {
        alert(string.concat(" is a non-valid arithmetic expression"));
    }

    function regMatchCellString(str) {
        switch (true) {
          case cellMatch.test(str):
              if (cell(cellMatch.exec(string)[0].trim(), qid).down().value === "") {
                  operation.push("0");
              }
              else {
                  operation.push(cell(cellMatch.exec(string)[0].trim(), qid).down().value);
              }
              cells.push(cell(cellMatch.exec(string)[0].trim(), qid));
              string = string.replace(cellMatch, "");
            break;
          case operatorMatch.test(str):
                operation.push(operatorMatch.exec(string)[0]);
                string = string.replace(operatorMatch, "");
            break;
          default:
                console.log(string);
                console.log("String didn't match as a cell or operator");
            break;
        }
    }

    while (string !== "") {
        regMatchCellString(string);
    }
    
    setReadOnly(output);
    outputValue = eval(operation.join(""));
    if (isFinite(outputValue) == false) {
        outputValue = 0;
    }
    return [outputValue, cells];
}

function qualtricsMath(string, output, qid) {
    watchSet(mathCalc(string,output,qid)[1], function(){
        output.down().value = mathCalc(string,output,qid)[0];
    });
}

function setDefaultValue(cells, values) {
    if (isCell(cells)) {
        if (values.constructor == Array) {
            console.log("setDefaultValue: single cell and multiple values passed to setDefaultValue");
        }
        else {
            cells.down().value = values;
        }
    }
    else if (isCellArray(cells)) {
        if (values.constructor == Array) {
            if (values.length == cells.length) {
                for (var i=0; i<cells.length; i++) {
                    cells[i].down().value = values[i];
                }
            }
            else {console.log("setDefaultValue: cells length and values length are not the same");}
        }
        else {console.log("setDefaultValue: cells is array, but values is not.");}
    }
}

function qualtricsPercentage(equation, output, qid) {
    watchSet(mathCalc(equation, output,qid)[1], function(){
        output.down().value = (mathCalc(equation,output,qid)[0]*100).toString().concat("%");
    }
}
