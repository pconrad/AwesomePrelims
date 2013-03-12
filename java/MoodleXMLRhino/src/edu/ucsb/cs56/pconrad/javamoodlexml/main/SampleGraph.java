package edu.ucsb.cs56.pconrad.javamoodlexml.main;

import edu.ucsb.cs56.pconrad.javamoodlexml.model.QuizFile;
import edu.ucsb.cs56.pconrad.javamoodlexml.model.MultipleChoiceQuestion;
import edu.ucsb.cs56.pconrad.javamoodlexml.model.MultipleChoiceAnswer;
import edu.ucsb.cs56.pconrad.javamoodlexml.model.BipartiteGraph;


public class SampleGraph {

    public static void main(String [] args) {
	
	QuizFile qf = new QuizFile("Functions (1-to-1, onto)");

	MultipleChoiceQuestion mcq = new MultipleChoiceQuestion();

	String questionText = "<p>Which is true about the mapping represented by this graph?</p>";
	
	BipartiteGraph g = new BipartiteGraph(3,3,100,100);
	g.addEdge(0,0);
	g.addEdge(0,1);
	g.addEdge(1,2);
	g.addEdge(2,1);

	questionText += "<div style='width:200px; height:200px; border: 1px solid black;'>" + g.toString() + "</div>";
	
	mcq.setQuestiontext(questionText);

	MultipleChoiceAnswer mca = new MultipleChoiceAnswer();

	mca.setCorrect(true); mca.setText("It is not a function"); mcq.add(mca);

	mca = new MultipleChoiceAnswer();
	mca.setCorrect(false); mca.setText("It is a function that is 1-to-1, but not onto"); mcq.add(mca);

	mca = new MultipleChoiceAnswer();
	mca.setCorrect(false); mca.setText("It is a function that is onto, but not 1-to-1"); mcq.add(mca);

	mca = new MultipleChoiceAnswer();
	mca.setCorrect(false); mca.setText("It is a function that is both 1-to-1 and onto"); mcq.add(mca);

	mca = new MultipleChoiceAnswer();
	mca.setCorrect(false); mca.setText("It is a function that is neither 1-to-1 nor onto"); mcq.add(mca);

	// Add it to the quiz
	qf.add(mcq);

	System.out.println(qf);
	
    }

}