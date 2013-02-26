package edu.ucsb.cs56.pconrad.javamoodlexml.model;

import java.util.ArrayList;

public class MultipleChoiceQuestion {

    private String name;
    private String questiontext;
    private boolean shuffleanswers;
    private String correctfeedback;
    private String incorrectfeedback;
    
    private ArrayList<MultipleChoiceAnswer> answers;

    public MultipleChoiceQuestion() {
	this.name = "";
	this.questiontext = "";
	this.shuffleanswers = true;
	this.correctfeedback = "";
	this.incorrectfeedback = "";
	answers = new ArrayList<MultipleChoiceAnswer>();
    }

    public void add(MultipleChoiceAnswer mca) {
	answers.add(mca);
    }

    public void setQuestiontext(String questiontext) {
	this.questiontext = questiontext;
    }

    public void setShuffleanswers(boolean shuffleanswers) {
	this.shuffleanswers = shuffleanswers;
    }

    public void setCorrectfeedback(String correctfeedback) {
	this.correctfeedback = correctfeedback;
    }

    public void setIncorrectfeedback(String incorrectfeedback) {
	this.incorrectfeedback = incorrectfeedback;
    }
    
    public String toString () {
	String result =  "<question type=\"multichoice\">\n" +
	    "    <name><text>Example Question Name</text>\n" +
	    "    </name>\n" +
	    "    <questiontext format=\"moodle_auto_format\">\n" +
	    "<text><![CDATA[" + this.questiontext + "]]></text>\n" + 
	    "    </questiontext>\n" + 
	    "    <image></image>\n" + 
	    "    <generalfeedback>\n" + 
	    "<text></text>\n" + 
	    "    </generalfeedback>\n" + 
	    "    <defaultgrade>1</defaultgrade>\n" + 
	    "    <penalty>0.1</penalty>\n" + 
	    "    <hidden>0</hidden>\n" + 
	    "    <shuffleanswers>" + (this.shuffleanswers?"1":"0") + "</shuffleanswers>\n" + 
	    "    <single>true</single>\n" + 
	    "    <shuffleanswers>" + (this.shuffleanswers?"true":"false") + "</shuffleanswers>\n" + 
	    "    <correctfeedback>      <text><![CDATA[" + this.correctfeedback + "]]></text>\n" + 
	    "</correctfeedback>\n" + 
	    "<partiallycorrectfeedback><text></text></partiallycorrectfeedback>\n" + 
	    "<incorrectfeedback><text><![CDATA[" + this.incorrectfeedback + "]]></text>\n" + 
	    "</incorrectfeedback>\n" + 
	    "    <answernumbering>abc</answernumbering>\n";

	// add in all of the answers
	for (MultipleChoiceAnswer mca: this.answers) {
	    result += mca.toString();
	}


	result += "</question>\n";
	return result;
    }

}