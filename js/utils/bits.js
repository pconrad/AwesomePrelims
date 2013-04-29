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
    }

    this.bitwiseOr = function(otherLongBitString) {
	
	var x = new LongBitString(otherLongBitString.highBits,otherLongBitString.lowBits);
	x.highBits |= this.highBits;
	x.lowBits |= this.lowBits;
	
	return x;

    }
    
    //So we can print out what is actually being done (for testing)
    this.toString = function(){
	    var highBitsString=this.highBits.toString(16);
	    var lowBitsString = this.lowBits.toString(16);
	    return "high bits: " + highBitsString + " low bits: " + lowBitsString; 
    }
    
    //Writing our own isEqual test so we can compare our "longBitString" objects
    this.isEqual = function(correctLongBitString){
	    return (this.highBits===correctLongBitString.highBits && this.lowBits===correctLongBitString.lowBits);
	    }
}