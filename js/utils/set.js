/*

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
/** Function to determine if two items are the same.
 *  Checks equality of strings, numberse, booleans, Awesome.Set, Awesome.Tuple, and Awesome.BianryRelation
 *  @param {object} x The first of the two values
 *  @param {object} y The second of the two values
 *  @returns {boolean} A boolean representing the outcome
 *  @throws Throws if there is an unexpected type found (non string/number/boolean/object)
 */
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
            } else if (x instanceof BinaryRelation && y instanceof BinaryRelation){
                return x.isSameRelationAs(y);
            } else{
                return false;
            }
        default:
            throw "Unknown type in isEquivalentTo";
    }
};

/** Method to select either a random element or a new array with a random number of elements from an array.
 *  If count is not present, a single random element will be returned.
 *  If count is present, the result array will be of size count. The random array will not use an element
 *  from the same source index more than once. Thus, if the source array has no duplicates, the random
 *  array will not have duplicates as well.
 *  @param {array} arr The array of elements to be selected from
 *  @param {int} [count] The number of elements in the result array
 *  @returns {object|array} A single random element, or a new array consisting of random elements
 *  @throws Throws if count is not within bounds of the array
 */
function randFromArray(arr, count) {
    if(count < 0 || count > arr.length){
        throw "count is out of bounds in randFromArray"
    }
    arr = arr.slice(0);
    if (count == null){
        return arr[_.random(arr.length)];
    } else{
        return _.map(arr.slice(0,count),function(){
                return arr.splice(_.random(0,arr.length-1),1)[0];
                });
    }
};

/** Method to generate a random array of elements from one of three built in,
 *  primitive sets (letters 't' through 'z', 'a' through 'f', or numbers 1
 *  throught 7), or the sourceSet, if present. Randomly selects the size from
 *  between maxElems and minElems, incusively.
 *  @param {int} [maxElems=5] The maximum number of elements in the result array
 *  @param {int} [minElems=1] The minimum number of elements in the result array
 *  @param {array} [sourceArray] The source array, or one of the primitives described above.
 *  @returns {array} An array of elements
 */
function randArrayOfElements(maxElems,minElems,sourceArray) {
    var source = sourceArray || [
        ["t","u","v","w","x","y","z"],
        ["a","b","c","d","e","f"],
        [1,2,3,4,5,6,7]][_.random(2)];
    minElems = minElems || 1;
    maxElems = maxElems || 5;
    maxElems = Math.min(source.length,maxElems);
    minElems = Math.min(maxElems,minElems);
    return randFromArray(source,_.random(minElems,maxElems));
};

/** Represents a set of elements.
 *  The constructor takes a source array, but if it is not passed, it will generate a random source array using
 *  {@linkcode randArrayOfElements}. Sets contain no duplicate elements.
 *  @constructor
 *  @param {array} [array] The source array of elements to be used
 *  @param {boolean} [throwDupError] Whether or not the constructor should throw an error if duplicate items are found
 *  @param {name} [string] The name of this set, to be used when generating an SVG, and sometimes when printing the Set.
 */
