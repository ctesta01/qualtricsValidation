Qualtrics.SurveyEngine.addOnload(function() {
    var qid = this.questionId;
    var appTotal = $(qid).select('td.c4').last().down();
    var accTotal = $(qid).select('td.c5').last().down();
    var enTotal = $(qid).select('td.c6').last().down();

    // sumCol(x,y)
    // takes a set of elements (x), sums all but the last 
    // element, and puts the result in y. 
    function sumCol(x,y) {
        var totalApp=0
            for (var i=0; i < (x.length - 1); i++) {
                var appInputValue = parseInt(x[i].down().value);
                if(isNaN(appInputValue)) appInputValue = 0;
                x[i].down().value=appInputValue;
                totalApp=totalApp+appInputValue
            }
        y.value = totalApp;
    }

    // sumValidate 
    // why are these two functions? this is miserable.
    // sumValidate doesn't even validate, also miserable. 
    // sumValidate is a glorified way to call sumCol and pass
    // it the data it needs a little more intelligably. 
    function sumValidate(columnTotal, cellSelect, cellNumber) {
        columnTotal.setAttribute("readonly", "readonly")
            for (var i=0; i < (cellNumber); i++){
            cellSelect[i].down().observe("keyup",function(event){
                sumCol(cellSelect, columnTotal);
            });
        }
    }

    sumValidate(appTotal, $(qid).select('td.c4'), 2);
    sumValidate(accTotal, $(qid).select('td.c5'), 2);
    sumValidate(enTotal, $(qid).select('td.c6'), 2);
    
});

