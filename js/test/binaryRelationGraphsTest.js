
test( "binaryRelationGraphs", 35, function() {

	var xyz = new Set(["x","y","z"], false, "A");
	var abcd = new Set(["a","b","c","d"], false, "B");
	var emptySet = new Set([]);

	var R = new BinaryRelation(xyz,emptySet);
	var R2 = new BinaryRelation(xyz,emptySet, abcd);
	
	//The following tests are for binary relations over a (single) set

	equal( R.baseSet.isSameSetAs(xyz), true,
	       'R.baseSet.isSameSetAs(xyz)' );
	
	equal( R.isLegalPair(new Tuple(['x','y'])), true,
	       "R.isLegalPair(new Tuple(['x','y']))") ;
    
	equal( R.isLegalPair(new Tuple(['a','b'])), false,
	       "R.isLegalPair(new Tuple(['a','b'])), false" );

	equal( R.isLegalPair(new Tuple(['a','x'])), false,
		"R.isLegalPair(new Tuple(['a','x'])), false" );

	equal( R.isLegalPair(new Tuple(['z','b'])), false,
		"R.isLegalPair(new Tuple(['z','b'])), false" );

	equal( R.isLegalPair(new Tuple(['z'])), false,
	    "R.isLegalPair(new Tuple(['z'])), false" );

	equal( R.isLegalPair(new Set(['x','y'])), false,
	       "R.isLegalPair(new Set(['x','y'])), false" );
	
	throws( function () {
		new BinaryRelation(xyz,new Set([ new Tuple(['a','b']) ]))
		    },
	    "new BinaryRelation(xyz,new Set([ new Tuple(['a','b']) ])) throws error");
	
	throws( function () {
		new BinaryRelation(xyz,new Set([ new Tuple(['x','y']), new Tuple(['a','b']) ]))
		    },
	    "new BinaryRelation(xyz,new Set([ new Tuple(['x','y']), new Tuple(['a','b']) ])) throws error");

	//TODO: Write some tests of the isReflexive(), isSymmetric(), and isTransitive() methods.
	//Do this by hand, and then write tests that make sure makeRandomRelation works (i.e. generates sets
	//with the correct properties)


	//The following tests are for binary relations between two (different) sets

	equal( R2.secondSet.isSameSetAs(abcd), true,
		'R2.baseSet.isSameSetAs(abcd)' );

	equal( R2.secondSet.isSameSetAs(new Set(["b","c","a","d"])), true,
		'R2.baseSet.isSameSetAs(new Set(["b","c","a","d"]))' );

	equal( R2.isLegalPair(new Tuple(["x","a"])), true,
		'R2.isLegalPair(new Tuple(["x","a"]))' );

	equal( R2.isLegalPair(new Tuple(["a","x"])), false,
		'R2.isLegalPair(new Tuple(["x","a"])), false' );

	throws( function () {
		new BinaryRelation(xyz,new Set([ new Tuple(['x','a']), new Tuple(['z','y']) ]), abcd)
		    },
	    "new BinaryRelation(xyz,new Set([ new Tuple(['x','a']), new Tuple(['z','d']) ]), abcd) throws error");

	//Function tests
	var everythingToA = new Set([new Tuple(['x','a']), new Tuple(['y','a']), new Tuple(['z','a'])]);
	var missingPair = new Set([new Tuple(['x','a']), new Tuple(['y','a'])]);
	var notARelation = new Set([new Tuple(['x','a']), new Tuple(['y','a']), new Tuple(['z','e'])]);
	var isAFunc = new Set([new Tuple(['x','a']), new Tuple(['y','b']), new Tuple(['z','d'])]);
	var notAFunc = new Set([new Tuple(['x','a']), new Tuple(['y','b']), new Tuple(['z','d']), new Tuple(['x','c'])]);
	var R3 = new BinaryRelation(xyz, everythingToA, abcd);
	var R4 = new BinaryRelation(xyz, missingPair, abcd);
	var R5 = new BinaryRelation(xyz, isAFunc, abcd);
	var R6 = new BinaryRelation(xyz, notAFunc, abcd);
	var identityFunc = new Set([new Tuple(['x','x']), new Tuple(['y','y']), new Tuple(['z','z'])]);
	var R7 = new BinaryRelation(xyz, identityFunc, xyz);

	equal( R3.isFunction(), true,
		"R3.isFunction()");

	equal( R4.isFunction(), false,
		"R4.isFunction(), false");

	equal( R5.isFunction(), true,
		"R5.isFunction()");

	equal( R6.isFunction(), false,
		"R6.isFunction(), false");

	equal( R7.isFunction(), true,
		"R7.isFunction()");

	throws( function () {
		new BinaryRelation(xyz, notARelation, abcd);
		    },
	    "new BinaryRelation(xyz, notARelation, abcd) throws error");

	//One-to-one and Onto tests

	//NOT one-to-one NOR onto: {('x','a'), ('y','a'), ('z','a')}
	equal( R3.isOneToOne(), false,
		"R3.isOneToOne(), false");

	equal( R3.isOnto(), false,
		"R3.isOnto(), false");

	equal( R3.isBijective(), false,
		"R3.isBijective(), false");

	//one-to-one but NOT onto: {('x','d'), ('y','b'), ('z','a')}
	var oneToOneNotOnto = new Set([new Tuple(['x','d']), new Tuple(['y','b']), new Tuple(['z','a'])]);
	var R8 = new BinaryRelation(xyz, oneToOneNotOnto, abcd);

	equal( R8.isOneToOne(), true,
		"R8.isOneToOne()");

	equal( R8.isOnto(), false,
		"R8.isOnto(), false");

	equal( R8.isBijective(), false,
		"R8.isBijective(), false");

	//NOT one-to-one but onto: {('a','z'), ('b','x'), ('c','y'), ('d','y')}
	var ontoNotOneToOne = new Set([new Tuple(['a','z']), new Tuple(['b','x']), new Tuple(['c','y']), new Tuple(['d','y'])]);
	var R9 = new BinaryRelation(abcd, ontoNotOneToOne, xyz);

	equal( R9.isOneToOne(), false,
		"R9.isOneToOne(), false");

	equal( R9.isOnto(), true,
		"R9.isOnto()");

	equal( R9.isBijective(), false,
		"R9.isBijective(), false");

	//one-to-one and onto (bijective): {('x','x'),('y','y'),('z','z')}
	equal( R7.isOneToOne(), true,
		"R7.isOneToOne()");

	equal( R7.isOnto(), true,
		"R7.isOnto()");	

	equal( R7.isBijective(), true,
		"R7.isBijective()");

	var anotherBijection = new Set([new Tuple(['x','z']), new Tuple(['y','x']), new Tuple(['z','y'])]);
	var R10 = new BinaryRelation(xyz, anotherBijection, xyz);

	equal( R10.isOneToOne(), true,
		"R10.isOneToOne()");

	equal( R10.isOnto(), true,
		"R10.isOnto()");	

	equal( R10.isBijective(), true,
		"R10.isBijective()");

	//TODO: add some tests for functions where the binary relation is over
	//a single set (rather than between two sets), make sure one-to-one,
	//onto, bijective still work, etc.
	//for this the relation will look like:
	//var R11 = new BinaryRelation(xyz,pairSet);
	//with no third parameter (no secondSet)

    });

