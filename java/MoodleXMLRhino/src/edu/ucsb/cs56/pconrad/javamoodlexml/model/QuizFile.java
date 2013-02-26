package edu.ucsb.cs56.pconrad.javamoodlexml.model;

import java.util.ArrayList;

public class QuizFile {

    private String category;
    private ArrayList<MultipleChoiceQuestion> questions;

    public QuizFile(String category) {
	this.category = category;
	questions = new ArrayList<MultipleChoiceQuestion>();
    }

    public void add(MultipleChoiceQuestion mcq) {
	questions.add(mcq);
    }

    public void setCategory (String category) { this.category = category; }

    public String toString () {

	String result = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" + 
	    "<quiz>\n" + 
	    "\n" + 
	    "\n" + 
	    "<!-- question: 0  -->\n" + 
	    "  <question type=\"category\">\n" + 
	    "    <category>\n" + 
	    "        <text>$course$/" + this.category + "</text>\n" +
	    "\n" + 
	    "    </category>\n" +
	    "  </question>\n";
	    
	for (MultipleChoiceQuestion mcq: questions) {
	    result += mcq.toString();
	}

	result += "</quiz>\n";
	return result;
    }

}