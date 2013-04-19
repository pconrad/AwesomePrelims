
test( "bitsTest", 4, function() {

	var longBits1 = new LongBitString(0x1234,0x5678);
	var longBits2 = new LongBitString(0x89AB,0xCDEF);

	
	
	//The following tests are for binary relations over a (single) set

	equal(longBits1.highBits,0x1234,'longBits1.highBits==0x1234' );
	equal(longBits1.lowBits,0x5678,'longBits1.lowBits==0x5678' );

	equal( longBits2.highBits,0x89AB,'longBits1.highBits==0x89AB' );
	equal( longBits2.lowBits,0xCDEF,'longBits1.lowBits==0xCDEF' );
	
	var longBitsA0B0C0D0 = new LongBitString(0xA0B0,0xC0D0);
	var longBits01020304 = new LongBitString(0x0102,0x0304);
	var longBits00000000 = new LongBitString(0x0000,0x0000);
	var longBitsFFFFFFFF = new LongBitString(0xFFFF,0xFFFF);
	var longBitsFFFF0000 = new LongBitString(0xFFFF,0x0000);
	var longBits0000FFFF = new LongBitString(0x0000,0xFFFF);
	var longBits00FFFF00 = new LongBitString(0x00FF,0xFF00);
	var longBitsFF0000FF = new LongBitString(0xFF00,0x00FF);

	equal(_.isEqual(longBitsFF0000FF.bitwiseAnd(longBitsFFFF0000),
		       new LongBitString(0xFF00,0x0000)),true,'FF0000FF & FFFF0000 => FF000000' );
	equal(longBitsFF0000FF.bitwiseOr(longBitsFFFF0000),
	      new LongBitString(0xFFFF,0x00FF),'FF0000FF | FFFF0000 => FFFF00FF' );

    });
