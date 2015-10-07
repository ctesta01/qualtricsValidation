function watchSet(set, mathFunction) {
    var setSize = set.length;
    
    // for each cell in the set, run mathFunction whenever a "keyup" is observed
    for (var i=0; i < setSize; i++) {
        set[i].down().observe("keyup", mathFunction);
    }
}

function setReadOnly(readOnlyCells) {
    // set cell readonly: readonly and background to gainsboro, a nice color of gray
    
    // if single cell
    if (isCell(readOnlyCells)) {
        readOnlyCells.down().setAttribute("readonly", "readonly");
        readOnlyCells.down().setAttribute("style", "background-color: gainsboro;");
    } 
    
    // if array of cells
    if (isCellArray(readOnlyCells)) {
        for (var i=0; i<readOnlyCells.length; i++) {
            readOnlyCells[i].down().setAttribute("readonly", "readonly");
            readOnlyCells[i].down().setAttribute("style", "background-color: gainsboro;");
        }
    }
}

function mathSum(set, output) {
    // instantiating setTotal, where we'll total the cells passed in
    var setTotal = 0;
    
    // loop through the cells, adding each cell's value to setTotal
    // if a cell has no value, add zero to the setTotal and move on.
    for (var j=0; j < (set.length); j++) {
        var setInputValue = parseInt(set[j].down().value, 10);
        if (isNaN(setInputValue)) { setInputValue = 0; }
        setTotal = setTotal + setInputValue;
    }
    
    // set the value of the output cell to setTotal
    output.down().value = setTotal;
}

function validateError(cells, color) {
    // default color for invalid cells will be pink
    if (color === undefined) {
        color = "pink";
    }
    
    // this is just some formatting, so that the css gets set as 'background-color: color;'
    color = color.concat(";");
    
    // for an array of cells, set each cell's background pink
    if (isCellArray(cells)) {
        for (var k=0; k < cells.length; k++) {
            cells[k].down().setAttribute("style", "background-color: ".concat(color));
        }
    }
    
    // for a single cell, set that cell's background to pink
    else if (isCell(cells)) {
        cells.down().setAttribute("style", "background-color: ".concat(color));
    }
    
    // hide the next button
    $('NextButton') && $('NextButton').hide();
}

function validateSuccess(cells, color) {
    // default color for valid cells is white
    if (color === undefined) {
        color = "white";
    }
    
    // this is just some formatting, so that the css gets set as 'background-color: color;'
    color = color.concat(";");
    
    // for an array of cells, set each cell's background white
    if (isCellArray(cells)) {
        for (var k=0; k < cells.length; k++) {
            cells[k].down().setAttribute("style", "background-color: ".concat(color));
        }
    }
    
    // for a single cell, set the cell's background to white
    else if (isCell(cells)) {
        cells.down().setAttribute("style", "background-color: ".concat(color));
    }
    
    // hide the next button
    $('NextButton') && $('NextButton').show();
}

function mathEqual(array) {
    // set default validateStatus as 0, we'll use validateStatus to run either validateSuccess or validateError
    var validateStatus = 0;
    
    // loop through the array of cells passed in, and if any two are unequal, set the validateStatus to 1
    for (var l=1; l < array.length; l++) {
        if (array[l].down().value != array[l-1].down().value) {
            validateStatus = 1;
        }
    }
    
    // if validateStatus was set to 1 in the previous step, run validateError on the array,
    // otherwise run validateSuccess on the array
    if (validateStatus == 1) {
        validateError(array);
    } else {validateSuccess(array); }
}

function mathLessThan(lessCell, greatCell) {
    // if the integer value of the lessCell is greater or equal to the value of the greater cell, 
    if (parseInt(lessCell.down().value) > parseInt(greatCell.down().value)) {
        validateError([greatCell, lessCell]);
        return false;
    }
    
    // if the integer value of the lessCell is in fact less than or equal to the greater cell, validateSuccess!
    else {
        validateSuccess([greatCell, lessCell]);
        return true;
    }
}

function qualtricsLess(lessCell, greatCell) {
    // pass lessCell and greatCell as the array of cells to be watched, and pass mathLessThan(lessCell, greatCell)
    // to be called whenever the lessCell and greatCell are updated
    watchSet([lessCell, greatCell], function(){
        mathLessThan(lessCell, greatCell);
    });
}

function qualtricsEqual(array, watchCells) {
    // 
    if (watchCells === undefined) {
        watchCells = array;
    }

    watchSet(watchCells, function(){
        mathEqual(array);
    });
}

function qualtricsSum(array, output) {
    watchSet(array, function(){
        mathSum(array, output);
    });
    setReadOnly(output);
}

function hideBox(cells) {
    if (isCell(cells)) {
        cells.down().setAttribute("style", "visibility:hidden;");
    }
    if (isCellArray(cells)) {
        for (var i=0; i<cells.length; i++) {
            cells[i].down().setAttribute("style", "visibility: hidden;");
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
        if (re.test(array[i].outerHTML) === false) {
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
    if (validStringMatch.test(string) === false) {
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
    if (isFinite(outputValue) === false) {
        outputValue = 0;
    }
    return [outputValue, cells];
}

function qualtricsMath(string, output, qid, watchCells) {
    if (watchCells === undefined) {
        watchCells = mathCalc(string,output,qid)[1];
    }
    watchSet(watchCells, function(){
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

function qualtricsPercentage(equation, output, qid, watchCells) {
    if (watchCells === undefined) {
        watchCells = mathCalc(equation, output, qid)[1];
    }

    watchSet(watchCells, function(){
        output.down().value = ((mathCalc(equation,output,qid)[0]*100).toFixed(1)).toString().concat("%");
    });
}



