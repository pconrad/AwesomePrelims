function dispOptions(questionType, answerKey)
{
    generateQuiz(1, 3, 5, questionType, answerKey)

    numQuestionsDropDownBox = 
    "<select id=&quot;numQuestionsDropDownBox&quot onChange=\"generateQuizzes(1, this.value, 5)\";>" +
    "<option value=\"3\">3</option>" +
    "<option value=\"5\">5</option>" +
    "<option value=\"10\">10</option>" +
    "<option value=\"15\">15</option>" +
    "</select>";

    window.document.getElementById("numQuestionsDropDown").innerHTML += numQuestionsDropDownBox;
}


function generateQuizzes(howMany, numQuestions, numChoices, questionType, answerKey) 
{
	window.document.getElementById("quizzes").innerHTML ="";
    window.document.getElementById("answers").innerHTML ="";

    for (var i=1; i<=howMany; i++)
        generateQuiz(i, numQuestions, numChoices, questionType, answerKey);
}

function generateQuiz(num, numQuestions, numChoices, questionType, answerKey)
{
    //Sets variables according to whether or not it is an answer key
    if (answerKey == 'true')
    {
        var header = "<h2 style='page-break-before:always'>Quiz " + num + "</h2>";
        var questions = "<h3>Questions</h3>";
        var answers = "<h3>Answer Key</h3>";
    }
    else
    {
        var header = "<h2 style='page-break-before:always'>Quiz " + num + "</h2>";
        var questions = "";
        var answers = "";
    }

    //Generates exercises based on the question type
    if (questionType == 'RSTQ')
        exercises = generateReflexiveSymmetricTransitiveQuestions(numQuestions);

    for (var i=0; i<exercises.length; i++ ) 
    {
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