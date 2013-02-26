package edu.ucsb.cs56.pconrad.javamoodlexml.main;

import edu.ucsb.cs56.pconrad.javamoodlexml.model.QuizFile;
import edu.ucsb.cs56.pconrad.javamoodlexml.model.MultipleChoiceQuestion;
import edu.ucsb.cs56.pconrad.javamoodlexml.model.MultipleChoiceAnswer;

public class Sample {

    public static void main(String [] args) {
	
	QuizFile qf = new QuizFile("Test Category");

	MultipleChoiceQuestion mcq = new MultipleChoiceQuestion();

	mcq.setQuestiontext("What was President Bill Clinton's Middle Name?");

	MultipleChoiceAnswer mca = new MultipleChoiceAnswer();

	mca.setCorrect(true); mca.setText("Jefferson"); mcq.add(mca);

	mca = new MultipleChoiceAnswer();
	mca.setCorrect(false); mca.setText("Washington"); mcq.add(mca);

	mca = new MultipleChoiceAnswer();
	mca.setCorrect(false); mca.setText("Christopher"); mcq.add(mca);

	mca = new MultipleChoiceAnswer();
	mca.setCorrect(false); mca.setText("Rutherford"); mcq.add(mca);

	mca = new MultipleChoiceAnswer();
	mca.setCorrect(false); mca.setText("Harrison"); mcq.add(mca);

	// Add it to the quiz
	qf.add(mcq);

	System.out.println(qf);
	
    }

}