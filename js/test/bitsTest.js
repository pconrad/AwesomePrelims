test( "bitsTest", 5, function() {	
	
	
	//Constructor Testing:
	var longBits1 = new LongBitString(0x12345678,0x12345678);
	var longBits2 = new LongBitString(0xFFFFFFFF,0xFFFFFFFF);
	
	equal(longBits1.highBits,0x12345678,'testing highbits constructor with value 0x12345678' );
	equal(longBits1.highBits,0x12345678,'testing lowbits constructor with value 0x12345678' );
	
	equal(longBits2.highBits,0xFFFFFFFF,'testing highbits constructor with value 0xFFFFFFFF' );
	equal(longBits2.highBits,0xFFFFFFFF,'testing lowbits constructor with value 0xFFFFFFFF' );
	
	//splitBits Testing:
	equal(splitBits(0xFFFFFFFFFFFFFFFF).isEqual(new LongBitString(0xFFFFFFFF,0xFFFFFFFF)), true ,'Testing split of 0xFFFFFFFFFFFFFFFF: high bits: 0xFFFFFFFF low bits: 0xFFFFFFFF' );
alert(splitBits(0xFFFFFFFFFFFFFFFF));
	
    });
    
    
