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
    // default watchCells to array
    if (watchCells === undefined) {
        watchCells = array;
    }

    // wrap mathEqual() with watchSet so that mathEqual() is run each time the watchCells are edited
    watchSet(watchCells, function(){
        mathEqual(array);
    });
}

function qualtricsSum(array, output) {
    // wrap mathSum() with watchSet so that mathSum() is run each time its array is updated
    watchSet(array, function(){
        mathSum(array, output);
    });
    setReadOnly(output);
}

function hideBox(cells) {
    // if single cell, set visibility to hidden
    if (isCell(cells)) {
        cells.down().setAttribute("style", "visibility:hidden;");
    }
    // if array of cells, set each cell to hidden
    if (isCellArray(cells)) {
        for (var i=0; i<cells.length; i++) {
            cells[i].down().setAttribute("style", "visibility: hidden;");
        }
    }
}

function cell(string, qid) {
    // regex to match cell column (r1), row (r2)
    var r1 = /^[A-Z]/;
    var r2 = /\d{1,3}/;
    var column = r1.exec(string);
    var row = r2.exec(string.replace(r1, ""));
    
    // currently defaulting to QID1, should default to this.Question if possible...
    if (qid === undefined) {
        qid = this.questionId;
    }
    
    // error on invalid column
    if (column === null) {
        alert(string.concat(": Cell misformatted. Column is not single uppercase letter"));
    }
    
    // error on invalid row
    if (row === null) {
        alert(string.concat(": Cell misformatted. Row is not number between 1 and 3 digits"));
    }
    
    // convert column from letter value to integer value
    var qColumn = column[0].charCodeAt(0) - 61;
    
    // adjust row value
    var qRow = row - 1;
    
    // return matching cell
    return ($(qid).select("td.c".concat(qColumn))[qRow]);
}

function isCell(cell) {
    // basically testing if the string matches <td></td> tags
    var re = /<td[^>]*>((?:.|\r?\n)*?)<\/td>/g;
    return re.test(cell.outerHTML);
}

function isCellArray(array) {
    // regex for matching <td></td> tags
    var re = /<td[^>]*>((?:.|\r?\n)*?)<\/td>/;
    
    // default to true
    var arrayStatus = true;
    
    // check that the type of array is actually Array
    if (array.constructor !== Array) {
        arrayStatus = false;
    }
    
    // loop through and check each element in the array against regex (re)
    for (var i=0; i<array.length; i++) {
        if (re.test(array[i].outerHTML) === false) {
            arrayStatus = false;
        }
    }
    return arrayStatus;
}

