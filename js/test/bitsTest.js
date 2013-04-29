
test( "bitsTest", 13, function() {

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
	var longBits0FFF0FFF = new LongBitString(0x0FFF,0x0FFF);
	var longBits0FFF0000 = new LongBitString(0x0FFF,0x0000);
	var longBits00000FFF = new LongBitString(0x0000,0x0FFF);
	var longBits00FF0F00 = new LongBitString(0x00FF,0x0F00);
	var longBits0F0000FF = new LongBitString(0x0F00,0x00FF);
	var longBitsFFFFFFFF = new LongBitString(0xFFFF,0xFFFF);

/* testing for And */
	equal(longBits0F0000FF.bitwiseAnd(longBits0FFF0000).isEqual(new LongBitString(0x0F00,0x0000)),true,'0F0000FF & 0FFF0000 => 0F000000' );
	equal(longBitsFFFFFFFF.bitwiseAnd(longBits0FFF0000).isEqual(new LongBitString(0x0FFF,0x0000)),true,'FFFFFFFF & 0FFF0000 => 0FFF0000' );
	equal(longBitsFFFFFFFF.bitwiseAnd(longBitsFFFFFFFF).isEqual(new LongBitString(0xFFFF,0xFFFF)),true,'FFFFFFFF & FFFFFFFF => FFFFFFFF' );

/* testing for Or	 */
	equal(longBits0F0000FF.bitwiseOr(longBits0FFF0000).isEqual(new LongBitString(0x0FFF,0x00FF)),true,'0F0000FF | 0FFF0000 => 0FFF00FF' );
	equal(longBits0F0000FF.bitwiseOr(longBitsFFFFFFFF).isEqual(new LongBitString(0xFFFF,0xFFFF)),true,'0F0000FF | FFFFFFFF => FFFFFFFF' );
	equal(longBits0FFF0000.bitwiseOr(longBits0FFF0000).isEqual(new LongBitString(0x0FFF,0x0000)),true,'0FFF0000 | 0FFF0000 => 0FFF0000' );
	
/* 	testing for XOr */
	equal(longBits0F0000FF.bitwiseXOr(longBits0FFF0000).isEqual(new LongBitString(0x00FF,0x00FF)),true,'0F0000FF ^ 0FFF0000 => 00FF00FF' );
	equal(longBits0F0000FF.bitwiseXOr(longBitsFFFFFFFF).isEqual(new LongBitString(0xF0FF,0xFF00)),true,'0F0000FF ^ FFFFFFFF => F0FFFF00' );
	equal(longBits0FFF0000.bitwiseXOr(longBits0FFF0000).isEqual(new LongBitString(0x0000,0x0000)),true,'0FFF0000 ^ 0FFF0000 => 00000000' );
  
    });
    
