/**
   binaryRelationGraphs.js 
   Generate SVG visualizations of Binary Relations

   P. Conrad, UCSB CS Dept., as part of "Project Awesome".

   Initial Verison: 2013-02-18

 */


/**

   Note: this function/class should probably be moved into
   awesomeSets.js, since it is an abstraction of a Binary Relation
   on a single set.

 */

function BinaryRelation(baseSet, pairSet){

    // baseSet must be an instance of Set, otherwise there is a problem
    if (! baseSet instanceof Set) {
	throw "illegal argument: BinaryRelation constructor takes two Set arguments";
    }

    if (! pairSet instanceof Set) {
	throw "illegal argument: BinaryRelation constructor takes two Set Arguments";
    }

    this.baseSet = baseSet.clone();
    this.pairSet = pairSet.clone();

    var cartesianProduct =  this.pairSet.cartesianProduct(this.pairSet);

    if (! this.pairSet.isSubsetEqOf(cartesianProduct)) {
        throw "Illegal Argument: pairSet must be subset of baseSet cross baseSet";
    }

    this.isLegalPair = function(pair) {
	return ( pair instanceof Tuple &&
		 pair.size() == 2 &&
		 this.baseSet.contains(pair.elementAt(0)) &&
		 this.baseSet.contains(pair.elementAt(1)));
    }
 

    this.addElement = function(pair){
	if (! this.isLegalPair(pair)) {
	    throw "illegal argument in BinaryRelation.addElement()";
	}
		    
	this.pairSet.addElement(pair);
    };

    this.clone = function(){
        return new BinaryRelation(this.baseSet, this.pairSet);
    };

};
