function sumMatrix(selectionSet, outputCell) {

    
    // This is the actual summation function.
    // When you call sumMatrix, this is the summing part.
    function sumSet(set, output) {
        var setTotal = 0;
        for (var j=0; j < (set.length - 1); j++) {
            var setInputValue = parseInt(set[j].down().value);
            if (isNaN(setInputValue)) setInputValue = 0;
            setTotal = setTotal + setInputValue;
        }
        output = setTotal;
    }
    
    // This is the manipulation of the frontend of the matrix.
    // This makes it such that where the sum goes is readonly
    // And ensures that when people do stuff, the matrix updates.
    setSize = selectionSet.length;
    outputCell.setAttribute("readonly", "readonly");
    for (var i=0; i < setSize; i++) {
       selectionSet[i].down().observe("keyup", sumSet(selectionSet, outputCell));
    } 
}

