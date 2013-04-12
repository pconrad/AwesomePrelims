// rst.js

//  TODO: Can we factor out some of this?
//        Can we make it so that the "generateSetOpQuestions" function
//        is passed in as a parameter, because "generateSetOpQuestions" is
//        a function with a set of behaviors that is somehow standardized?
//
//  So that this whole thing becomes
//    function generateQuizzes(howMany, numQuestions, numChoices,
//                             generateQuestionsFunction) ...
//  and the call to it becomes something like:
//
//     generateQuizzes(40, 6, 5, generateSetOpQuestions);
//  or:
//     generateQuizzes(40, 6, 5, generateReflexiveSymmetricTransitiveQuestions);


function dispOptions(){

generateQuiz(1, 3, 5)

numQuestionsDropDownBox="<select id=&quot;numQuestionsDropDownBox&quot onChange=\"generateQuizzes(1, this.value, 5)\";>" +
  "<option value=\"3\">3</option>" +
  "<option value=\"5\">5</option>" +
  "<option value=\"10\">10</option>" +
  "<option value=\"15\">15</option>" +
"</select>";

window.document.getElementById("numQuestionsDropDown").innerHTML += numQuestionsDropDownBox;

}


function generateQuizzes(howMany, numQuestions, numChoices) {
	window.document.getElementById("quizzes").innerHTML ="";
    window.document.getElementById("answers").innerHTML ="";
    for (var i=1; i<=howMany; i++) {
    generateQuiz(i, numQuestions, numChoices);
    }
}

function generateQuiz(num, numQuestions, numChoices) {

    var header = "<h2 style='page-break-before:always'>Quiz " + num + "</h2>";
    var questions = "";
    var answers = "";

    exercises = generateSetOperationsQuestions(numQuestions,7);

    for (var i=0; i<exercises.length; i++ ) {

    // The question text is now at exercises[i].questionText

    questions += "<p style='margin-top:2em;'> ("
        + (i+1)
        + ") "
        + exercises[i].questionText + "</p>";


    numAnswersResult = exercises[i].selectNumAnswers(numChoices);

    // Now, numAnswersResult[0] is an array of answers
    // numAnswersResult[1] is the index of the correct answer.

    theAnswers = numAnswersResult[0];
    correctAnswerIndex = numAnswersResult[1];

    questions += "<ol style='list-style-type:lower-alpha'>";

    for (var j=0; j < numChoices; j++) {
        questions+="<li>" + theAnswers[j] + "</li>";
    } // for loop over all answer choices

    questions += "</ol>";

    var letters = ["a","b","c","d","e"];

    answers += "<p> (" + (i+1) + ") " + letters[correctAnswerIndex]
        + ". " + theAnswers[correctAnswerIndex]
        + "</p>";

    } // for loop over all exercises

    window.document.getElementById("quizzes").innerHTML += header+questions;
    window.document.getElementById("answers").innerHTML += header+answers;

}