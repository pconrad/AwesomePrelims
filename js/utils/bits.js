/*

  bits.js


*/


function LongBitString(highBits,lowBits) {

	//Properties of our LongBitString object (the two 32 bit numbers)
    this.highBits = highBits;
    this.lowBits = lowBits;  
      
    //toString for this object (for testing-i.e. printing out the values we get)
    this.toString = function(){
	    var highBitsString=this.highBits.toString(16);
	    var lowBitsString = this.lowBits.toString(16);
	    return "high bits: " + highBitsString + " low bits: " + lowBitsString; 
    }  
      
    //isEqual test used in qunit testing so we can compare our "longBitString" objects
    this.isEqual = function(correctLongBitString){
	    return (this.highBits===correctLongBitString.highBits && this.lowBits===correctLongBitString.lowBits);
	    }
       
    //AND implementation   
    this.bitwiseAnd = function (otherLongBitString) {
	
	var x = new LongBitString(otherLongBitString.highBits,otherLongBitString.lowBits);

	x.highBits &= this.highBits;
	x.lowBits &= this.lowBits;
	
	return x;
    }

    //OR implementation
    this.bitwiseOr = function(otherLongBitString) {
	
	var x = new LongBitString(otherLongBitString.highBits,otherLongBitString.lowBits);
	x.highBits |= this.highBits;
	x.lowBits |= this.lowBits;
	
	return x;
    }
    
    
    //XOR implementation
    this.bitwiseXOr = function(otherLongBitString){
	
	var x = new LongBitString(otherLongBitString.highBits, otherLongBitString.lowBits);
	x.highBits ^= this.highBits;
	x.lowBits ^= this.lowBits;
	
	return x;       
    }  
}