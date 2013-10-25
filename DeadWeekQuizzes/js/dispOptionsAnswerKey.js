// rst02.js   



function generateQuizzes(howMany, numQuestions, numChoices) {
    for (var i=1; i<=howMany; i++) {
	generateQuiz(i, numQuestions, numChoices);
    }
}

function generateQuiz(num, numQuestions, numChoices) {

    var header = "<h2 style='page-break-before:always'>Quiz " + num + "</h2>";
    var questions = "<h3>Questions</h3>";
    var answers = "<h3>Answer Key</h3>";

    exercises = generateReflexiveSymmetricTransitiveQuestions(numQuestions);

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
