
test( "sets", 67, function() {

	equal( (new Set(["x","y","z"])).laTeXformat(), "\\{x,y,z\\}",
		'Set(["x","y","z"]).laTeXformatAsSet()' );


	equal( (new Set(["x","y"])).isSameSetAs(new Set(["y","x"])), true,
		'Set(["x","y"]).isSameSetAs(["y","x"])' );

	equal( (new Set(["x","y"])).isSameSetAs(new Set(["y"])), false,
		'Set(["x","y"]).isSameSetAs(["y"])' );

	equal( (new Set(["y"])).isSameSetAs(new Set(["x","y"])), false,
		'Set(["y"]).isSameSetAs(["x","y"])' );

	equal( (new Tuple(["x","y"])).isSameTupleAs(new Tuple(["x","y"])), true,
		'Tuple(["x","y"]).isSameTupleAs(Tuple(["x","y"])' );

	equal( (new Tuple(["x","y"])).isSameTupleAs(new Tuple(["y"])), false,
		'Tuple(["x","y"]).isSameTupleAs(Tuple(["y"])' );

	equal( (new Tuple(["x","y"])).isSameTupleAs(new Tuple(["y","x"])), false,
		'Tuple(["x","y"]).isSameTupleAs(Tuple(["y","x"])' );

	equal( (new Set(["x","y"])).isSubsetEqOf(new Set(["y"])), false,
		'Set(["x","y"]).isSubsetEq(Set(["y"]))' );

	equal( (new Set(["x"])).isSubsetEqOf(new Set(["x","y"])), true,
		'Set(["x"]).isSubsetEqOf(Set(["x","y"]))' );

	equal( (new Set([])).isSubsetEqOf(new Set(["x","y"])), true,
		'Set([]).isSubsetEqOf(Set(["x","y"]))' );

	equal( (new Set(["x"])).isSubsetEqOf(new Set([])), false,
		'Set(["x"]).isSubsetEqOf(Set([]))' );

	equal( (new Set(["x"])).isSubsetOf(new Set(["x"])), false,
		'Set(["x"]).isSubsetOf(Set(["x"]))' );

	equal( (new Set(["x"])).isSubsetOf(new Set(["x","y"])), true,
		'Set(["x"]).isSubsetOf(Set(["x","y"]))' );

	equal( (new Set(["y"])).hasElement("y"), true,
		'Set(["y"].hasElement("y")' );

	equal( (new Set(["x","y"])).hasElement("x"), true,
		'Set(["x","y"].hasElement("x")' );

	equal( (new Set(["x","y"])).hasElement("y"), true,
		'Set(["x","y"].hasElement("y")' );

	equal( (new Set(["x","y"])).hasElement("z"), false,
		'Set(["x","y"].hasElement("z")' );

	equal( (new Set(["x","y"])).hasElement(new Set([])), false,
		'Set(["x","y"].hasElement(Set([]))' );

	equal( (new Set([new Set([]),"y"])).hasElement(new Set([])), true,
		'Set([Set([]),"y"].hasElement(Set([]))' );

	equal( isEquivalentTo(new Set([]),new Set([])), true,
		'isEquivalentTo(Set([]),Set([]))' );

	equal( isEquivalentTo(new Set(["abc","a"]), new Set(["abc","a"])), true,
		'isEquivalentTo(Set(["abc","a"]),Set(["abc","a"]))' );

	equal( isEquivalentTo(new Set(["abc","a"]), new Set(["a","abc"])), true,
		'isEquivalentTo(Set(["abc","a"]),Set(["a","abc"]))' );

	equal( isEquivalentTo(new Set([]),new Tuple([])), false,
		'isEquivalentTo(Set([]),Tuple([]))' );

	equal( isEquivalentTo(new Tuple([]),new Tuple([])), true,
		'isEquivalentTo(Tuple([]),Tuple([]))' );

	equal( isEquivalentTo(new Tuple(["abc","a"]), new Tuple(["abc","a"])), true,
		'isEquivalentTo(Tuple(["abc","a"]),Tuple(["abc","a"]))' );

	equal( isEquivalentTo(new Tuple(["abc","a"]), new Tuple(["a","abc"])), false,
		'isEquivalentTo(Tuple(["abc","a"]),Tuple(["a","abc"]))' );

	equal( isEquivalentTo("x",new Set([])), false,
		'isEquivalentTo("x",Set([]))' );

	equal( isEquivalentTo("x","x"), true,
		'isEquivalentTo("x","x")' );

	equal( isEquivalentTo("x","xy"), false,
		'isEquivalentTo("x","xy")' );

	equal( isEquivalentTo("x","z"), false,
		'isEquivalentTo("x","z")' );

	equal( isEquivalentTo("y",new Set(["x","y"])), false,
		'isEquivalentTo("y",Set(["x","y"]))' );

	equal( isEquivalentTo("y",9), false,
		'isEquivalentTo("y",9)' );

	equal( isEquivalentTo(9.5,9.5), true,
		'isEquivalentTo(9.5,9.5)' );

	equal( isEquivalentTo(9,true), false,
		'isEquivalentTo(9,true)' );

	equal( isEquivalentTo(false,true), false,
		'isEquivalentTo(false,true)' );

	equal( isEquivalentTo(false,false), true,
		'isEquivalentTo(false,false)' );


	// Start test cases directly related to parseSetString
	equal( isProperClosingBrace("{","}"), true,
		'isProperClosingBrance("{","}")');

	equal( isProperClosingBrace("(",")"), true,
		'isProperClosingBrance("(",")")');

	equal( isProperClosingBrace("[","]"), false,
		'isProperClosingBrance("[","]")');

	equal( isProperClosingBrace("{",")"), false,
		'isProperClosingBrance("{",")")');

	equal( isProperClosingBrace("(","}"), false,
		'isProperClosingBrance("(","}")');

	equal( isProperClosingBrace("}","{"), false,
		'isProperClosingBrance("}","{")');

	equal( parseSetOrTupleToken("abc",0)[0],"abc",
		'parseSetOrTupleToken("abc",0)[0]');

	equal( parseSetOrTupleToken("abc",0)[1],3,
		'parseSetOrTupleToken("abc",0)[1]');

	equal( parseSetOrTupleToken("1234.5",0)[0],1234.5,
		'parseSetOrTupleToken("1234.5",0)[0]');

	equal( parseSetOrTupleToken("1234.5",0)[1],6,
		'parseSetOrTupleToken("1234.5",0)[1]');

	equal( isEquivalentTo(parseSetString("{}"),new Set([])), true,
		'isEquivalentTo(parseSetString("{}"),Set([]))');

	equal( isEquivalentTo(parseSetString("()"),new Tuple([])), true,
		'isEquivalentTo(parseSetString("()"),makeTuple([])');

	equal( isEquivalentTo(parseSetString(" {} "),new Set([])), true,
		'isEquivalentTo(parseSetString(" {} "),Set([]))');

	equal( isEquivalentTo(parseSetString(" {  }   "),new Set([])), true,
		'isEquivalentTo(parseSetString(" {  }   "),Set([]))');

	equal( isEquivalentTo(parseSetString("{{}}"),new Set([new Set([])])), true,
		'isEquivalentTo(parseSetString("{{}}"),Set([Set([])]))');

	equal( isEquivalentTo(parseSetString("{()}"),new Set([new Tuple([])])), true,
		'isEquivalentTo(parseSetString("{{}}"),Set([Tuple([])])');

	equal( isEquivalentTo(parseSetString("{{}}"),new Set([])), false,
		'isEquivalentTo(parseSetString("{{}}"),Set([]))');

	equal( isEquivalentTo(parseSetString("{abc}"),new Set(["abc"])), true,
		'isEquivalentTo(parseSetString("{abc}"),Set(["abc"]))');

	equal( isEquivalentTo(parseSetString("(abc)"),new Tuple(["abc"])),true,
		'isEquivalentTo(parseSetString("(abc)"),Tuple(["abc"])');

	equal( isEquivalentTo(parseSetString("{abc,     a }"),new Set(["abc","a"])), true,
		'isEquivalentTo(parseSetString("{abc,      a }"),Set(["abc","a"]))');

	equal( isEquivalentTo(parseSetString("{abc,     a }"),new Set(["a","abc"])), true,
		'isEquivalentTo(parseSetString("{abc,      a }"),Set(["a","abc"]))');

	equal( isEquivalentTo(parseSetString("{abc,{abc}}"),new Set(["abc",new Set(["abc"])])), true,
		'isEquivalentTo(parseSetString("{abc,{abc}}"),Set(["abc,Set(["abc"])]))');

	equal( isEquivalentTo(parseSetString("(a,b)"),new Tuple(["a","b"])), true,
		'isEquivalentTo(parseSetString("(a,b)"),Tuple(["a","b"]))');

	equal( isEquivalentTo(parseSetString("  (   { abc,9.5   ,(def,1)}, 2.5)"),
					new Tuple([ new Set([new Tuple(["def",1]),"abc",9.5]),2.5])), true,
		'isEquivalentTo(parseSetString("  (   { abc,9.5   ,(def,1)}, 2.5)"),Tuple([Set[Tuple(["def",1]),"abc",9.5]),2.5]))');

	equal( parseSetString("[]"),null,
		'parseSetString("[]")');

	equal( parseSetString("{a,[c]}"),null,
		'parseSetString("{a,[c]}")');

	equal( parseSetString("{a},bc}"),null,
		'parseSetString("{a},bc}")');

	equal( parseSetString("{a),bc}"),null,
		'parseSetString("{a),bc}")');

	equal( parseSetString("{a,(bc}"),null,
		'parseSetString("{a,(bc}")');

	equal( parseSetString("{a},bc,{}"),null,
		'parseSetString("{a},bc,{}")');

	equal( parseSetString(""),null,
		'parseSetString("")');


});

