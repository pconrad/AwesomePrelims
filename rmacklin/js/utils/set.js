/**

  awesomeSets.js 

  Original author, Johan Henkens and Phill Conrad
  UCSB CS Dept. for Project Awesome

  Original Version: Fall 2012

*/

function Node(centerX, centerY, label, radius, borderColor, fillColor, borderWidth, labelColor) {
    var DEFAULT_LABEL = "", DEFAULT_RADIUS = 20, DEFAULT_BORDER_COLOR = "black", 
        DEFAULT_FILL_COLOR = "white", DEFAULT_BORDER_WIDTH = 2;

    this.centerX = centerX;
    this.centerY = centerY;
    this.label = label || DEFAULT_LABEL;
    this.radius = radius || DEFAULT_RADIUS;
    this.borderColor = borderColor || DEFAULT_BORDER_COLOR;
    this.fillColor = fillColor || DEFAULT_FILL_COLOR;
    this.borderWidth = borderWidth || DEFAULT_BORDER_WIDTH;
    this.labelColor = labelColor || DEFAULT_BORDER_COLOR;

    this.toSvg = function() {
        var str = "<circle cx='" + this.centerX + "' cy='" + this.centerY +
            "' r='" + this.radius + "' stroke='" + this.borderColor + 
            "' stroke-width='" + this.borderWidth + "' fill='" +
            this.fillColor + "' />";
        if (this.label.length > 0) {
            str += "\n<text x='" + (this.centerX-this.radius/5) + "' y='" + 
                (this.centerY+this.radius/5) + "' fill='" + this.labelColor +
                "'>" + this.label + "</text>";
        }
        return str;
    }
}

function isEquivalentTo(x,y) {
    if(x==null || y==null){
        return false;
    } else if (typeof(x) != typeof(y))
        return false;
    switch (typeof(x)) {
        case "string":
        case "number":
        case "boolean":
            return x==y;
        case "object":
            if (x instanceof Set && y instanceof Set)  {
                return x.isSameSetAs(y);
            } else if (x instanceof Tuple && y instanceof Tuple){
                return x.isSameTupleAs(y);
            } else{
                return false;
            }
        default:
            throw "Unknown type in isEquivalentTo";
    }
};

//If count is passed, returns an array of length count whose elements are
//randomly chosen from arr. If arr does not have any duplicate elements, the
//returned array will not have duplicates either.
//If count is not passed, it returns a random element from arr
function randFromArray(arr, count) {
    if (count == null){
        return arr[_.rand(arr.length)];
    } else{
        return _.map(arr.slice(0,count),function(){
                return arr.splice(_.random(0,arr.length-1),1)[0];
                });
    }
};

//Creates a random array with size between minElems and maxElems (inclusive)
//Elements are selected from sourceSet if passed, or a default set.
function randArrayOfElements(maxElems,minElems,sourceSet) {
    var source = sourceSet || [
        ["t","u","v","w","x","y","z"],
        ["a","b","c","d","e","f"],
        [1,2,3,4,5,6,7]][_.random(2)];
    minElems = minElems || 1;
    maxElems = maxElems || _.random(minElems,5);
    maxElems = Math.min(source.length,maxElems);
    minElems = Math.min(maxElems,minElems);

    //Set the source array from which elements will be selected.
    //If the sourceSet parameter is passed, that will be used; otherwise, it
    //will use one of the default arrays.
    return randFromArray(source,_.random(minElems,maxElems));
};