function cellRange(startCell, endCell, qid) {
    // regex to match column and row
    var r1 = /^[A-Z]/;
    var r2 = /[0-9]{1,3}$/;

    // default question ID should be this.questionId
    if (qid === undefined) {
        qid = this.questionId;
    }


    // convert from cell names to values
    var startCellColumn = r1.exec(startCell)[0].charCodeAt(0) - 61;
    var endCellColumn = r1.exec(endCell)[0].charCodeAt(0) - 61;
    var startCellRow = parseInt(r2.exec(startCell)[0], 10);
    var endCellRow = parseInt(r2.exec(endCell)[0], 10);

    // instantiate tempRange, so that we can push things onto 
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
    // make a copy of the original string
    var string = origString;
    
    // regex to match cells
    var cellMatch = /^[A-Za-z0-9\s]{2,4}/;
    
    // regex to match valid operators +, -, *, /, (, )
    var operatorMatch = /^[\+\-\/\*()\s]/;
    
    // regex to match valid user input for the arithmetic operation
    var validStringMatch = /[A-Za-z0-9\+\-\/\*\s]{2,50}/g;
    
    // operation is a stack we will push the final operation to be run onto
    var operation = [];
    
    // cells is a stack we will push cells that are relevant to the operation onto
    var cells = [];

    // default qid is this.questionId
    if (qid === undefined) {
        qid = this.questionId;
    }

    // alert if the input arithmetic operation isn't valid input
    if (validStringMatch.test(string) === false) {
        alert(string.concat(" is a non-valid arithmetic expression"));
    }

    // regMatchCellString() is a local function, that pushes each cell and operator onto the operation array
    function regMatchCellString(str) {
        // check for each of these cases
        switch (true) {
          // if the beginning of the string is a cell, push the cell's value onto the operation stack
          case cellMatch.test(str):
              // if the cell is empty, push 0
              if (cell(cellMatch.exec(string)[0].trim(), qid).down().value === "") {
                  operation.push("0");
              }
              // otherwise push its value
              else {
                  operation.push(cell(cellMatch.exec(string)[0].trim(), qid).down().value);
              }
              // additionally push the cell itself onto the cell stack
              cells.push(cell(cellMatch.exec(string)[0].trim(), qid));
              
              // remove the cell from the string, so that we can move on to the next cell / operator
              string = string.replace(cellMatch, "");
            break;
            
          // if the beginning of the string is an operator, 
          // push the operator onto the operation stack and remove it from the string 
          case operatorMatch.test(str):
                operation.push(operatorMatch.exec(string)[0]);
                string = string.replace(operatorMatch, "");
            break;
            
          // if the string's beginning is neither a valid cell nor an operator, error!
          default:
                console.log(string);
                console.log("String didn't match as a cell or operator");
            break;
        }
    }

    // run regMatchCellString() on string until it finishes
    // each part of the string will be parsed into the operation stack
    // and each of the cells will be saved in the cells stack
    while (string !== "") {
        regMatchCellString(string);
    }
    
    setReadOnly(output);
    
    // evaluate the operation stack as one long operation and store it to outputValue
    outputValue = eval(operation.join(""));
    
    // if outputValue isn't finite, then output 0 instead
    // nobody really likes NaN
    // 1/0 == 0 because of this 
    if (isFinite(outputValue) === false) {
        outputValue = 0;
    }
    
    // return an array of two elements
    // the first being the output value
    // the second being the array of relevant cells
    return [outputValue, cells];
}

function qualtricsMath(string, output, qid, watchCells) {
    
    // set default cells to be watched as the cells-stack from mathCalc()'s output
    if (watchCells === undefined) {
        watchCells = mathCalc(string,output,qid)[1];
    }
    
    // here we wrap a nameless function that updates the output cell's value 
    // with the outputValue from mathCalc()'s return value with watchSet so that whenever watchCells
    // are updated, the mathCalc() runs again and the output cell's value gets updated again
    watchSet(watchCells, function(){
        output.down().value = mathCalc(string,output,qid)[0];
    });
}

function setDefaultValue(cells, values) {
    if (isCell(cells)) {
        // if cells is a single cell, and if values is an array, error
        if (values.constructor == Array) {
            console.log("setDefaultValue: single cell and multiple values passed to setDefaultValue");
        }
        // if cells and values are both a single value,
        // set the single cell, cells, value to values
        else {
            cells.down().value = values;
        }
    }
    else if (isCellArray(cells)) {
        // if cells is an array, and values is an array
        if (values.constructor == Array) {
            // check that they have the same length
            if (values.length == cells.length) {
                // set the value of each cell to the corresponding value
                for (var i=0; i<cells.length; i++) {
                    cells[i].down().value = values[i];
                }
            }
            // length doesn't match error
            else {console.log("setDefaultValue: cells length and values length are not the same");}
        }
        // if cells are of type array, but values isn't, error
        else {console.log("setDefaultValue: cells is array, but values is not.");}
    }
}

function qualtricsPercentage(equation, output, qid, watchCells) {
    // default watchCells to the cells used in equation
    if (watchCells === undefined) {
        watchCells = mathCalc(equation, output, qid)[1];
    }

    // run the following nameless function whenever watchCells are updated
    // the nameless function here runs the mathCalc function on the given equation, 
    // multiplies the output by 100, and appends '%' to it, as to produce a percentage-format
    watchSet(watchCells, function(){
        output.down().value = ((mathCalc(equation,output,qid)[0]*100).toFixed(1)).toString().concat("%");
    });
}



