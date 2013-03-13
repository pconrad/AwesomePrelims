// funcOneToOneOnto02.js   



function generateQuizzes(howMany, numSetQuestions, numFunctionQuestions, numChoices) {

    // TODO: replace with JQuery equivalent

    window.document.getElementById("quizzes").innerHTML = "";
    window.document.getElementById("answers").innerHTML = "";

    for (var i=1; i<=howMany; i++) {
	generateQuiz(i, numSetQuestions, numFunctionQuestions, numChoices);
    }
}

function generateQuiz(num, numSetQuestions, numFunctionQuestions, numChoices) {



    var questionsHeader = "<h2 " + 
	(num>1 ? "style='page-break-before:always'" : "")
	+ ">CS40-W13-IC15, version " + num + ", page 1 (Sets)</h2>"
	+ "<p style='margin-top:3em;'>CS40 W13 IC15, (10 pts)  Name: ___________________________________</p>";

    var answerKeyHeader = "<h2 style='page-break-before:always'>"
	+ "CS40-W13-IC15, version " + num + ", Answer Key</h2>";

    var page2header = "<h2 style='page-break-before:always'>CS40-W13-IC15, version " + num + ", page 2 (Functions)</h2>"
	+ "<p style='margin-top:3em;'>Name: ___________________________________</p>";
    var questions = "<h3>Questions</h3>";
    var answers = "<h3>Answer Key</h3>";


    setExercises = generateSetOperationsQuestions(numSetQuestions,numChoices);
    functionExercises = generateFunctionOnetoOneOntoQuestions(numFunctionQuestions,"B","C",true);

    for (var i=0; i<setExercises.length; i++ ) {
	
	// The question text is now at exercises[i].questionText
	
	questions += "<p style='margin-top:2em;clear:both;'> (" 
	    + (i+1) 
	    + ") (5 pts) " 
	    + setExercises[i].questionText + "</p>";
	
	
	numAnswersResult = setExercises[i].selectNumAnswers(numChoices);
	
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
	
    } // for loop over all setExercises


    window.document.getElementById("quizzes").innerHTML += 
	questionsHeader+questions; 
    window.document.getElementById("answers").innerHTML += 
	answerKeyHeader+answers; 
    
    questions = answers = "";

    for (var i=0; i<functionExercises.length; i++ ) {
	
	// The question text is now at functionExercises[i].questionText
	
	questions += "<p style='margin-top:2em;clear:both;'> (" 
	    + (i+1+setExercises.length) 
	    + ") (5 pts) " 
	    + functionExercises[i].questionText + "</p>";
	
	
	numAnswersResult = functionExercises[i].selectNumAnswers(numChoices);
	
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

	answers += "<p> (" + (i+1+setExercises.length) + ") " + letters[correctAnswerIndex]
	    + ". " + theAnswers[correctAnswerIndex]
	    + "</p>";
	
    } // for loop over all functionExercises


    window.document.getElementById("quizzes").innerHTML += page2header+questions; 
    window.document.getElementById("answers").innerHTML += answers; 

}
