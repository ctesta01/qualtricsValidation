// watchSet() watches a set of cells you give it for changes, and 
// calls another function when
// it sees something change.
function watchSet(set, mathFunction) {
    var setSize = set.length;
    for (var i=0; i < setSize; i++) {
        set[i].down().observe("keyup", mathFunction);
    }
}

// toReadonly() sets a single cell to readonly.
// TODO update to check if array or cell, and if array set all to
// readonly.
function setReadOnly(readOnlyCell) {
    readOnlyCell.down().setAttribute("readonly", "readonly");
    readOnlyCell.down().setAttribute("style", "background-color: gainsboro;");
}

// mathSum() takes a set, sums its components together, and then puts 
// them into an output cell
    function mathSum(set, output) {
        var setTotal = 0;
        for (var j=0; j < (set.length); j++) {
            var setInputValue = parseInt(set[j].down().value, 10);
            if (isNaN(setInputValue)) { setInputValue = 0; }
            setTotal = setTotal + setInputValue;
        }
        output.down().value = setTotal;
    }

// validateError() takes an array, sets those cells to that color, and
// hides the next button.
function validateError(array, color) {
    if (color === undefined) {
        color = "pink";
    }
    color = color.concat(";");
    for (var k=0; k < array.length; k++) {
        array[k].down().setAttribute("style", "background-color: ".concat(color));
    }
    $('NextButton') && $('NextButton').hide();
}

// validateSuccess() takes an array, sets background color, and 
// shows the next button.
function validateSuccess(array, color) {
    if (color === undefined) {
        color = "white";
    }
    color = color.concat(";");
    for (var k=0; k < array.length; k++) {
        array[k].down().setAttribute("style", "background-color: ".concat(color));
    }
    $('NextButton') && $('NextButton').show();
}

// mathEqual() takes an array, checks if any two elements of the 
// array differ pairwise, and calls validateError() and validateSuccess() 
// accordingly on the array its given. 
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

function qualtricsEqual(array) {
    watchSet(array, function(){mathEqual(array)});
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

function cell(string) {
    var r1 = /^[A-Z]/;
    var r2 = /\d{1,3}/;
    var column = r1.exec(string);
    var row = r2.exec(string.replace(r1, ""));
    if (qid === undefined) {
        qid = this.QuestionId;
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

function cellRange(startCell, endCell) {
    var r1 = /^[A-Z]/;
    var r2 = /[0-9]{1,3}$/;

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
        outputRange.push(cell(String.fromCharCode(tempRange[orJKL]+61).concat(tempRange[orJKL+1])));
    }
    return outputRange;
}

function mathCalc(origString, output) {
    var string = origString;
    var cellMatch = /^[A-Za-z0-9\s]{2,4}/;
    var operatorMatch = /^[\+\-\/\*()\s]/;
    var validStringMatch = /[A-Za-z0-9\+\-\/\*\s]{2,50}/g;
    var operation = [];
    var cells = [];

    // alert if the input arithmetic operation isn't valid input
    if (validStringMatch.test(string) == false) {
        alert(string.concat(" is a non-valid arithmetic expression"));
    }

    function regMatchCellString(str) {
        switch (true) {
          case cellMatch.test(str):
              if (cell(cellMatch.exec(string)[0].trim()).down().value === "") {
                  operation.push("0");
              }
              else {
                  operation.push(cell(cellMatch.exec(string)[0].trim()).down().value);
              }
              cells.push(cell(cellMatch.exec(string)[0].trim()));
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
    if (isFinite(outputValue)) {
        output.down().value = eval(operation.join(""));
    }
    else {
        output.down().value = "0";
    }
    return cells;
}

function qualtricsMath(string, output) {
    watchSet(mathCalc(string,output), function(){mathCalc(string,output)});
}