function Set(array, throwDupError, name) {
    //Initialize temp to the passed array or a random array
    var temp = array || randArrayOfElements();
    //The 'elements' member of a Set object is the array that holds the
    //members of the set. It will not have duplicate elements.
    this.elements = [];

    //This is a member function of the Set class
    this.cardinality = function() {
        return this.elements.length;
    };

    this.elementAt = function(index) {
        return this.elements[index];
    };

    this.indexOfElement = function(element) {
        for (var i=0; i<this.cardinality(); i++) {
            if (isEquivalentTo(element,this.elements[i])){
                return i;
            }
        }
        return -1;
    };

    this.hasElement = function(element) {
        return this.indexOfElement(element)!=-1;
    };

    this.addElement = function(element) {
        if(element!=null){
            if(!this.hasElement(element)){
                this.elements.push(element);
            }
        }
    };

    for(var i=0; i<temp.length; i++) {
        this.addElement(temp[i]);
    }

    if(throwDupError && this.elements.length < temp.length) {
        //This throws an error if the parser was trying to create a Set object
        //but it had duplicate elements, since that is technically not a valid
        //set. If we decide not to throw an error for this, it's a simple fix.
        throw "You entered in a multi-set, not a set"
    }

    //TODO: A might be a terrible default
    this.name = name || "A";

    //TODO: Make this scalable again
    this.toSvg = function() {
        str = "<rect x='3' y='10' width='55' height='" + (this.elements.length*60+20*2) + "' fill='white' stroke-width='2' stroke='black' />"
            str += "\n<text x='24' y='25' fill='black'>" + this.name + "</text>"
            _.each(this.elements, function(element, i) { str += "\n" + (new Node(30,20+60*(i+1), element.toString())).toSvg(); });
        return str;
    }

    // Performs a deep clone. Thus, it recursively searches for Tuples or Sets and calls clone on them.
    this.clone = function() {
        var dupe = [];
        for(var i = 0; i < this.cardinality();i++){
            if(typeof(this.elements[i]) == "object"){
                if(this.elements[i] instanceof Set || this.elements[i] instanceof Tuple){
                    dupe.push(this.elements[i].clone());
                } else{
                    throw "Found non Set or Tuple object in Set while cloning";
                }
            } else{
                dupe.push(this.elements[i]);
            }
        }
        return new Set(dupe);
    };

    this.shuffle = function() {
        this.elements.sort(function() { return 0.5 - Math.random();});
    };

    this.laTeXformat = function() {
        return this.format().replace(/{/g,"\\{").replace(/}/g,"\\}");
    };

    //Concatenate all the elements together into a string representing the set
    this.format = function() {
        var output = "{";
        for(var i = 0; i < this.cardinality(); i++){
            if(typeof(this.elements[i]) == "object"){
                if(this.elements[i] instanceof Set || this.elements[i] instanceof Tuple) {
                    output+=this.elements[i].format();
                }
                else{
                    //We don't support any other object types in our sets/tuples atm
                    return null;
                }
            }else{
                output+=this.elements[i];
            }
            if(i!=this.elements.length-1){
                output+=",";
            }
        }
        output += "}";
        return output;
    };
    this.toString = this.laTeXformat;

    //A.cartesianProduct(B) = A x B
    this.cartesianProduct = function(otherSet) {
        if(typeof(otherSet) != "object" || !(otherSet instanceof Set)){
            throw "otherSet is not of Set type";
        }
        var answer = [];
        for (var i=0; i<this.cardinality(); i++) {
            for (var j=0; j<otherSet.cardinality(); j++) {
                var tuple = new Tuple([this.elements[i],otherSet.elements[j]]);
                answer.push(tuple);
            }
        }
        return new Set(answer);
    };

    //Returns true if otherSet is a subset or equal to this set.
    this.hasSubset = function(otherSet) {
        if(!(otherSet instanceof Set)){
            return false;
        }

        for (var i=0; i<otherSet.elements.length; i++) {
            if (!this.hasElement(otherSet.elements[i]) ){
                return false;
            }
        }
        return true;
    };


    //Returns true if this set contains the subset otherset.
    //Equivalent to otherset \subset this in laTeX
    this.hasProperSubset = function(otherSet) {
        return this.hasSubset(otherSet) && !otherSet.hasSubset(this);
    };

    this.isSameSetAs = function(otherSet) {
        return this.hasSubset(otherSet) && otherSet.hasSubset(this);
    };

    this.removeElementAtIndex = function(index) {
        if(index>=0 && index < this.cardinality()){
            return this.elements.splice(index,1);
        }
        throw "Index out of bounds";
    };

    this.removeElement = function(element) {
        return this.removeElementAtIndex(this.indexOfElement(element));
    };

    this.getRandomSubset = function(maxSize) {
        maxSize = maxSize || _.random(0,this.cardinality()-1);
        return new Set(randFromArray(this.elements,maxSize));
    };

    // Returns a new set containing the elements in this but not in otherSet
    this.relativeComplement = function(otherSet){
        if(typeof(otherSet) != "object" || !(otherSet instanceof Set)){
            throw "otherSet is not of Set type";
        }
        var result = [];
        for( var i = 0; i < this.cardinality(); i++){
            if(! otherSet.hasElement(this.elementAt(i))){
                result.push(this.elementAt(i));
            }
        }
        return new Set(result);
    };

};

