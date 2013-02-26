
test( "binaryRelationGraphs", 9, function() {

	var xyz = new Set(["x","y","z"]);
	var emptySet = new Set([]);

	var R = new BinaryRelation(xyz,emptySet);
	
	equal( R.baseSet.isSameSetAs(xyz), true,
	       'R.baseSet.isSameSetAs(xyz)' );
	
	equal( R.isLegalPair(new Tuple(['x','y'])), true,
	       "R.isLegalPair(new Tuple(['x','y']))") ;
    
	equal( R.isLegalPair(new Tuple(['a','b'])), false,
	       "R.isLegalPair(new Tuple(['a','b']))" );

	equal( R.isLegalPair(new Tuple(['a','x'])), false,
		"R.isLegalPair(new Tuple(['a','x']))" );

	equal( R.isLegalPair(new Tuple(['z','b'])), false,
		"R.isLegalPair(new Tuple(['z','b']))" );

	equal( R.isLegalPair(new Tuple(['z'])), false,
	    "R.isLegalPair(new Tuple(['z']))" );

	equal( R.isLegalPair(new Set(['x','y'])), false,
	       "R.isLegalPair(new Set(['x','y']))" );
	
	throws( function () {
		new BinaryRelation(xyz,new Set([ new Tuple(['a','b']) ]))
		    },
	    "new BinaryRelation(xyz,new Set([ new Tuple(['a','b']) ]);)");
	
	throws( function () {
		new BinaryRelation(xyz,new Set([ new Tuple(['x','y']), new Tuple(['a','b']) ]))
		    },
	    "new BinaryRelation(xyz,new Set([ new Tuple(['x','y']), new Tuple(['a','b']) ]);)");
	

    });

