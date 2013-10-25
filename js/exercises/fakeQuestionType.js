function generateFakeQuestions(count, numChoices)
{
    // TODO: Make sure numChoices is at least 2.

    // This is model code that generates fake questions.
    // It is a template 

    var fakeWrongAnswers = [];

    for (var i=1; i<numChoices; i++)
    { // we want numChoices-1 items
	   fakeWrongAnswers.push("This is fake wrong answer number " + i);
    }

    arr = [];

    for (var i=1; i<=count; i++)
    {
	   arr.push(new MultipleChoiceQuestion
		      ("This is fake question number " + i,
		       "This is a fake right answer",
		       fakeWrongAnswers));
    }
    return arr;
}


