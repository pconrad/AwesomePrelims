// funcOneToOneOnto02.js   



function generateQuizzes(howMany, numPage1Questions, numChoices) {

    // TODO: replace with JQuery equivalent

    window.document.getElementById("quizzes").innerHTML = "";
    window.document.getElementById("answers").innerHTML = "";

    for (var i=1; i<=howMany; i++) {
	generateQuiz(i, numPage1Questions, numChoices);
    }
}

function generateQuiz(num, numPage1Questions, numPage2Questions, numChoices) {



    var questionsHeader = "<h2 " + 
	(num>1 ? "style='page-break-before:always'" : "")
	+ ">CS40-W13-IC15, version " + num + ", page 1 </h2>"
	+ "<p style='margin-top:3em;'>CS40 W13 IC15, (10 pts)  Name: ___________________________________</p>";

    var answerKeyHeader = "<h2 style='page-break-before:always'>"
	+ "CS40-W13-IC15, version " + num + ", Answer Key</h2>";

    var page2header = "<h2 style='page-break-before:always'>CS40-W13-IC15, version " + num + ", page 2 (Functions)</h2>"
	+ "<p style='margin-top:3em;'>Name: ___________________________________</p>";
    var questions = "<h3>Questions</h3>";
    var answers = "<h3>Answer Key</h3>";


    page1Exercises = generateSetOperationsQuestions(numPage1Questions,numChoices);
    //  page2Exercises = generateSetOperationsQuestions(numPage2Questions,numChoices);

    for (var i=0; i<page1Exercises.length; i++ ) {
	
	// The question text is now at exercises[i].questionText
	
	questions += "<p style='margin-top:2em;clear:both;'> (" 
	    + (i+1) 
	    + ") (5 pts) " 
	    + page1Exercises[i].questionText + "</p>";
	
	
	numAnswersResult = page1Exercises[i].selectNumAnswers(numChoices);
	
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
	
    } // for loop over all page1Exercises


    window.document.getElementById("quizzes").innerHTML += 
	questionsHeader+questions; 
    window.document.getElementById("answers").innerHTML += 
	answerKeyHeader+answers; 
    
    /*    questions = answers = "";

    for (var i=0; i<page2Exercises.length; i++ ) {
	
	// The question text is now at page2Exercises[i].questionText
	
	questions += "<p style='margin-top:2em;clear:both;'> (" 
	    + (i+1+page1Exercises.length) 
	    + ") (5 pts) " 
	    + page2Exercises[i].questionText + "</p>";
	
	
	numAnswersResult = page2Exercises[i].selectNumAnswers(numChoices);
	
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

	answers += "<p> (" + (i+1+page1Exercises.length) + ") " + letters[correctAnswerIndex]
	    + ". " + theAnswers[correctAnswerIndex]
	    + "</p>";
	
    } // for loop over all page2Exercises


    window.document.getElementById("quizzes").innerHTML += page2header+questions; 
    window.document.getElementById("answers").innerHTML += answers; 
    */
}
