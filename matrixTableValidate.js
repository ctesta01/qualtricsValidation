Qualtrics.SurveyEngine.addOnload(function() {
    var qid = this.questionId;

    var appTotal = $(qid).select('td.c4').last().down();
 //   appTotal.setAttribute("readonly", "readonly");
 //   var Applications = $(qid).select('td.c4');
 //   for (var i=0; i < (Applications.length-1); i++){
 //       Applications[i].down().observe("keyup",function(event){
 //           sumCol(Applications, appTotal);
 //       });
 //   }

    var accTotal = $(qid).select('td.c5').last().down();
 //   accTotal.setAttribute("readonly", "readonly")
 //       var Accepts = $(qid).select('td.c5');
 //   for (var i=0; i < (Accepts.length-1); i++){
 //       Accepts[i].down().observe("keyup",function(event){
 //           sumCol(Accepts, accTotal);
 //       });
 //   }

    var enTotal = $(qid).select('td.c6').last().down();
//    enTotal.setAttribute("readonly", "readonly")
//        var Enrolls = $(qid).select('td.c6');
//    for (var i=0; i < (Enrolls.length-1); i++){
//        Enrolls[i].down().observe("keyup",function(event){
//            sumCol(Enrolls, enTotal);
//        });
//    }

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
    sumValidate(
    
});