function Tuple(array) {
    this.elements = array || randArrayOfElements();

    this.cardinality = function(){
        return this.elements.length;
    };

    this.elementAt = function(index) {
        return this.elements[index];
    };

    this.indexOfElement = function(element) {
        for (var i=0; i<this.cardinality(); i++) {
            if (isEquivalentTo(element,array[i])){
                return i;
            }
        }
        return -1;
    };

    this.hasElement = function(element) {
        return this.indexOfElement(element)!=-1;
    };

    this.addElement = function(element) {
        if(element!=null){
            this.elements.push(element);
        }
    };

    this.laTeXformat = function() {
        return this.format().replace("{","\\{").replace("}","\\}");
    };

    // Performs a deep clone. Thus, it recursively searches for Tuples or Sets and calls clone on them.
    this.clone = function() {
        var dupe = [];
        for(var i = 0; i < this.cardinality();i++){
            if(typeof(this.elements[i]) == "object"){
                if(this.elements[i] instanceof Set || this.elements[i] instanceof Tuple){
                    dupe.push(this.elements[i].clone());
                } else{
                    throw "Found non Set or Tuple object in Set while cloning";
                }
            } else{
                dupe.push(this.elements[i]);
            }
        }
        return new Tuple(dupe);
    };

    this.format =function() {
        var output = "(";
        for(var i = 0; i < this.cardinality(); i++){
            if(typeof(this.elements[i]) == "object"){
                if(this.elements[i] instanceof Set || this.elements[i] instanceof Tuple) {
                    output+=this.elements[i].format();
                }
                else{
                    return null;
                }
            }else{
                output+=this.elements[i];
            }
            if(i!=this.elements.length-1){
                output+=",";
            }
        }
        output += ")";
        return output;
    };
    this.toString = this.laTeXformat;

    //They are only the same tuple if they are both Tuples, the otherTuple has the same cardinality, 
    //and each tuple contains the same elements in the same order
    this.isSameTupleAs = function(otherTuple) {
        if((typeof(otherTuple) != "object") || !(otherTuple instanceof Tuple) || this.cardinality()!=otherTuple.cardinality()){
            return false;
        }
        for(var i = 0; i<this.cardinality();i++){
            if(!isEquivalentTo(this.elements[i],otherTuple.elements[i])){
                return false;
            }
        }
        return true;
    };

    this.removeElementAtIndex = function(index) {
        if(index>=0 && index < this.cardinality()){
            this.elements.splice(index,1);
            return true;
        }
        return false;
    };

    //Note: Since tuples can contain duplicate elements, this will always
    //remove the first match
    this.removeElement = function(element) {
        return this.removeElementAtIndex(this.indexOfElement(element));
    };

};

