test( "bitsTest", 26, function() {


	var longBits1 = new LongBitString(0x1234,0x5678);
	var longBits2 = new LongBitString(0x89AB,0xCDEF);

	//The following tests are for binary relations over a (single) set

	equal(longBits1.highBits,0x1234,'longBits1.highBits==0x1234' );
	equal(longBits1.lowBits,0x5678,'longBits1.lowBits==0x5678' );

	equal( longBits2.highBits,0x89AB,'longBits1.highBits==0x89AB' );
	equal( longBits2.lowBits,0xCDEF,'longBits1.lowBits==0xCDEF' );
	
	var longBitsA0B000C0D000 = new LongBitString(0xA0B000,0xC0D000);
	var longBits010200030400 = new LongBitString(0x010200,0x030400);
	var longBits000000000000 = new LongBitString(0x000000,0x000000);
	var longBits0FFF000FFF00 = new LongBitString(0x0FFF00,0x0FFF00);
	var longBits0FFF00000000 = new LongBitString(0x0FFF00,0x000000);
	var longBits0000000FFF00 = new LongBitString(0x000000,0x0FFF00);
	var longBits00FF000F0000 = new LongBitString(0x00FF00,0x0F0000);
	var longBits0F000000FF00 = new LongBitString(0x0F0000,0x00FF00);
	var longBitsFFFF00FFFF00 = new LongBitString(0xFFFF00,0xFFFF00);
	var longBits5DEECE66D = new LongBitString(0x5DE,0xECE66D);
	var longBitsFFFF00FFFF00FFFF = new LongBitString(0xFFFFFF,0xFFFFFF);
	var longBits123456789ABC = new LongBitString(0x123456,0x789ABC);
	var longBits0FFFFFFFFFFF = new LongBitString(0x0FFFFF,0xFFFFFF);
	var longBits00000FFFFFFF = new LongBitString(0x00000F,0xFFFFFF);
	var longBits00000000 = new LongBitString(0x0,0x0);
	var longBits0F0000FF = new LongBitString(0x0F00,0x00FF);

/* testing for And */
	equal(longBits0F000000FF00.bitwiseAnd(longBits0FFF00000000).isEqual(new LongBitString(0x0F0000,0x000000)),true,'0F000000FF00 & 0FFF00000000 => 0F00000000' );
	equal(longBitsFFFF00FFFF00.bitwiseAnd(longBits0FFF00000000).isEqual(new LongBitString(0x0FFF00,0x000000)),true,'FFFFFFFF & 0FFF0000 => 0FFF0000' );
	equal(longBitsFFFF00FFFF00.bitwiseAnd(longBitsFFFF00FFFF00).isEqual(new LongBitString(0xFFFF00,0xFFFF00)),true,'FFFFFFFF & FFFFFFFF => FFFFFFFF' );

/* testing for Or	 */
	equal(longBits0F000000FF00.bitwiseOr(longBits0FFF00000000).isEqual(new LongBitString(0x0FFF00,0x00FF00)),true,'0F000000FF00 | 0FFF00000000 => 0FFF0000FF00' );
	equal(longBits0F000000FF00.bitwiseOr(longBitsFFFF00FFFF00).isEqual(new LongBitString(0xFFFF00,0xFFFF00)),true,'0F0000FF | FFFFFFFF => FFFFFFFF' );
	equal(longBits0FFF00000000.bitwiseOr(longBits0FFF00000000).isEqual(new LongBitString(0x0FFF00,0x000000)),true,'0FFF0000 | 0FFF0000 => 0FFF0000' );
	
/* 	testing for XOr */
	equal(longBits0F000000FF00.bitwiseXOr(longBits0FFF00000000).isEqual(new LongBitString(0x00FF00,0x00FF00)),true,'0F0000FF ^ 0FFF0000 => 00FF00FF' );
	equal(longBits0F000000FF00.bitwiseXOr(longBitsFFFF00FFFF00).isEqual(new LongBitString(0xF0FF00,0xFF0000)),true,'0F0000FF ^ FFFFFFFF => F0FFFF00' );
	equal(longBits0FFF00000000.bitwiseXOr(longBits0FFF00000000).isEqual(new LongBitString(0x000000,0x000000)),true,'0FFF0000 ^ 0FFF0000 => 00000000' );
	
/* 	testing splitBits */
	equal(splitBits(0x5DEECE66D).isEqual(new LongBitString(0x5DE,0xECE66D)), true ,'Testing split of 0x0005DEECE66D: high bits: 0x0005DE low bits: 0xECE66D' );
	equal(splitBits(0x123456789ABC).isEqual(new LongBitString(0x123456,0x789ABC)), true ,'Testing split of 0x123456789ABC: high bits: 0x123456 low bits: 0x789ABC');
	equal(splitBits(0x0).isEqual(new LongBitString(0x0,0x0)), true ,'Testing split of 0x000000000000: high bits: 0x000000 low bits: 0x000000');
	equal(splitBits(0xFFFFFFFFFFFF).isEqual(new LongBitString(0xFFFFFF,0xFFFFFF)), true ,'Testing split of 0xFFFFFFFFFFFF: high bits: 0xFFFFFF low bits: 0xFFFFFF');
	
/* 	testing rightShift31 */
	equal(longBits5DEECE66D.rightShift31().isEqual(new LongBitString(0x0,0xB)), true ,'0x5DEECE66D>>31 => 0xB' );
	equal(longBitsFFFF00FFFF00FFFF.rightShift31().isEqual(new LongBitString(0x0,0x1FFFF)), true ,'0xFFFFFFFFFFFF>>31 => 0x1FFFF' );
	equal(longBits123456789ABC.rightShift31().isEqual(new LongBitString(0x0,0x2468)), true ,'0x123456789ABC>>31 => 0x2468' );
	
/* 	testing rightShift16 */
	equal(longBits5DEECE66D.rightShift16().isEqual(new LongBitString(0x0,0x5DEEC)), true ,'0x5DEECE66D>>>16 => 0x5DEEC' );
	equal(longBitsFFFF00FFFF00FFFF.rightShift16().isEqual(new LongBitString(0xFF,0xFFFFFF)), true ,'0xFFFFFFFFFFFF>>>16 => 0xFFFFFFFF' );
	equal(longBits123456789ABC.rightShift16().isEqual(new LongBitString(0x12,0x345678)), true ,'0x123456789ABC>>>16 => 0x12345678' );
	
	
/* testing plus	 */
	equal(longBits00000000.plus(longBits0F0000FF).isEqual(longBits0F0000FF), true ,'00000000+0F0000FF=0F0000FF' );
	equal(longBits123456789ABC.plus(longBits123456789ABC).isEqual(new LongBitString(0x2468AC,0xF13578)), true ,'123456789ABC+123456789ABC=2468ACF13578' );
	equal(longBits0FFFFFFFFFFF.plus(longBits00000FFFFFFF).isEqual(new LongBitString(0x10000F,0xFFFFFE)), true ,'s0FFFFFFFFFFF+00000FFFFFFF=1000FFFFFFE' ); //this last one has an overflow

    });
    
    
