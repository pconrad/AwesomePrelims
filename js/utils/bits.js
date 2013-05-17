/*

  bits.js
  This is a library that will enable us to perform bitwise and shift operations on numbers that are larger than 32 bits.
  It can handle unsigned numbers that are up to 62 bits. If we used all possible 64/2=32 bits, the leading sign bit would cause us problems (hence we use 32-1=31 bits maximum).

  
  By default, it will split a 48 bit number into two, 24 bit numbers.   
  
  The number 24 can be changed, if desired. To do so, change the value of sizeOfSmallerNumbers. This would change the size of the two numbers we use to store the upper and lower bits of the original, larger number. Note that if you want to store a number of size x, the size of the two smaller numbers must be at least  the ceiling of x/2. If this number is changed, it must be less than 32 (and thus the greatest number we can store is 31*2=62). Otherwise, unwanted behavior may occur.

  Note also that since javascript uses IEEE floating point notation, the largest whole number that can be stored is only 53 bits. If you used this library for numbers larger than 53 bits, you are entering uncharted waters.
*/

/* sizeOfSmallerNumbers can be changed. If it's changed to a number >31 or <16, undesired results may occur. */
sizeOfSmallerNumbers = 24;

/* LongBitsString is our object that has the two smaller numbers that together represent the larger number. With these two components we are able to perform the bitwise and shift operations. */
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
	
	//RightShift31 shifts bits 31 spots to the right  (>>31)
	this.rightShift31 = function(){
		
		return new LongBitString(0, this.highBits >>> (31 - sizeOfSmallerNumbers));  
	} 
	
	//RightShift16 shifts bits 16 spots to the right (>>>16)
	this.rightShift16 = function(){
		
		var x = new LongBitString(this.highBits, this.lowBits);
		x.lowBits >>>= 16;
		x.highBits <<= 16;
		x.highBits >>>= (32-sizeOfSmallerNumbers);
		x.lowBits += x.highBits;
		x.highBits = this.highBits >>> 16;
		return x;  
	} 
	
	//Plus sums this and addend, and returns the result
	//Note: might not work when sum is more than 48 bits
	this.plus = function(addend){
		
		var x = new LongBitString(this.highBits, this.lowBits);
		x.lowBits += addend.lowBits;
		x.highBits +=addend.highBits;
		
		//check overflow from lowBits
		var overflowBits = x.lowBits >>> sizeOfSmallerNumbers;
		x.lowBits -= overflowBits << sizeOfSmallerNumbers;
		x.highBits +=overflowBits;
		
		return x;
	}

}

/* OriginalNumber must be less than 2*sizeOfSmallerNumbers. */
function splitBits(originalNumber){

	var highBits = Math.floor(originalNumber / Math.pow(2, sizeOfSmallerNumbers));
	var lowBits = originalNumber - (highBits * Math.pow(2, sizeOfSmallerNumbers));
	
	return (new LongBitString(highBits,lowBits));
}