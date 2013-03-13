function generateReflexiveSymmetricTransitiveQuestions(count, setName){
    var arr = [];
    var setLabel = setName || "A";
    var sourceSet = new Set(["a","b","c"], false, setLabel);
    var temp = null;
    while(arr.length < count){
        temp = makeRandomRelation(sourceSet);
        for(var i = 0; i<arr.length;i++){
            if(arr[i].isSameRelationAs(temp)){
                temp = null;
                break;
            }
        }
        if(temp){
            arr.push(temp);
        }
    }
    var questionBase = "Let " + sourceSet.name + " be "+sourceSet.format()+". ";
    var questionEnd = ". Which of the following statements about R is true?";
    for(var i = 0; i < arr.length; i++){
        temp = arr[i];
        arr[i] =
        new MultipleChoiceQuestion( (questionBase
                     + "Let the relation R be "
                     + temp.toString() + questionEnd),
                    getCorrectStatement(temp),
                    getIncorrectStatements(temp));
    }
    return arr;
}

function getCorrectStatement(reflection){
    return getStatement(reflection.isReflexive(),reflection.isSymmetric(),reflection.isTransitive());
}

function getStatement(reflexive,symmetric,transitive){
    var result =  "R is";
    result = result + ((reflexive)?"":" not")+" reflexive, is";
    result = result + ((symmetric)?"":" not")+" symmetric, and is";
    result = result + ((transitive)?"":" not")+" transitive.";
    return result;
}

function getIncorrectStatements(reflection){
    var result =  [
        getStatement(false, false, false),
        getStatement(false, false, true),
        getStatement(false, true, false),
        getStatement(false, true, true),
        getStatement(true, false, false),
        getStatement(true, false, true),
        getStatement(true, true, false),
        getStatement(true, true, true)];
    result.splice(result.indexOf(getCorrectStatement(reflection)),1);
    return result;
}

