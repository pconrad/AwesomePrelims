// funcOneToOneOnto01.js   

function generateExercise() {
    
    var questions = "";
    var answers = "";

    exercises = generateFunctionOnetoOneOntoQuestions(10);
    for (var i=0; i<exercises.length; i++ ) {
	
	// The question text is now at exercises[i].questionText
	
	questions += "<p style='margin-top:2em;'> (" 
	    + (i+1) 
	    + ") " 
	    + exercises[i].questionText + "</p>";
	
	var numChoices = 5;
	
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
	
	window.document.getElementById("questions").innerHTML = questions; 
	window.document.getElementById("answers").innerHTML = answers; 
    } // for loop over all exercises
    
}
