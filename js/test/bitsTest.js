test( "bitsTest", 9, function() {	
	
	
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
    });