function BinaryRelation(baseSet, pairSet, baseSetLabel){
    // baseSet must be an instance of Set, otherwise there is a problem
    if (typeof(baseSet) != "object" || ! baseSet instanceof Set) {
        throw "illegal argument: BinaryRelation constructor takes two Set arguments";
    }

    if (typeof(baseSet) != "object" || ! pairSet instanceof Set) {
        throw "illegal argument: BinaryRelation constructor takes two Set Arguments";
    }

    this.baseSet = baseSet.clone();
    this.pairSet = pairSet.clone();

    this.cartesianProduct =  this.baseSet.cartesianProduct(this.baseSet);

    if (! this.cartesianProduct.hasSubset(pairSet)) {
        throw "Illegal Argument: pairSet must be subset of baseSet cross baseSet";
    }

    this.isLegalPair = function(pair) {
        return ( pair instanceof Tuple &&
                pair.cardinality() == 2 &&
                this.cartesianProduct.hasElement(pair));
    };

    for( var i = 0; i < pairSet.cardinality(); i++){
        if(!this.isLegalPair(this.pairSet.elementAt(i))){
            throw "BinaryRelation constructed with illegal pair at index " + i;
        }
    }

    this.hasPair = function(pair){
        return this.pairSet.hasElement(pair);
    };

    this.addElement = function(pair){
        if (! this.isLegalPair(pair)) {
            throw "illegal argument in BinaryRelation.addElement()";
        }

        this.pairSet.addElement(pair);
    };

    this.clone = function(){
        return new BinaryRelation(this.baseSet, this.pairSet);
    };

    this.isReflexive = function(){
        for( var i = 0; i<this.baseSet.cardinality(); i++){
            if( ! (this.pairSet.hasElement(new Tuple([this.baseSet.elementAt(i),this.baseSet.elementAt(i)])))){
                return false;
            }
        }
        return true;
    };

    this.isSymmetric = function(){
        for( var i = 0; i<this.pairSet.cardinality();i++){
            var current = this.pairSet.elementAt(i);
            if( ! (this.pairSet.hasElement(new Tuple([current.elementAt(1),current.elementAt(0)])))){
                return false;
            }
        }
        return true;
    };

    this.isTransitive = function(){
        // Start two loops through the list and set locals for ease...
        for( var i = 0; i<this.pairSet.cardinality();i++){
            var elem1 = this.pairSet.elementAt(i);
            for( var o = 0; o < this.pairSet.cardinality(); o++){
                var elem2 = this.pairSet.elementAt(o);
                // If the second starts from the end of the first pair, 
                if( isEquivalentTo(elem1.elementAt(1),elem2.elementAt(0) )){
                    //Check to make sure that the pairset contains the transitive pair
                    if( ! (this.pairSet.hasElement(new Tuple([elem1.elementAt(0),elem2.elementAt(1)])))){
                        return false;
                    }
                }
            }
        }
        return true;
    };

    this.toString = function(ignoreLabel){
        var comp = this.cartesianProduct.relativeComplement(this.pairSet);
        if(!baseSetLabel || ignoreLabel ||
            this.pairSet.cardinality() <= comp.cardinality()){
            return this.pairSet.toString();
        } else{
            return baseSetLabel + "x" + baseSetLabel+" - " + comp.toString();
        }
    };

    this.addReflextiveClosure = function(){
        for( var i = 0; i<this.baseSet.cardinality(); i++){
            var elem = this.baseSet.elementAt(i);
            this.addElement(new Tuple([elem,elem]));
        }
    };

    this.addSymmetricClosure = function(){
        for( var i = 0; i<this.pairSet.cardinality(); i++){
            var elem = this.pairSet.elementAt(i);
            this.addElement(new Tuple([elem.elementAt(1),elem.elementAt(0)]));
        }
    };

    this.addTransitiveClosure = function(){
        while(!this.isTransitive()){
            // Start two loops through the list and set locals for ease...
            for( var i = 0; i<this.pairSet.cardinality();i++){
                var elem1 = this.pairSet.elementAt(i);
                for( var o = 0; o < this.pairSet.cardinality(); o++){
                    var elem2 = this.pairSet.elementAt(o);
                    // If the second starts from the end of the first pair, 
                    if( isEquivalentTo(elem1.elementAt(1),elem2.elementAt(0) )){
                        //Check to make sure that the pairset contains the transitive pair
                        this.addElement(new Tuple([elem1.elementAt(0),elem2.elementAt(1)]));
                    }
                }
            }
        }
    };
    this.isSameTupleAs = function(otherTuple) {
        if(!(otherTuple instanceof Tuple) || this.cardinality()!=otherTuple.cardinality()){
            return false;
        }
        for(var i = 0; i<this.cardinality();i++){
            if(!isEquivalentTo(this.elements[i],otherTuple.elements[i])){
                return false;
            }
        }
        return true;
    };

    this.isSameRelationAs = function(otherRelation){
        if((typeof(otherRelation)!="object") || !(otherTuple instanceof BinaryRelation)){
            return false;
        }
        return this.baseSet.isSameSetAs(otherRelation.baseSet) && this.pairSet.isSameSetAs(otherRelation.pairSet);
    };

    this.getCorrectDescription = function(){

    }
};

//Makes a binary relation from the sourceSet, optionally with a properties Bitmask
//For the bitmask, add the following values together for the corresponding requirements
//Reflexive: 1
//Symmetric: 2
//Transitive: 4
//Not-Reflexive: 8
//Not-Symmetric: 16
//Not-Transitive: 32
//Note that 1 & 8, 2 & 16, and 4 & 32 are not allowed together, as they are exclusive.
function makeRandomRelation(sourceSet, sourceLabel, mask){
    var result = null;
    var cartesianProduct = sourceSet.cartesianProduct(sourceSet);
    if( (mask & 9) == 9 ||
        (mask & 18) == 18 ||
        (mask & 36) == 36){
        throw "Invalid mask combination!";
    }
    while(!result || 
        ((mask & 1) && !(result.isReflexive())) ||
        ((mask & 2) && !(result.isSymmetric())) ||
        ((mask & 4) && !(result.isTransitive()))||
        ((mask & 8) && (result.isReflexive()))  ||
        ((mask & 16) && (result.isSymmetric())) ||
        ((mask & 32) && (result.isTransitive()))
        ){
        result = new BinaryRelation(sourceSet,cartesianProduct.getRandomSubset(),sourceLabel);
    }
    return result;
}
