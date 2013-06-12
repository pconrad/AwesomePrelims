test( "bitsTest", 76, function() {	
	
	//Constructor Testing:
	var longBits1 = new LongBitString(0x12345678,0x12345678);
	var longBits2 = new LongBitString(0xFFFFFFFF,0xFFFFFFFF);
	
	equal(longBits1.highBits,0x12345678,'testing highbits constructor with value 0x12345678' );
	equal(longBits1.highBits,0x12345678,'testing lowbits constructor with value 0x12345678' );
	
	equal(longBits2.highBits,0xFFFFFFFF,'testing highbits constructor with value 0xFFFFFFFF' );
	equal(longBits2.highBits,0xFFFFFFFF,'testing lowbits constructor with value 0xFFFFFFFF' );
	
	//longSplitBits Testing:
	equal(longSplitBits("FFFFFFFFFFFFFFFF").isEqual(new LongBitString(0xFFFFFFFF,0xFFFFFFFF)), true ,'Testing split of 0xFFFFFFFFFFFFFFFF: high bits: 0xFFFFFFFF low bits: 0xFFFFFFFF' ); 
	equal(longSplitBits("FFFFFFF000FFFFFF").isEqual(new LongBitString(0xFFFFFFF0,0x00FFFFFF)), true ,'Testing split of 0xFFFFFFF000FFFFFF: high bits: 0xFFFFFFF0 low bits: 0x00FFFFFFF' );
	equal(longSplitBits("FFFFFFFF").isEqual(new LongBitString(0x0,0xFFFFFFFF)), true ,'Testing split of 0xFFFFFFFF: high bits: 0x0 low bits: 0xFFFFFFFFF' );
	equal(longSplitBits("F").isEqual(new LongBitString(0x0,0xF)), true ,'Testing split of 0xF: high bits: 0x0 low bits: 0xF' );
	equal(longSplitBits("0123456789ABCDEF").isEqual(new LongBitString(0x01234567,0x89ABCDEF)), true ,'Testing split of 0x0123456789ABCDEF: high bits: 0x01234567 low bits: 0x89ABCDEF' );
	
	//splitBits Testing:
	equal(splitBits(0x5DEECE66D).isEqual(new LongBitString(0x5,0xDEECE66D)), true ,'Testing split of 0x0005DEECE66D: high bits: 0x0005 low bits: 0xDEECE66D' );
	equal(splitBits(0x123456789ABC).isEqual(new LongBitString(0x1234,0x56789ABC)), true ,'Testing split of 0x123456789ABC: high bits: 0x1234 low bits: 0x56789ABC');
	equal(splitBits(0x0).isEqual(new LongBitString(0x0,0x0)), true ,'Testing split of 0x000000000000: high bits: 0x0 low bits: 0x00000000');
	equal(splitBits(0xFFFFFFFFFFFF).isEqual(new LongBitString(0xFFFF,0xFFFFFFFF)), true ,'Testing split of 0xFFFFFFFFFFFF: high bits: 0xFFFF low bits: 0xFFFFFFFF');
	equal(splitBits(0x1FFFFFFFFFFFFF).isEqual(new LongBitString(0x1FFFFF,0xFFFFFFFF)), true ,'Testing split of 0x1FFFFFFFFFFFFF: high bits: 0x1FFFFF low bits: 0xFFFFFFFF');

	//And Testing:

	equal(splitBits(0x0F000000FF00).bitwiseAnd(splitBits(0x0FFF00000000)).isEqual(new LongBitString(0x0F00,0x00000000)),true,'0x0F000000FF00 & 0x0FFF00000000 => 0x0F00000000' );

	equal(splitBits(0xFFFF00FFFF00).bitwiseAnd(splitBits(0x0FFF00000000)).isEqual(new LongBitString(0x0FFF,0x00000000)),true,'0xFFFFFFFF & 0x0FFF0000 => 0x0FFF0000' );
	equal(splitBits(0xFFFF00FFFF00).bitwiseAnd(splitBits(0xFFFF00FFFF00)).isEqual(new LongBitString(0xFFFF,0x00FFFF00)),true,'0xFFFFFFFF & 0xFFFFFFFF => 0xFFFFFFFF' );

	
	equal(longSplitBits("0F000000FF00").bitwiseAnd(longSplitBits("0FFF00000000")).isEqual(new LongBitString(0x0F00,0x00000000)),true,'0x0F000000FF00 & 0x0FFF00000000 => 0x0F00000000' );
	equal(longSplitBits("FFFF00FFFF00").bitwiseAnd(longSplitBits("0FFF00000000")).isEqual(new LongBitString(0x0FFF,0x00000000)),true,'0xFFFFFFFF & 0x0FFF0000 => 0x0FFF0000' );
	equal(longSplitBits("FFFF00FFFF00").bitwiseAnd(longSplitBits("FFFF00FFFF00")).isEqual(new LongBitString(0xFFFF,0x00FFFF00)),true,'0xFFFFFFFF & 0xFFFFFFFF => 0xFFFFFFFF' );
	
	equal(longSplitBits("FFFFFFFFFFFFFFFF").bitwiseAnd(longSplitBits("FFFFFFFFFFFFFFFF")).isEqual(new LongBitString(0xFFFFFFFF,0xFFFFFFFF)),true,'0xFFFFFFFFFFFFFFFF & 0xFFFFFFFFFFFFFFFF => 0xFFFFFFFFFFFFFFFF' );
	equal(longSplitBits("0").bitwiseAnd(longSplitBits("FFFFFFFFFFFFFFFF")).isEqual(new LongBitString(0x0,0x0)),true,'0x0 & 0xFFFFFFFFFFFFFFFF => 0x0' );
	
	// Or Testing:
	equal(splitBits(0x0F000000FF00).bitwiseOr(splitBits(0x0FFF00000000)).isEqual(new LongBitString(0x0FFF,0x0000FF00)),true,'0x0F000000FF00 | 0x0FFF00000000 => 0x0FFF0000FF00' );
	equal(splitBits(0x0F000000FF00).bitwiseOr(splitBits(0xFFFF00FFFF00)).isEqual(new LongBitString(0xFFFF,0x00FFFF00)),true,'0x0F0000FF | 0xFFFFFFFF => 0xFFFFFFFF' );
	equal(splitBits(0x0FFF00000000).bitwiseOr(splitBits(0x0FFF00000000)).isEqual(new LongBitString(0x0FFF,0x00000000)),true,'0x0FFF0000 | 0x0FFF0000 => 0x0FFF0000' );
	
	equal(longSplitBits("0F000000FF00").bitwiseOr(longSplitBits("0FFF00000000")).isEqual(new LongBitString(0x0FFF,0x0000FF00)),true,'0x0F000000FF00 | 0x0FFF00000000 => 0x0FFF0000FF00' );
	equal(longSplitBits("0F000000FF00").bitwiseOr(longSplitBits("FFFF00FFFF00")).isEqual(new LongBitString(0xFFFF,0x00FFFF00)),true,'0x0F0000FF | 0xFFFFFFFF => 0xFFFFFFFF' );
	equal(longSplitBits("0FFF00000000").bitwiseOr(longSplitBits("0FFF00000000")).isEqual(new LongBitString(0x0FFF,0x00000000)),true,'0x0FFF0000 | 0x0FFF0000 => 0x0FFF0000' );
	
	equal(longSplitBits("FFFFFFFF00000000").bitwiseOr(longSplitBits("FFFFFFFF00000000")).isEqual(new LongBitString(0xFFFFFFFF,0x00000000)),true,'0xFFFFFFFF00000000 | 0xFFFFFFFF00000000 => 0xFFFFFFFF00000000' );
	equal(longSplitBits("0123456789ABCDEF").bitwiseOr(longSplitBits("FFFFFFFFFFFFFFFF")).isEqual(new LongBitString(0xFFFFFFFF,0xFFFFFFFF)),true,'0x0123456789ABCDEF | 0xFFFFFFFFFFFFFFFF => 0xFFFFFFFFFFFFFFFF' );
	
	// XOR Testing:
	equal(splitBits(0x0F000000FF00).bitwiseXOr(splitBits(0x0FFF00000000)).isEqual(new LongBitString(0x00FF,0x0000FF00)),true,'0x0F000000FF00 ^ 0x0FFF00000000 => 0x00FF00000FF00' );
	equal(splitBits(0x0F000000FF00).bitwiseXOr(splitBits(0xFFFF00FFFF00)).isEqual(new LongBitString(0xF0FF,0x00FF0000)),true,'0x0F000000FF00 ^ 0xFFFF00FFFF00 => 0xF0FF00FF0000' );
	
	equal(longSplitBits("0F000000FF00").bitwiseXOr(longSplitBits("0FFF00000000")).isEqual(new LongBitString(0x00FF,0x0000FF00)),true,'0x0F000000FF00 ^ 0x0FFF00000000 => 0x00FF0000FF00');
	equal(longSplitBits("0F000000FF00").bitwiseXOr(longSplitBits("FFFF00FFFF00")).isEqual(new LongBitString(0xF0FF,0x00FF0000)),true,'0x0F000000FF00 ^ 0xFFFF00FFFF00 => 0xF0FF00FF0000' );
	
	equal(longSplitBits("FFFFFFFF00000000").bitwiseXOr(longSplitBits("FFFFFFFF00000000")).isEqual(new LongBitString(0x00000000,0x00000000)),true,'0xFFFFFFFF00000000 ^ 0xFFFFFFFF00000000 => 0x0000000000000000' );
	equal(longSplitBits("000000000000000F").bitwiseXOr(longSplitBits("FFFFFFFFFFFFFFFF")).isEqual(new LongBitString(0xFFFFFFFF,0xFFFFFFF0)),true,'0x1000000000000000 ^ 0xFFFFFFFFFFFFFFFF => 0xFFFFFFFFFFFFFFF0' );


	//rightShift by 31 testing:
	equal(splitBits(0x5DEECE66D).rightShift(31).isEqual(new LongBitString(0x0,0xB)), true ,'0x5DEECE66D>>31 => 0xB' );
	equal(splitBits(0xFFFFFFFFFFFF).rightShift(31).isEqual(new LongBitString(0x0,0x1FFFF)), true ,'0xFFFFFFFFFFFF>>31 => 0x1FFFF' );
	equal(splitBits(0x123456789ABC).rightShift(31).isEqual(new LongBitString(0x0,0x2468)), true ,'0x123456789ABC>>31 => 0x2468' );
	
	equal(longSplitBits("5DEECE66D").rightShift(31).isEqual(new LongBitString(0x0,0xB)), true ,'0x5DEECE66D>>31 => 0xB' );
	equal(longSplitBits("FFFFFFFFFFFF").rightShift(31).isEqual(new LongBitString(0x0,0x1FFFF)), true ,'0xFFFFFFFFFFFF>>31 => 0x1FFFF' );
	equal(longSplitBits("123456789ABC").rightShift(31).isEqual(new LongBitString(0x0,0x2468)), true ,'0x123456789ABC>>31 => 0x2468' );
	
	equal(longSplitBits("FFFFFFFFFFFFFFFF").rightShift(31).isEqual(new LongBitString(0x1,0xFFFFFFFF)), true ,'0xFFFFFFFFFFFFFFFF>>31 => 0x1FFFFFFFF' );

	//rightShift by 16 testing:
	equal(splitBits(0x5DEECE66D).rightShift(16).isEqual(new LongBitString(0x0,0x5DEEC)), true ,'0x5DEECE66D>>>16 => 0x5DEEC' );
	equal(splitBits(0xFFFFFFFFFFFF).rightShift(16).isEqual(new LongBitString(0x0,0xFFFFFFFF)), true ,'0xFFFFFFFFFFFF>>>16 => 0xFFFFFFFF' );
	equal(splitBits(0x123456789ABC).rightShift(16).isEqual(new LongBitString(0x0,0x12345678)), true ,'0x123456789ABC>>>16 => 0x12345678' );
	
	equal(longSplitBits("5DEECE66D").rightShift(16).isEqual(new LongBitString(0x0,0x5DEEC)), true ,'0x5DEECE66D>>>16 => 0x5DEEC' );
	equal(longSplitBits("FFFFFFFFFFFF").rightShift(16).isEqual(new LongBitString(0x0,0xFFFFFFFF)), true ,'0xFFFFFFFFFFFF>>>16 => 0xFFFFFFFF' );
	equal(longSplitBits("123456789ABC").rightShift(16).isEqual(new LongBitString(0x0,0x12345678)), true ,'0x123456789ABC>>>16 => 0x12345678' );
	
	equal(longSplitBits("FFFFFFFFFFFFFFFF").rightShift(16).isEqual(new LongBitString(0xFFFF,0xFFFFFFFF)), true ,'0xFFFFFFFFFFFFFFFF>>16 => 0xFFFFFFFFFFFF' );

	//rightShift by 17 testing:
	equal(splitBits(0x5DEECE66D).rightShift(17).isEqual(new LongBitString(0x0,0x2EF76)), true ,'0x5DEECE66D>>>17 => 0x2EF76' );
	equal(splitBits(0xFFFFFFFFFFFF).rightShift(17).isEqual(new LongBitString(0x0,0x7FFFFFFF)), true ,'0xFFFFFFFFFFFF>>>17 => 0x7FFFFFFF' );
	equal(splitBits(0x123456789ABC).rightShift(17).isEqual(new LongBitString(0x0,0x91A2B3C)), true ,'0x123456789ABC>>>17 => 0x91A2B3C' );
	
	equal(longSplitBits("5DEECE66D").rightShift(17).isEqual(new LongBitString(0x0,0x2EF76)), true ,'0x5DEECE66D>>>17 => 0x2EF76' );
	equal(longSplitBits("FFFFFFFFFFFF").rightShift(17).isEqual(new LongBitString(0x0,0x7FFFFFFF)), true ,'0xFFFFFFFFFFFF>>>17 => 0x7FFFFFFF' );
	equal(longSplitBits("123456789ABC").rightShift(17).isEqual(new LongBitString(0x0,0x91A2B3C)), true ,'0x123456789ABC>>>17 => 0x91A2B3C' );
	
	equal(longSplitBits("FFFFFFFFFFFFFFFF").rightShift(17).isEqual(new LongBitString(0x7FFF,0xFFFFFFFF)), true ,'0xFFFFFFFFFFFFFFFF>>17 => 0x7FFFFFFFFFFF' );
	
	//Plus testing:
	equal(splitBits(0x00000000).plus(splitBits(0x0F0000FF)).isEqual(new LongBitString(0x0,0x0F0000FF)), true ,'0x00000000+0x0F0000FF=0x0F0000FF' );
	equal(splitBits(0x123456789ABC).plus(splitBits(0x123456789ABC)).isEqual(new LongBitString(0x2468,0xACF13578)), true ,'0x123456789ABC+0x123456789ABC=0x2468ACF13578' );
	equal(splitBits(0x0FFFFFFFFFFF).plus(splitBits(0x00000FFFFFFF)).isEqual(new LongBitString(0x1000,0x0FFFFFFE)), true ,'0x0FFFFFFFFFFF+00000FFFFFFF=1000FFFFFFE' );
	
	equal(longSplitBits("00000000").plus(longSplitBits("0F0000FF")).isEqual(new LongBitString(0x0,0x0F0000FF)), true ,'0x00000000+0x0F0000FF=0x0F0000FF' );
	equal(longSplitBits("123456789ABC").plus(longSplitBits("123456789ABC")).isEqual(new LongBitString(0x2468,0xACF13578)), true ,'0x123456789ABC+0x123456789ABC=0x2468ACF13578' );
	equal(longSplitBits("0FFFFFFFFFFF").plus(longSplitBits("00000FFFFFFF")).isEqual(new LongBitString(0x1000,0x0FFFFFFE)), true ,'0x0FFFFFFFFFFF+0x00000FFFFFFF=0x1000FFFFFFE' );
	
	equal(longSplitBits("FFFFFFFFFFFFFFFF").plus(longSplitBits("0")).isEqual(new LongBitString(0xFFFFFFFF,0xFFFFFFFF)), true ,'0xFFFFFFFFFFFFFFFF+0x0=0xFFFFFFFFFFFFFFFF' );
	
	equal(longSplitBits("FFFFFFFFFFFFFFFF").plus(longSplitBits("0x1")).isEqual(new LongBitString(0x0,0x0)), true ,'0xFFFFFFFFFFFFFFFF+0x1=0x0' );
	equal(longSplitBits("FFFFFFFFFFFFFFFF").plus(longSplitBits("0x2")).isEqual(new LongBitString(0x0,0x1)), true ,'0xFFFFFFFFFFFFFFFF+0x1=0x1' );
	equal(longSplitBits("FFFFFFFFFFFFFFFF").plus(longSplitBits("0x123456")).isEqual(new LongBitString(0x0,0x123455)), true ,'0xFFFFFFFFFFFFFFFF+0x123456=0x123455' );
	equal(longSplitBits("FFFFFFFFFFFFFFFF").plus(longSplitBits("0x123456789ABC")).isEqual(new LongBitString(0x1234,0x56789ABB)), true ,'0xFFFFFFFFFFFFFFFF+0x12345789ABC6=0x123456789ABB' );
	equal(longSplitBits("FFFFFFFFFFFFFFFF").plus(longSplitBits("FFFFFFFFFFFFFFFF")).isEqual(new LongBitString(0xFFFFFFFF,0xFFFFFFFE)), true ,'0xFFFFFFFFFFFFFFFF+0xFFFFFFFFFFFFFFFF=0xFFFFFFFFFFFFFFFE' );
	
	//Times testing:


/*
     equal(splitBits(0x00000000).times(splitBits(0x0F0000FF)).isEqual(new LongBitString(0x0,0x0)), true ,'0x00000000*0x0F0000FF=0x000000000000' );  
	equal(splitBits(0x1111111).times(splitBits(0x789ABC)).isEqual(new LongBitString(0x80A5,0x0CC4C27C)), true ,'0x1111111*0x789ABC=0x80A50CC4C27C' ); 
	
	equal(longSplitBits("00000000").times(longSplitBits("0F0000FF")).isEqual(new LongBitString(0x0,0x0)), true ,'0x00000000*0x0F0000FF=0x000000000000' );
	equal(longSplitBits("1111111").times(longSplitBits("789ABC")).isEqual(new LongBitString(0x80A5,0x0CC4C27C)), true ,'0x1111111*0x789ABC=0x80A50CC4C27C' );

	equal(longSplitBits("FFFFFFFFFFFFFFFF").times(longSplitBits("0")).isEqual(new LongBitString(0x0,0x0)), true ,'0xFFFFFFFFFFFFFFFF*0x0=0x0' );


	equal(longSplitBits("FFFFFFFFFFFFFFFF").times(longSplitBits("1")).isEqual(new LongBitString(0xFFFFFFFF,0xFFFFFFFF)), true ,'0xFFFFFFFFFFFFFFFF*0x1=0xFFFFFFFFFFFFFFFF' );
*/
 	equal(longSplitBits("FFFFFFFFFFFFFFFF").times(longSplitBits("FFFFFFFFFFFFFFFF")).isEqual(new LongBitString(0x0,0x1)), true ,'0xFFFFFFFFFFFFFFFF*0xFFFFFFFFFFFFFFFF=0x1' );  
    });