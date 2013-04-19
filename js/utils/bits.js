/*

  bits.js


*/


function LongBitString(highBits,lowBits) {

    this.highBits = highBits;
    this.lowBits = lowBits;
    
    this.bitwiseAnd = function (otherLongBitString) {
	
	var x = new LongBitString(otherLongBitString.highBits,otherLongBitString.lowBits);
	x.highBits &= this.highBits;
	x.lowBits &= this.lowBits;
	
	return x;
	// return "stub";
    }

    this.bitwiseOr = function(otherLongBitString) {
	
	var x = new LongBitString(otherLongBitString.highBits,otherLongBitString.lowBits);
	x.highBits |= this.highBits;
	x.lowBits |= this.lowBits;
	
	return x;
	// return "stub";
    }
    

}