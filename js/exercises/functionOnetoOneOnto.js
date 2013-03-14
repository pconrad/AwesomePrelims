function generateFunctionOnetoOneOntoQuestions(count, setName1, setName2, floatSVGRight){
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


    // TODO: Need to figure out a way to make this robust across
    // HTML and LaTeX representations---i.e. to call a function
    // that returns various symbols---or a function that can map from
    // a set of symbols in HTML to LaTeX or vice versa.  For now,
    // HTML is hard-coded, since that works for both plain HTML and
    // MoodleXML versions.

    var subsetSymbol="&sube;";
    var crossProductSymbol="&times;"
    var questionEnd = "Which of the following statements about R is true?";
    var innerSvg;
    for(var i = 0; i < arr.length; i++){
        temp = arr[i];


        innerSvg = temp.toSvg(); //This variable may look useless (i.e. why not
        //just call temp.toSvg() below in place of innerSvg?) However, toSvg()
        //is what sets temp.svgWidth and temp.svgHeight, so it MUST be called
        //before those are used.
	//  TODO: ACK! See comment above! Fix that!   Side effects are evil.

	// window.alert("temp.baseSetLabel=" + temp.baseSetLabel+ " "
	//	     +"temp.secondSetLabel" + temp.secondSetLabel);

	// window.alert(innerSvg);

	var questionBase = "Let the relation R"
	    + subsetSymbol 
	    + "(" + temp.baseSetLabel + crossProductSymbol + temp.secondSetLabel 
	    + ") be the relation represented by this graph:";


        arr[i] = 
	       new MultipleChoiceQuestion
	    ( (questionBase
	       + '<br>' 

	       + (floatSVGRight ? 
		  "<div style='float:right; width=" + (temp.svgWidth+5) + "'>"
		  : "")
	       + '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="'
	       + temp.svgWidth + '" height="' + temp.svgHeight + '">'
	       + innerSvg + "</svg>"
	       + (floatSVGRight ? "</div>" : "")
	       + "<br>" + questionEnd),
	      getCorrectStatement(temp,temp.baseSetLabel,temp.secondSetLabel),
	      getIncorrectStatements(temp,temp.baseSetLabel,temp.secondSetLabel) );
    }
    return arr;
}

function getCorrectStatement(relation,setLabel1,setLabel2){
    if(!relation.isFunction()){
        return getStatement(false,false,false,setLabel1,setLabel2);
    }
    //else:
    return getStatement(true,relation.isOneToOne(),relation.isOnto(),
			setLabel1,setLabel2);
}

function getStatement(funct,onetoone,onto,setLabel1,setLabel2){
    var result =  "R is ";
    var mapsToSymbol = "&rarr;"; // TODO: make robust for LaTeX version
    var AtoB = setLabel1 + mapsToSymbol + setLabel2;
    if(funct){
        result += "a function " + AtoB + ", is";
        result += ((onetoone)?"":" not")+" one-to-one, and is";
        result += ((onto)?"":" not")+" onto.";
    }
    else {
        result += "not a function " + AtoB + ". (Thus, it can't be one-to-one or onto).";
    }
    return result;
}

function getIncorrectStatements(relation,setLabel1,setLabel2){
    var result =  [
		   getStatement(false, false, false, setLabel1, setLabel2),
		   getStatement(true, false, false, setLabel1, setLabel2),
		   getStatement(true, false, true, setLabel1, setLabel2),
		   getStatement(true, true, false, setLabel1, setLabel2),
		   getStatement(true, true, true, setLabel1, setLabel2)];
    result.splice(result.indexOf(getCorrectStatement(relation, setLabel1, setLabel2)),1);
    return result;
}

