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
	throw "illegal argument: BinaryRelation constructor takes a Set";
    }

    this.baseSet = baseSet;
    this.pairSet = new Set([]);

    this.addElement = function(pair){
	if (! pair instanceof Tuple || pair.size() != 2) {
	    throw "illegal argument: BinaryRelation.addElement only takes pairs (tuples of size 2)";
	}
	
	
	/** Check that both members of pair are contained in the base set */
	
        if( (!this.baseSet.contains(pair.elementAt[0])) ||
	    (!this.baseSet.contains(pair.elementAt[1]))  ) {
	    throw "Illegal Argument: elements of pair to add must be elements of baseSet";
	}
	    
	this.pairSet.addElement(pair);

    };

    this.clone = function(){
        return new BinaryRelation(this.baseSet, this.pairSet);
    };

};
