function generateFunctionOnetoOneOntoQuestions(count, setName1, setName2){
    var arr = [];
    var setLabel1 = setName1 || "A";
    var setLabel2 = setName2 || "B";
    //TODO: add logic above to name setLabel2 as "A" if setName1 was "B" and setName2 wasn't provided
    var abcdSet = new Set(["a","b","c","d"], false, setLabel2);
    var xyzSet = new Set(["x","y","z"], false, setLabel1);
    //var domainSet = new Set(["a"], false, setLabel1);
    //var codomainSet = new Set(["w","x"], false, setLabel2);
    var temp = null;
    //masks we want:
    //8  (not a function)
    //49 (function, not one-to-one, not onto)
    //21 (function, not one-to-one, onto)
    //35 (function, one-to-one, not onto)
    //7  (function, one-to-one, onto)
    var masksWeWant = [8,49,21,35,7];
    var randomMask, domainLabel, codomainLabel;
    while(arr.length < count){
        randomMask = randFromArray(masksWeWant);
        switch(randomMask){
        case 8:  // (not a function)
            var oneThirdProb = _.random(2);
            if(oneThirdProb == 0) {
                domainLabel = abcdSet.name;
                codomainLabel = xyzSet.name;
                temp = makeRandomRelation2Sets(abcdSet, xyzSet, randomMask);
            }
            else {
                if(oneThirdProb == 1) {
                    domainLabel = xyzSet.name;
                    codomainLabel = abcdSet.name;
                    temp = makeRandomRelation2Sets(xyzSet, abcdSet, randomMask);
                }
                else {
                    domainLabel = xyzSet.name;
                    codomainLabel = xyzSet.name;
                    temp = makeRandomRelation2Sets(xyzSet, xyzSet, randomMask);
                }
            }
            break;
        case 49: // (function, not one-to-one, not onto)
            domainLabel = xyzSet.name;
            codomainLabel = abcdSet.name;
            temp = makeRandomRelation2Sets(xyzSet, abcdSet, randomMask);
            break;
        case 21: // (function, not one-to-one, onto)
            domainLabel = abcdSet.name;
            codomainLabel = xyzSet.name;
            temp = makeRandomRelation2Sets(abcdSet, xyzSet, randomMask);
            break;
        case 35: // (function, one-to-one, not onto)
            domainLabel = xyzSet.name;
            codomainLabel = abcdSet.name;
            temp = makeRandomRelation2Sets(xyzSet, abcdSet, randomMask);
            break;
        case 7:  // (function, one-to-one, onto)
            var oneHalfProb = _.random(1);
            if(oneHalfProb == 0) {
                domainLabel = xyzSet.name;
                codomainLabel = xyzSet.name;
                temp = makeRandomRelation2Sets(xyzSet, xyzSet, randomMask);
            }
            else {
                var abcSet = new Set(["a","b","c"], false, setLabel2);
                domainLabel = xyzSet.name;
                codomainLabel = abcSet.name;
                temp = makeRandomRelation2Sets(xyzSet, abcSet, randomMask);
            }
            break;
        default:
            throw "Somehow we got a number from randFromArray that wasn't in the array!!";
        }
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
    var questionBase = "Let the relation R be the relation represented by this graph:";
    var questionEnd = "Which of the following statements about R is true?";
    var innerSvg;
    for(var i = 0; i < arr.length; i++){
        temp = arr[i];
        innerSvg = temp.toSvg(); //This variable may look useless (i.e. why not
        //just call temp.toSvg() below in place of innerSvg?) However, toSvg()
        //is what sets temp.svgWidth and temp.svgHeight, so it MUST be called
        //before those are used.
        arr[i] = 
	       new MultipleChoiceQuestion( (questionBase
				+ '<br><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="'
                + temp.svgWidth + '" height="' + temp.svgHeight + '">'
                + innerSvg + "</svg><br>" + questionEnd),
				getCorrectStatement(temp),
				getIncorrectStatements(temp) );
    }
    return arr;
}

function getCorrectStatement(relation){
    if(!relation.isFunction()){
        return getStatement(false);
    }
    //else:
    return getStatement(true,relation.isOneToOne(),relation.isOnto());
}

function getStatement(funct,onetoone,onto){
    var result =  "R is ";
    if(funct){
        result += "a function, is";
        result += ((onetoone)?"":" not")+" one-to-one, and is";
        result += ((onto)?"":" not")+" onto.";
    }
    else {
        result += "not a function. (Thus, it can't be one-to-one or onto).";
    }
    return result;
}

function getIncorrectStatements(relation){
    var result =  [
        getStatement(false),
        getStatement(true, false, false),
        getStatement(true, false, true),
        getStatement(true, true, false),
        getStatement(true, true, true)];
    result.splice(result.indexOf(getCorrectStatement(relation)),1);
    return result;
}

