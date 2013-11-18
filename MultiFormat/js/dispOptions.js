var theGenerateFunction = null; // embedded in the HTML

function dispOptions(answerKey, generateFunction, format)
{

    // If format not supplied, default value is 'html'
    format = (typeof format !== 'undefined') ? format : 'html';
    
    legalFormats = ["html","LaTeX"];
   
    if (legalFormats.indexOf(format)==-1) {
	window.alert("Error: illegal format " + format + " passed to dispOptions; " +
		     " generateFunction= " + generateFunction);
	return;
    }
 

    theGenerateFunction = generateFunction; 
    generateQuiz(1, 3, 5, answerKey, generateFunction, format)

    if (format=="html") {
	numQuestionsDropDownBox = 
	    "\n<select id=\"numQuestionsDropDownBox\" onChange=\"generateQuizzes(1, this.value, 5, " + answerKey + ", theGenerateFunction);\">" +
	    "\n\t<option value=\"3\">3</option>" +
	    "\n\t<option value=\"5\">5</option>" +
	    "\n\t<option value=\"10\">10</option>" +
	    "\n\t<option value=\"15\">15</option>" +
	    "\n</select>";
	window.document.getElementById("numQuestionsDropDown").innerHTML += numQuestionsDropDownBox;
    }
    

}


function generateQuizzes(howMany, numQuestions, numChoices, answerKey, generateFunction, format) 
{

    // If format not supplied, default value is 'html'
    format = (typeof format !== 'undefined') ? format : 'html';
    
    legalFormats = ["html","LaTeX"];
   
    if (legalFormats.indexOf(format)==-1) {
	window.alert("Error: illegal format " + format + " passed to dispOptions; " +
		     " generateFunction= " + generateFunction);
	return;
    }



    window.document.getElementById("quizzes").innerHTML ="";
    window.document.getElementById("answers").innerHTML ="";




    for (var i=1; i<=howMany; i++) {
        generateQuiz(i, numQuestions, numChoices, answerKey, 
		     generateFunction, format);
    }

}

function generateQuizHeader(format, num) {
    if (format=="html") {
	return "<h2 style='page-break-before:always'>Quiz " + num + "</h2>\n";
    }

    if (format=="LaTeX") {
	return "\\section{Quiz " + num + "}\n";
    }

    return "generateQuizHeader: Unknown format: " + format 
	+ " num: " + num + "\n";
}

function generate_h3(format, text) {
    if (format=="html") {
	return "<h3>" + text + "</h3>\n";
    }
    if (format=="LaTeX") {
	return "\\subsection{" + text + "}\n"
    }
    return "generate_h3: Unknown format: " + format + " text:" + text + "\n";
}

function formatQuestion(format, i, questionText) {

    if (format=="html") {
	return "<p style='margin-top:2em;'> ("
            + (i)
            + ") "
            + questionText + "</p>";
    } 
    if (format=="LaTeX") {
	return "\n\n(" + i + ") " + questionText + "\n\n";
    }

    return "formatQuestion: Unknown format: " + format + " i:" + i + " questionText:" + questionText + "\n";


}

function generateAlphaList(format, numChoices, theItems) {
    var result = "";
    if (format=="html") {
	result += "<ol style='list-style-type:lower-alpha'>";
	
	for (var j = 0; j < numChoices; j++) {
	    result += "<li>" + theItems[j] + "</li>";
	} // for loop over all answer choices
	
	result += "</ol>";
	return result;
    }
    if (format == "LaTeX") {
	result += "\\begin{enumerate}\n";
	result += "\\renewcommand{\\theenumi}{\\alph{enumi}}\n";
	
	for (var j = 0; j < numChoices; j++) {
	    result += "\\item " + theItems[j] + " \n";
	} // for loop over all answer choices
	
	result += "\\end{enumerate}\n\n";
	return result;
    }
    return "Error: unknown format:" + format + "\n";
}

function generateAnswerKeyItem(format, i, correctAnswerIndex, theAnswers) {
    
    var letters = ["a","b","c","d","e"];
    
    if (format=="html") {
        return "<p> (" + (i+1) + ") " + letters[correctAnswerIndex]
            + ". " + theAnswers[correctAnswerIndex]
            + "</p>";
    }
    if (format=="LaTeX") {
        return "\n\n (" + (i+1) + ") " + letters[correctAnswerIndex]
            + ". " + theAnswers[correctAnswerIndex]
            + "\n\n";
    }

    return "Error: unknown format:" + format + "\n";
    
   
}


function generateQuiz(num, numQuestions, numChoices, answerKey, 
		      generateFunction, format)
{

    // If format not supplied, default value is 'html'
    format = (typeof format !== 'undefined') ? format : 'html';
    
    legalFormats = ["html","LaTeX"];
   
    if (legalFormats.indexOf(format)==-1) {
	window.alert("Error: illegal format " + format + 
		     " passed to dispOptions; " +
		     " generateFunction= " + generateFunction);
	return;
    }
    
    //window.alert(":generateFunction = " + generateFunction);

    var header = generateQuizHeader(format, num);
    var questions=""; var answers="";
    
    //Sets variables according to whether or not it is an answer key
    if (answerKey == 'true')
    {    
        var questions = generate_h3(format,"Questions");
        var answers = generate_h3(format,"Answers");
    }

    if (generateFunction != null)
        exercises = generateFunction(numQuestions, format);

    for (var i = 0; i < exercises.length; i++ ) 
    {
        // The question text is now at exercises[i].questionText


	questions += formatQuestion(format,i+1,exercises[i].questionText);

        numAnswersResult = exercises[i].selectNumAnswers(numChoices);

        // Now, numAnswersResult[0] is an array of answers
        // numAnswersResult[1] is the index of the correct answer.

        theAnswers = numAnswersResult[0];
        correctAnswerIndex = numAnswersResult[1];

	questions += generateAlphaList(format, numChoices, theAnswers); 

	answers += generateAnswerKeyItem(format, i, correctAnswerIndex, theAnswers); 

 
    } // for loop over all exercises

    window.document.getElementById("quizzes").innerHTML += header+questions;
    window.document.getElementById("answers").innerHTML += header+answers;
    


    if (format=="LaTeX") {
	window.alert("LaTeX");
	window.document.getElementById("LaTeXHeader").innerHTML = 

	"\n\\documentclass[12pt]{article}\n\n"
	    + "\\setlength{\\parskip}{\\baselineskip} % double space between paragraphs\n"
	    + "\\setlength{\\parindent}{0pt} % no indent for paragraphs\n\n"
	    + "\\begin{document}\n\n\n";

	window.document.getElementById("LaTeXFooter").innerHTML = 
	    "\n\\end{document}\n\n\n";
    }

    

}