function Set(array, throwDupError, name) {
    //Initialize temp to the passed array or a random array
    var temp = array || randArrayOfElements();

    //The 'elements' member of a Set object is the array that holds the
    //members of the set. It will not have duplicate elements.
    this.elements = [];

    /** Determines the cardinality (size) of the set object.
     *  @returns {int} The cardinality
     */
    this.cardinality = function() {
        return this.elements.length;
    };

    /** Returns the element of the set at the given index. Sets are zero-indexed.
     *  @param {int} index The index of the element desired
     *  @returns {object} The element at that index
     *  @throws Throws if the index is out of range
     */
    this.elementAt = function(index) {
        if(index>=this.cardinality()){
            throw "index out of bounds during Set.elementAt";
        }
        return this.elements[index];
    };

    /** Searches the set for the given element and returns its index, or -1 if not found.
     *  @param {object} element The element to be searched for
     *  @returns {int} The index of the element, or -1
     */
    this.indexOfElement = function(element) {
        for (var i=0; i<this.cardinality(); i++) {
            if (isEquivalentTo(element,this.elements[i])){
                return i;
            }
        }
        return -1;
    };

    /** Searches the set for the given element, and returns whether or not the element was found
     *  @param {object} element The element to be searched for
     *  @returns {boolean} Whether or not the element was found
     */
    this.hasElement = function(element) {
        return this.indexOfElement(element)!=-1;
    };

    /** Adds the element to the set, ignoring all null elements, and automatically deduping.
     *  @param {object} element The element to be added to the set.
     *  @throws Throws if passed a non-primitive object which is not a Set or Tuple
     */
    this.addElement = function(element) {
        if(element!=null){
            if((typeof(element) == "object") && !(element instanceof Set || element instanceof Tuple)){
                throw "Invalid object passed to Set.addElement";
            }
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
    /** Performs a deep clone on the Set, recursively calling clone on any {@linkcode Set}
     *  or {@linkcode Tuple} objects found within.
     *  @returns {Set} A new Set object
     *  @throws Throws if it finds an object which is not a {@linkcode Set} or {@linkcode Tuple}
     */
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

    /** Shuffles the elements within this set into a new order. This only affects the
     *  string representation of the set and the indexes used and returned by elementAt
     *  and indexOfElement, respectively.
     */
    this.shuffle = function() {
        this.elements.sort(function() { return 0.5 - Math.random();});
    };

    /** Generates a string representation of the set, using braces which are escaped with a \\
     *  in order to be used in Khan Academy exercises laTeX fields.
     *  @returns {string} The escaped string representation of the set
     */
    this.laTeXformat = function() {
        return this.format().replace(/{/g,"\\{").replace(/}/g,"\\}");
    };

    /** Generates a string representation of the set.
     *  @returns {string} The string representation of the set
     */
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

    /** Same as {@linkcode Set#format}
     *
     */
    this.toString = this.laTeXformat;

    /** Performs the cartesian product of this set with another set (e.g., A.cartesianProduct(B) = A x B).
     *  The return is a Set of {@linkcode Tuple} objects of cardinality this.cardinality() * otherset.cardinality().
     *  @param {Set} otherSet The second set to be used in the cartesian product
     *  @returns {Set} A set of Tuples, representing the cartesian product
     */
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

    /** Checks to see if otherSet is a subset of this Set.
     *  @param {Set} otherSet The Set to be checked for subset eligibility
     *  @return {boolean} Whether or not otherSet is a subset of this.
     */
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

    /** Checks to see if otherSet is a proper subset of this Set. Identical to
     *  this.hasSubset(otherSet) && !otherSet.hasSubset(this).
     *  @param {Set} otherSet The Set to be checked for proper subset eligibility
     *  @return {boolean} Whether or not otherSet is a proper subset of this.
     */
    this.hasProperSubset = function(otherSet) {
        return this.hasSubset(otherSet) && !otherSet.hasSubset(this);
    };

    /** Checks to see if the two sets are equal
     *  @param {Set} otherSet The Set to be compared against
     *  @return {boolean} Whether or not the given Set is equal to this.
     */
    this.isSameSetAs = function(otherSet) {
        return this.hasSubset(otherSet) && otherSet.hasSubset(this);
    };

    /** Removes and returns the element at the given index from this Set.
     *  @param {int} index The index to be removed
     *  @returns {object} The object removed from the Set.
     *  @throws Throws if the index is out of bounds.
     */
    this.removeElementAtIndex = function(index) {
        if(index>=0 && index < this.cardinality()){
            return this.elements.splice(index,1);
        }
        throw "Index out of bounds during Set.removeElementAtIndex";
    };

    /** Searches for, removes, and returns the given element from this Set.
     *  @param {object} element The element to be removed
     *  @returns {object} The element removed, or false if the element is not found in the Set.
     */
    this.removeElement = function(element) {
        try {
            return this.removeElementAtIndex(this.indexOfElement(element));
        } catch(err) {
            return false;
        }
    };

    /** Generates and returns random subset, performing a deep clone on each
     *  Set or Tuple within the new subset. If no parameters, cardinality of
     *  subset will be random. If one parameter, cardinality of subset will
     *  be of that parameter. If two parameters are given, cardinality of the
     *  subset will be between the two given parameters, inclusively. The
     *  subset is not a proper subset.
     *  @param {int} [maxSize] The specific, or maximum size of this subset
     *  @param {int} [minSize] The minimum size of this subset
     *  @returns {Set} A subset of this Set
     *  @throws Throws if maxSize or minSize are out of bounds for this Set.
     */
    this.getRandomSubset = function(maxSize,minSize) {
        minSize = minSize || 0;
        maxSize = maxSize || this.cardinality();
        if(maxSize > this.cardinality() || minSize < 0 || minSize > maxSize){
            throw "size out of bounds for Set.getRandomSubset";
        }
        maxSize = _.random(minSize,maxSize);
        var tempset = new Set(randFromArray(this.elements,maxSize));
        for(var i = 0; i < tempset.cardinality(); i++){
            if(typeof(tempset.elements[i]) == "object" &&
                    (tempset.elements[i] instanceof Set || tempset.elements[i] instanceof Tuple)){
                tempset.elements[i] = tempset.elements[i].clone();
            }
        }
        return tempset;
    };
    /** Same as {@linkcode Set#getRandomSubset} except that this method returns a
     *  proper subset.
     *  @param {int} [maxSize] The specific, or maximum size of this subset
     *  @param {int} [minSize] The minimum size of this subset
     *  @returns {Set} A proper subset of this Set
     *  @throws Throws if maxSize or minSize are out of bounds for this Set.
     */
    this.getRandomProperSubset = function(maxSize,minSize){
        minSize = minSize || 0;
        maxSize = maxSize || this.cardinality()-1;
        if(maxSize >= this.cardinality() || minSize < 0 || minSize > maxSize){
            throw "size out of bounds for Set.getRandomProperSubset";
        }
        return this.getRandomSubset(maxSize,minSize);
    }

    /** Generates a new Set containing the relative complement between this Set
     *  and the parameter. A relative complement contains all elements in this Set
     *  but not contained in the parameter.
     *  @param {Set} otherSet The other Set to be used in the relative complement
     *  @returns {Set} A new Set containing the relative complement
     *  @throws Throws if otherSet is not a Set
     */
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

/** Represents a Tuple or an ordered list of elements.
 *  The constructor takes a source array, but if it is not passed, it will generate a random source array using
 *  {@linkcode randArrayOfElements}.
 *  @constructor
 *  @param {array} [array] The source array of elements to be used
 */
function Tuple(array) {
    this.elements = array || randArrayOfElements();

    /** Determines the cardinality (size) of the Tuple object.
     *  @returns {int} The cardinality
     */
    this.cardinality = function(){
        return this.elements.length;
    };

    /** Returns the element of the Tuple at the given index. Tuples are zero-indexed.
     *  @param {int} index The index of the element desired
     *  @returns {object} The element at that index
     *  @throws Throws if the index is out of range
     */
    this.elementAt = function(index) {
        return this.elements[index];
    };

    /** Searches the Tuple for the given element and returns its index, or -1 if not found.
     *  @param {object} element The element to be searched for
     *  @param {int} [after] The index to start searching at
     *  @returns {int} The index of the element, or -1
     */
    this.indexOfElement = function(element, after) {
        for (var i= (after || 0); i<this.cardinality(); i++) {
            if (isEquivalentTo(element,array[i])){
                return i;
            }
        }
        return -1;
    };

    /** Searches the Tuple for the given element, and returns whether or not the element was found
     *  @param {object} element The element to be searched for
     *  @returns {boolean} Whether or not the element was found
     */
    this.hasElement = function(element) {
        return this.indexOfElement(element)!=-1;
    };

    /** Adds the element to the Tuple, ignoring all null elements, and automatically deduping.
     *  @param {object} element The element to be added to the Tuple.
     *  @throws Throws if passed a non-primitive object which is not a Set or Tuple
     */
    this.addElement = function(element) {
        if(element!=null){
            this.elements.push(element);
        }
    };

    /** Performs a deep clone on the {@linkcode Tuple}, recursively calling clone on any {@linkcode Set}
     *  or {@linkcode Tuple} objects found within.
     *  @returns {Tuple} A new Tuple object
     *  @throws Throws if it finds an object which is not a {@linkcode Set} or {@linkcode Tuple}
     */
    this.clone = function() {
        var dupe = [];
        for(var i = 0; i < this.cardinality();i++){
            if(typeof(this.elements[i]) == "object"){
                if(this.elements[i] instanceof Set || this.elements[i] instanceof Tuple){
                    dupe.push(this.elements[i].clone());
                } else{
                    throw "Found non Set or Tuple object in Tuple while cloning";
                }
            } else{
                dupe.push(this.elements[i]);
            }
        }
        return new Tuple(dupe);
    };

    /** Generates a string representation of the Tuple, using braces which are escaped with a \\
     *  in order to be used in Khan Academy exercises laTeX fields.
     *  @returns {string} The escaped string representation of the Tuple
     */
    this.laTeXformat = function() {
        return this.format().replace("{","\\{").replace("}","\\}");
    };

    /** Generates a string representation of the Tuple.
     *  @returns {string} The string representation of the Tuple
     */
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

    /** Same as {@linkcode Tuple#format}
     *  @method
     *  @see Tuple#format
     *  @returns {string} The string representation of the Tuple
     */
    this.toString = this.laTeXformat;

    /** Checks to see if the two Tuples are equal
     *  @param {Tuple} otherTuple The Tuple to be compared against
     *  @return {boolean} Whether or not the given Tuple is equal to this.
     */
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

    /** Removes and returns the element at the given index from this tuple.
     *  @param {int} index The index to be removed
     *  @returns {object} The object removed from the Tuple.
     *  @throws Throws if the index is out of bounds.
     */
    this.removeElementAtIndex = function(index) {
        if(index>=0 && index < this.cardinality()){
            return this.elements.splice(index,1);
        }
        throw "Index out of bounds during Tuple.removeElementAtIndex";
    };

    /** Searches for, removes, and returns the first match for the given element from this Tuple.
     *  @param {object} element The element to be removed
     *  @returns {object} The element removed, or false if the element is not found in the Tuple.
     */
    this.removeElement = function(element) {
        try {
            return this.removeElementAtIndex(this.indexOfElement(element));
        } catch(err) {
            return false;
        }
    };

};

function BinaryRelation(baseSet, pairSet, secondSet){
    // baseSet must be an instance of Set, otherwise there is a problem
    if (typeof(baseSet) != "object" || ! baseSet instanceof Set) {
        throw "illegal argument: BinaryRelation constructor takes at least two Set arguments";
    }

    // pairSet must be an instance of Set, otherwise there is a problem
    if (typeof(pairSet) != "object" || ! pairSet instanceof Set) {
        throw "illegal argument: BinaryRelation constructor takes at least two Set Arguments";
    }

    if(secondSet) {
        // secondSet must be an instance of Set, otherwise there is a problem
        if (typeof(secondSet) != "object" || ! secondSet instanceof Set) {
            throw "illegal argument: secondSet must be a Set object";
        }
    }

    this.baseSet = baseSet.clone();
    this.pairSet = pairSet.clone();

    if (!secondSet) {
        this.cartesianProduct =  this.baseSet.cartesianProduct(this.baseSet);

        if (! this.cartesianProduct.hasSubset(pairSet)) {
            throw "Illegal Argument: pairSet must be subset of baseSet cross baseSet";
        }
    }
    else
    {
        this.secondSet = secondSet.clone();
        this.cartesianProduct =  this.baseSet.cartesianProduct(this.secondSet);

        if (! this.cartesianProduct.hasSubset(pairSet)) {
            throw "Illegal Argument: pairSet must be subset of baseSet cross secondSet";
        }
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
        if(this.secondSet) {
            return false;
        }
        for( var i = 0; i<this.baseSet.cardinality(); i++){
            if( ! (this.pairSet.hasElement(new Tuple([this.baseSet.elementAt(i),this.baseSet.elementAt(i)])))){
                return false;
            }
        }
        return true;
    };

    this.isSymmetric = function(){
        if(this.secondSet) {
            return false;
        }
        for( var i = 0; i<this.pairSet.cardinality();i++){
            var current = this.pairSet.elementAt(i);
            if( ! (this.pairSet.hasElement(new Tuple([current.elementAt(1),current.elementAt(0)])))){
                return false;
            }
        }
        return true;
    };

    this.isTransitive = function(){
        if(this.secondSet) {
            return false;
        }
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

    this.isFunction = function(){
        //Check that each input is related to exactly one output.
        //i.e. check that each element in baseSet (the domain) is the first
        //element of exactly one tuple of pairSet (the relation), and that the
        //second element of every tuple of pairSet is an element of secondSet
        //(the codomain)
        var domain = this.baseSet.clone();
        for(var i = 0; i<this.pairSet.cardinality(); i++){
            var currentPair = this.pairSet.elementAt(i);
            //Attempt to remove the first element of currentPair from domain.
            //If this is a function, it must be in domain. Additionally, it
            //should only be the first element of one pair, so if it was 
            //already removed from domain, we know this is not a function.
            if(!domain.removeElement(currentPair.elementAt(0))) {
                return false;
            }
            //We also have to make sure that the second element of currentPair 
            //is an element of secondSet. However, this was already verified by
            //checking that pairSet is a subset of baseSet cross secondSet.
            //The second element of these pairs can appear multiple times, so
            //we don't call removeElement as above. (e.g. for the function
            //f(x) = 1, 1 would be the second element of every pair)            
        }
        //Now make sure that all elements from domain were the first element of
        //one of the pairs in pairSet. To do this, simply make sure all of the
        //elements of domain have been removed.
        if(domain.cardinality() > 0) {
            return false;
        }
        return true;
    };

    this.isOneToOne = function(){
        //only functions can be one-to-one
        if(!this.isFunction()) {
            return false;
        }
        //If f(a) = f(b) then a = b. Checking this just means checking for
        //uniqueness in the second element of all the pairs in pairSet. So the
        //code is almost identical to checking whether or not the relation is a
        //function
        var codomain = this.secondSet.clone();
        for(var i = 0; i<this.pairSet.cardinality(); i++){
            var currentPair = this.pairSet.elementAt(i);
            //Attempt to remove the second element of currentPair from domain.
            //If this is a one-to-one, it should only be the second element of
            //one pair, so if it was already removed from codomain, we know
            //this is not one-to-one
            if(!codomain.removeElement(currentPair.elementAt(1))) {
                return false;
            }
        }
        return true;
    }

    this.isInjective = this.isOneToOne;

    this.isOnto = function(){
        //only functions can be onto
        if(!this.isFunction()) {
            return false;
        }
        //A function is onto if every element in the codomain is the image of
        //some element in the domain. That is, the range should be equal to the
        //codomain
        var range = new Set([]);
        for(var i = 0; i<this.pairSet.cardinality(); i++){
            var currentPair = this.pairSet.elementAt(i);
            range.addElement(currentPair.elementAt(1));
        }
        if(range.isSameSetAs(this.secondSet)){
            return true;
        }
        return false;
    }

    this.isSurjective = this.isOnto;

    this.isBijective = function(){
        //The domain and codomain must have the same cardinality for it to be
        //possible that this is a bijection. (Though that is NOT a sufficient
        //condition! Just a necessary one)
        if(this.baseSet.cardinality() != this.secondSet.cardinality()){
            return false;
        }
        //The following alone is sufficient, but the above is an optimization
        //to return false faster in the event that the cardinalities don't match
        return this.isOneToOne() && this.isOnto();
    }

    this.toString = function(ignoreLabel){
        var comp = this.cartesianProduct.relativeComplement(this.pairSet);
        if(ignoreLabel ||
            this.pairSet.cardinality() <= comp.cardinality()){
            return this.pairSet.toString();
        } else{
            return this.baseSet.name + "x" + (this.secondSet ? this.secondSet.name : this.baseSet.name) + " - " + comp.toString();
        }
    };

    this.addReflextiveClosure = function(){
        if(this.secondSet) {
            return;
        }
        for( var i = 0; i<this.baseSet.cardinality(); i++){
            var elem = this.baseSet.elementAt(i);
            this.addElement(new Tuple([elem,elem]));
        }
    };

    this.addSymmetricClosure = function(){
        if(this.secondSet) {
            return;
        }
        for( var i = 0; i<this.pairSet.cardinality(); i++){
            var elem = this.pairSet.elementAt(i);
            this.addElement(new Tuple([elem.elementAt(1),elem.elementAt(0)]));
        }
    };

    this.addTransitiveClosure = function(){
        if(this.secondSet) {
            return;
        }
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

    this.isSameRelationAs = function(otherRelation){
        if((typeof(otherRelation)!="object") || !(otherRelation instanceof BinaryRelation)){
            return false;
        }
        if(!secondSet) {
            return this.baseSet.isSameSetAs(otherRelation.baseSet) && this.pairSet.isSameSetAs(otherRelation.pairSet);
        }
        else {
            if(!otherSet.secondSet) {
                return false;
            }
            return this.baseSet.isSameSetAs(otherRelation.baseSet) && this.secondSet.isSameSetAs(otherRelation.secondSet) && this.pairSet.isSameSetAs(otherRelation.pairSet);
        }
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
function makeRandomRelation(sourceSet, mask){
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
        result = new BinaryRelation(sourceSet,cartesianProduct.getRandomSubset());
    }
    return result;
}
