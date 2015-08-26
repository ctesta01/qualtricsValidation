function qualtricsMath(mathFunction, set, output) {
    setSize = set.length;
    output.setAttribute("readonly", "readonly");
    for (var i=0; i < setSize; i++) {
        set[i].down().observe("keyup", function(){
            mathFunction(set, output)
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
}

function mathEquiv(array) {
    for (var l=1; l < array.length; l++) {
        if (array[l] != array[l-1]) {
            validateError(array);
        }
    }
}

function equivValidate(array) {
    for (var m=0; m < array.length; m++) {
        array[m].down().observe("keyup", function(){
            mathEquiv(array)
        });
    }

}

