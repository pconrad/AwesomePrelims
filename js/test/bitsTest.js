test( "bitsTest", 30, function() {	
	
	
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
	
	// Or Testing
	equal(splitBits(0x0F000000FF00).bitwiseOr(splitBits(0x0FFF00000000)).isEqual(new LongBitString(0x0FFF,0x0000FF00)),true,'0x0F000000FF00 | 0x0FFF00000000 => 0x0FFF0000FF00' );
	equal(splitBits(0x0F000000FF00).bitwiseOr(splitBits(0xFFFF00FFFF00)).isEqual(new LongBitString(0xFFFF,0x00FFFF00)),true,'0x0F0000FF | 0xFFFFFFFF => 0xFFFFFFFF' );
	equal(splitBits(0x0FFF00000000).bitwiseOr(splitBits(0x0FFF00000000)).isEqual(new LongBitString(0x0FFF,0x00000000)),true,'0x0FFF0000 | 0x0FFF0000 => 0x0FFF0000' );
	
	equal(longSplitBits("0F000000FF00").bitwiseOr(longSplitBits("0FFF00000000")).isEqual(new LongBitString(0x0FFF,0x0000FF00)),true,'0x0F000000FF00 | 0x0FFF00000000 => 0x0FFF0000FF00' );
	equal(longSplitBits("0F000000FF00").bitwiseOr(longSplitBits("FFFF00FFFF00")).isEqual(new LongBitString(0xFFFF,0x00FFFF00)),true,'0x0F0000FF | 0xFFFFFFFF => 0xFFFFFFFF' );
	equal(longSplitBits("0FFF00000000").bitwiseOr(longSplitBits("0FFF00000000")).isEqual(new LongBitString(0x0FFF,0x00000000)),true,'0x0FFF0000 | 0x0FFF0000 => 0x0FFF0000' );
	
	equal(longSplitBits("FFFFFFFF00000000").bitwiseOr(longSplitBits("FFFFFFFF00000000")).isEqual(new LongBitString(0xFFFFFFFF,0x00000000)),true,'0xFFFFFFFF00000000 | 0xFFFFFFFF00000000 => 0xFFFFFFFF00000000' );
	equal(longSplitBits("0123456789ABCDEF").bitwiseOr(longSplitBits("FFFFFFFFFFFFFFFF")).isEqual(new LongBitString(0xFFFFFFFF,0xFFFFFFFF)),true,'0x0123456789ABCDEF | 0xFFFFFFFFFFFFFFFF => 0xFFFFFFFFFFFFFFFF' );
	
	
    });