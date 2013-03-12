function generateSetOperationsQuestions(count, numChoices) {

    // TODO: Make sure numChoices is at least 2.

    // generate five random subsets of a through h.

    var universe = new Set(["a","b","c","d","e","f","g","h"],
			   false,
			   "U");

    var sets = [];

    sets.push(universe.getRandomSubset());
    sets.push(universe.getRandomSubset(4,2));
    sets.push(universe.getRandomSubset(4,2));
    sets.push(universe.getRandomSubset(6,4));
    sets.push(universe.getRandomSubset(2,1));

    // Quick and Dirty shuffle... TODO consider fixing this up a bit 
    sets.sort(function () { return 0.5 - Math.random();});

    var names=["V","W","X","Y","Z"];

    for (var i=0; i<sets.length; i++) {
	sets[i].name = names[i];
    }

    // Now we have five random subsets of a through h to play with.
    // The sets are in sets[0] through sets[sets.length-1]

    // Make questions by choosing 
    // (1) Choose:
    //    set1  random from 0 to sets.length-1
    //    op  from union, intersection, set-difference
    //    set2  random from 0 to sets.length-1
    // (2) Generate the correct answer.
    // (3) Generate the other possibilities.  If they are different
    //       from correct answer, and not yet enough choices,
    //       add to the array.
    // (4) Generate numChoices - 1 wrong answers by looping
    //     while (not enough answers) {
    //        Let R be a random subset of U
    //        if R is the correct answer, continue
    //        if R is not already in the array,
    //           add it to the array
    //     }
    // (5) Fill in the data structure as needed.
    //    What we want to end up with is an array of size "count", where
    // each element contains an object of type
    //   new MultipleChoiceQuestion(questionText,
    //                              correctAnswerText,
    //                              arrayOfIncorrectAnswerTexts);
    //  The size of the arrayOfIncorrectAnswerTexts should be equal to
    //  numChoices - 1 (numChoices was passed in as a parameter.)

    var fakeWrongAnswers = [];

    for (var i=1; i<numChoices; i++) { // we want numChoices-1 items
	fakeWrongAnswers.push("This is fake wrong answer number " + i);
    }

    arr = [];
    for (var i=1; i<=count; i++) {
	arr.push(new MultipleChoiceQuestion
		   ("This is fake question number " + i,
		    "This is a fake right answer",
		    fakeWrongAnswers));
    }
    return arr;
}


