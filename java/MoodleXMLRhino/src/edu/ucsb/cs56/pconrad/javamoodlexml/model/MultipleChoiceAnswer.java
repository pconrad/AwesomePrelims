package edu.ucsb.cs56.pconrad.javamoodlexml.model;

public class MultipleChoiceAnswer {

    private boolean correct;
    private String text;
    private String feedback;

    public void setCorrect(boolean correct) {this.correct = correct;}
    public void setText(String text) {this.text = text;}
    public void setFeedback(String feedback) {this.feedback = feedback;}

    public MultipleChoiceAnswer() {
	this.correct = false;
	this.text = "";
	this.feedback = "";
    }

    public String toString() {
	
	return
	    " <answer fraction=\"" + (this.correct ? "100" : "0" ) + "\">\n" + 
	    "        <text><![CDATA[" + this.text + "]]></text>\n" + 
	    "        <feedback><text><![CDATA[" + this.feedback + "]]></text></feedback>\n" + 
	    " </answer>\n"; 
	
    }

}


