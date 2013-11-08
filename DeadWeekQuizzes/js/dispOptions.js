var theGenerateFunction = null;

function dispOptions(answerKey, generateFunction)
{
    //window.alert("generateFunction = " + generateFunction + " " + 'answerKey = ' + answerKey);
    theGenerateFunction = generateFunction;
    generateQuiz(1, 3, 5, answerKey, generateFunction)

    numQuestionsDropDownBox = 
    "\n<select id=\"numQuestionsDropDownBox\" onChange=\"generateQuizzes(1, this.value, 5, " + answerKey + ", theGenerateFunction);\">" +
    "\n\t<option value=\"3\">3</option>" +
    "\n\t<option value=\"5\">5</option>" +
    "\n\t<option value=\"10\">10</option>" +
    "\n\t<option value=\"15\">15</option>" +
    "\n</select>";

    window.document.getElementById("numQuestionsDropDown").innerHTML += numQuestionsDropDownBox;
}


function generateQuizzes(howMany, numQuestions, numChoices, answerKey, generateFunction) 
{
	window.document.getElementById("quizzes").innerHTML ="";
    window.document.getElementById("answers").innerHTML ="";

    for (var i=1; i<=howMany; i++)
        generateQuiz(i, numQuestions, numChoices, answerKey, generateFunction);
}

function generateQuiz(num, numQuestions, numChoices, answerKey, generateFunction)
{
   //window.alert(":generateFunction = " + generateFunction);

    //Sets variables according to whether or not it is an answer key
    if (answerKey == 'true')
    {
        var header = "<h2 style='page-break-before:always'>Quiz " + num + "</h2>";
        var questions = "<h3>Questions</h3>";
        var answers = "<h3>Answer Key</h3>";
    }
    else
    {
        var header = "<h2 style='page-break-before:always'>Quiz " + num + "</h2>\n";
        var questions = "";
        var answers = "";
    }

    if (generateFunction != null)
        exercises = generateFunction(numQuestions);

    //Generates exercises based on the question type
    /*if (questionType == 'RSTQ')
        exercises = generateReflexiveSymmetricTransitiveQuestions(numQuestions);
    else if (questionType == 'OneToOne')
        exercises = generateFunctionOnetoOneOntoQuestions(numQuestions);*/


    for (var i = 0; i < exercises.length; i++ ) 
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

        for (var j = 0; j < numChoices; j++) {
            questions += "<li>" + theAnswers[j] + "</li>";
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
