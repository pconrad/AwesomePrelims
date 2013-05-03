
test( "bitsTest", 23, function() {

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
	var longBits5DEECE66D = new LongBitString(0x5DE,0xECE66D);
	var longBitsFFFFFFFFFFFF = new LongBitString(0xFFFFFF,0xFFFFFF);
	var longBits123456789ABC = new LongBitString(0x123456,0x789ABC);

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
	
/* 	testing splitBits */
	equal(splitBits(0x5DEECE66D).isEqual(new LongBitString(0x5DE,0xECE66D)), true ,'Testing split of 0x0005DEECE66D: high bits: 0x0005DE low bits: 0xECE66D' );
	equal(splitBits(0x123456789ABC).isEqual(new LongBitString(0x123456,0x789ABC)), true ,'Testing split of 0x123456789ABC: high bits: 0x123456 low bits: 0x789ABC');
	equal(splitBits(0x0).isEqual(new LongBitString(0x0,0x0)), true ,'Testing split of 0x000000000000: high bits: 0x000000 low bits: 0x000000');
	equal(splitBits(0xFFFFFFFFFFFF).isEqual(new LongBitString(0xFFFFFF,0xFFFFFF)), true ,'Testing split of 0xFFFFFFFFFFFF: high bits: 0xFFFFFF low bits: 0xFFFFFF');
	
/* 	testing rightShift31 */
	equal(longBits5DEECE66D.rightShift31().isEqual(new LongBitString(0x0,0xB)), true ,'0x5DEECE66D>>31 => 0xB' );
	equal(longBitsFFFFFFFFFFFF.rightShift31().isEqual(new LongBitString(0x0,0x1FFFF)), true ,'0xFFFFFFFFFFFF>>31 => 0x1FFFF' );
	equal(longBits123456789ABC.rightShift31().isEqual(new LongBitString(0x0,0x2468)), true ,'0x123456789ABC>>31 => 0x2468' );
	
/* 	testing rightShift16 */
	equal(longBits5DEECE66D.rightShift16().isEqual(new LongBitString(0x0,0x5DEEC)), true ,'0x5DEECE66D>>>16 => 0x5DEEC' );
	equal(longBitsFFFFFFFFFFFF.rightShift16().isEqual(new LongBitString(0xFF,0xFFFFFF)), true ,'0xFFFFFFFFFFFF>>>16 => 0xFFFFFFFF' );
	equal(longBits123456789ABC.rightShift16().isEqual(new LongBitString(0x12,0x345678)), true ,'0x123456789ABC>>>16 => 0x12345678' );
    });
    
    
