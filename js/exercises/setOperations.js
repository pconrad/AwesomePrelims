function generateSetOperationsQuestions(count, numChoices) {
    // TODO: Make sure numChoices is at least 2.
    // TODO: Right now there are only 30 possible questions! (although a lot more possible answers)
    // This could be fixed by regenerating two random subsets from the universe for each problem, rather than for the whole set of problems


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
        sets[i].sort();
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


    var arr = [];

    while(arr.length < count) {
        var twoSets = randFromArray(sets,2);
        var set1 = twoSets[0];
        var set2 = twoSets[1];
        var op = _.random(0,2);

        var result = null;
        var wrongAnswers = [];

        var questionText = "Let " + set1.name + " be " + set1 + ". Let " + set2.name + " be " + set2 + ". What is the result of the operation " + set1.name +" ";

        switch(op){
            case 0:
                result = set1.union(set2);
                questionText=questionText + "&cup;";
                break;
            case 1:
                result = set1.intersect(set2);
                questionText=questionText + "&cap;";
                break;
            case 2:
                result = set1.relativeComplement(set2);
                questionText=questionText + "&#8726;";
                break;
        }
        questionText = questionText + " " + set2.name + ".";
        result.sort();

        var wrongAnswers = [];
        var diffFromUniverse = universe.relativeComplement(result);
        if ( result.cardinality() > 0 && diffFromUniverse.cardinality() > 0 ){
            var tempSet = result.clone();
            tempSet.removeElementAtIndex(_.random(tempSet.cardinality()-1));
            tempSet.addElement(diffFromUniverse.elementAt(_.random(diffFromUniverse.cardinality()-1)));
            if(!tempSet.isSameSetAs(result)){
                wrongAnswers.push(tempSet);
            }
        }

        /*
         *  Make some predetermined distractors, and see if we can add them
         */
        var tempDistractors = [set1.union(set2),set1.intersect(set2),set1.relativeComplement(set2),set2.relativeComplement(set1),set1.symmetricDifference(set2)];
        tempDistractors.sort(function () { return 0.5 - Math.random();});
        for ( var i = 0; i < tempDistractors.length && wrongAnswers.length < numChoices - 2 ; i++){
            var found = false;
            var tempSet = universe.getRandomSubset();
            for ( var i = 0; i < wrongAnswers.length; i++){
                if ( wrongAnswers[i].isSameSetAs(tempSet) ){
                    found = true;
                    break;
                }
            }
            if (!found && !result.isSameSetAs(tempSet)){
                wrongAnswers.push(tempSet);
            }
        }

        /*
         *  Fill in the rest of the wrongAnswers with random sets.
         */
        while ( wrongAnswers.length < numChoices - 1 ){
            var found = false;
            var tempSet = universe.getRandomSubset();
            for ( var i = 0; i < wrongAnswers.length; i++){
                if ( wrongAnswers[i].isSameSetAs(tempSet) ){
                    found = true;
                    break;
                }
            }
            if (!found && !result.isSameSetAs(tempSet)){
                wrongAnswers.push(tempSet);
            }
        }
        arr.push(new MultipleChoiceQuestion
            (questionText,
            result.toString(),
            _.map(wrongAnswers,function(set){ set.sort(); return set.toString() ;})));

    }
    return arr;
}


