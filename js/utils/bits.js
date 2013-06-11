/*

  bits.js
  This is a library that will enable us to perform bitwise and shift operations on numbers that are larger than 32 bits.
  It can handle unsigned numbers that are up to 62 bits. If we used all possible 64/2=32 bits, the leading sign bit would cause us problems (hence we use 32-1=31 bits maximum).

  
  By default, it will split a 48 bit number into two, 24 bit numbers.   
  
  The number 24 can be changed, if desired. To do so, change the value of sizeOfSmallerNumbers. This would change the size of the two numbers we use to store the upper and lower bits of the original, larger number. Note that if you want to store a number of size x, the size of the two smaller numbers must be at least  the ceiling of x/2. If this number is changed, it must be less than 32 (and thus the greatest number we can store is 31*2=62). Otherwise, unwanted behavior may occur.

  Note also that since javascript uses IEEE floating point notation, the largest whole number that can be stored is only 53 bits. If you used this library for numbers larger than 53 bits, you are entering uncharted waters.
*/

/* sizeOfSmallerNumbers can be changed. If it's changed to a number >31 or <16, undesired results may occur. */
sizeOfSmallerNumbers = 32;

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
	
		//we have to handle the sign bits separately:
		var signBits = new LongBitString(this.highBits >>> 31 ,this.lowBits >>>31);
		var otherSignBits = new LongBitString(otherLongBitString.highBits >>> 31 ,otherLongBitString.lowBits >>>31);
		var andedSignBits = new LongBitString(signBits.highBits & otherSignBits.highBits, signBits.lowBits & otherSignBits.lowBits);
	
		//then we can remove the signed bits, and handle the rest of the bits
		var nonSignBits = new LongBitString((this.highBits << 1) >>> 1 , (this.lowBits <<1) >>> 1);
		var otherNonSignBits = new LongBitString((otherLongBitString.highBits << 1) >>> 1 , (otherLongBitString.lowBits <<1) >>> 1);
		
		var andedNonSignBits = new LongBitString(nonSignBits.highBits & otherNonSignBits.highBits, nonSignBits.lowBits & otherNonSignBits.lowBits);
		
		
		//now we must put these two sets of bits together:
		return (new LongBitString(andedNonSignBits.highBits + (andedSignBits.highBits * Math.pow(2, sizeOfSmallerNumbers-1)), andedNonSignBits.lowBits + (andedSignBits.lowBits * Math.pow(2, sizeOfSmallerNumbers-1))));
    }

    //OR implementation
    this.bitwiseOr = function(otherLongBitString) {
    
   		//we have to handle the sign bits separately:
		var signBits = new LongBitString(this.highBits >>> 31 ,this.lowBits >>>31);
		var otherSignBits = new LongBitString(otherLongBitString.highBits >>> 31 ,otherLongBitString.lowBits >>>31);
		var oredSignBits = new LongBitString(signBits.highBits | otherSignBits.highBits, signBits.lowBits | otherSignBits.lowBits);
	
		//then we can remove the signed bits, and handle the rest of the bits
		var nonSignBits = new LongBitString((this.highBits << 1) >>> 1 , (this.lowBits <<1) >>> 1);
		var otherNonSignBits = new LongBitString((otherLongBitString.highBits << 1) >>> 1 , (otherLongBitString.lowBits <<1) >>> 1);
		
		var oredNonSignBits = new LongBitString(nonSignBits.highBits | otherNonSignBits.highBits, nonSignBits.lowBits | otherNonSignBits.lowBits);
		
		//now we must put these two sets of bits together:
		return (new LongBitString(oredNonSignBits.highBits + (oredSignBits.highBits * Math.pow(2, sizeOfSmallerNumbers-1)), oredNonSignBits.lowBits + (oredSignBits.lowBits * Math.pow(2, sizeOfSmallerNumbers-1))));
    }
    
    
    //XOR implementation
    this.bitwiseXOr = function(otherLongBitString){
	
		//we have to handle the sign bits separately:
		var signBits = new LongBitString(this.highBits >>> 31 ,this.lowBits >>>31);
		var otherSignBits = new LongBitString(otherLongBitString.highBits >>> 31 ,otherLongBitString.lowBits >>>31);
		var xoredSignBits = new LongBitString(signBits.highBits ^ otherSignBits.highBits, signBits.lowBits ^ otherSignBits.lowBits); 
		
		//then we can remove the signed bits, and handle the rest of the bits
		var nonSignBits = new LongBitString((this.highBits << 1) >>> 1 , (this.lowBits <<1) >>> 1);
		var otherNonSignBits = new LongBitString((otherLongBitString.highBits << 1) >>> 1 , (otherLongBitString.lowBits <<1) >>> 1);
		
		var xoredNonSignBits = new LongBitString(nonSignBits.highBits ^ otherNonSignBits.highBits, nonSignBits.lowBits ^ otherNonSignBits.lowBits);
		
		//now we must put these two sets of bits together:
		return (new LongBitString(xoredNonSignBits.highBits + (xoredSignBits.highBits * Math.pow(2, sizeOfSmallerNumbers-1)), xoredNonSignBits.lowBits + (xoredSignBits.lowBits * Math.pow(2, sizeOfSmallerNumbers-1))));

	}
	
	//RightShift shifts bits numLessThan32 spots to the right  (>>numLessThan32)
	this.rightShift = function(numLessThan32){
		var x = new LongBitString(this.highBits, this.lowBits);
		x.lowBits >>>= numLessThan32;
		x.highBits <<= 32-numLessThan32;
		x.highBits >>>= (32-sizeOfSmallerNumbers);
		x.lowBits += x.highBits;
		x.highBits = this.highBits >>> numLessThan32;
		return x;  
	} 
	
	
	
	//Plus sums this and addend, and returns the result
	//Note: overflow behaves like that of Java. If the result is larger than sizeOfSmallerNumbers, the higher overflow bits are tuncated
	//Note: untested for sizeOfSmallerNumbers not divisible by 4
	this.plus = function(addend){
		
		var x = new LongBitString(this.highBits, this.lowBits);
		x.lowBits += addend.lowBits;
		x.highBits +=addend.highBits;

		//check overflow from lowBits
		var overflowBits = Math.floor(x.lowBits / Math.pow(2, sizeOfSmallerNumbers));
		x.lowBits -= overflowBits * Math.pow(2, sizeOfSmallerNumbers);
		x.highBits +=overflowBits;
	
		
		//truncate any overflow on the highBits (like in Java)
		highBitsString = x.highBits.toString(16);
		highBitLength = highBitsString.length;
		highBitsString = highBitsString.substr(highBitLength-(sizeOfSmallerNumbers/4), (sizeOfSmallerNumbers/4));
		x.highBits = parseInt(highBitsString,16);
		
		return x;
	}
	
	this.binaryPlus = function(binaryNum, currentProduct){
		
	}
	
	//Times multiplies this and multiplier, and returns the result
	//Note: overflow behaves like that of Java. If the result is larger than sizeOfSmallerNumbers, the higher overflow bits are tuncated
	this.times = function(multiplier){
	
	//First we split up the numbers as such: this = numberA*2^48 + numberB*2^32 + numberC*2^16 + numberD; multiplier = numberE*2^48 + numberF*2^32 + numberG*2^16 + numberH
	
	var numberA = Math.floor(this.highBits / Math.pow(2, 16));
	var numberB = this.highBits - (numberA * Math.pow(2, 16));
	var numberC = Math.floor(this.lowBits / Math.pow(2, 16));
	var numberD = this.lowBits - (numberC * Math.pow(2, 16));
	
	var numberE = Math.floor(multiplier.highBits / Math.pow(2, 16));
	var numberF = multiplier.highBits - (numberE * Math.pow(2, 16));
	var numberG = Math.floor(multiplier.lowBits / Math.pow(2, 16));
	var numberH = multiplier.lowBits - (numberG * Math.pow(2, 16));
/*
	alert(numberA);
	alert(numberB);
	alert(numberC);
	alert(numberD);
	alert(numberE);
	alert(numberF);
	alert(numberG);
	alert(numberH);
*/
	
	var product = new LongBitString(0,0);
	
	product.lowBits = numberD*numberH; //last of the FOIL product, max number of bits is 32
	
	//penultimate of the FOIL product, max number of bits is 49. we must split 16 of the lower bits into the lowBits
	currentProduct = (numberD * numberG) + (numberC * numberH); //this is at maximum 33 bits on its own, plus 16 = 49
	if (currentProduct >= Math.pow(2,16)){
		numForHigherBits = Math.floor (currentProduct / Math.pow(2, 16)) * Math.pow(2, 16);
		product.lowBits += (currentProduct - numForHigherBits) << 16;
		product.highBits += numForHigherBits;
	}
	else {
		product.lowBits += currentProduct;
	}
/* 	alert("high"+product.highBits); */
	//third to last of the FOIL can only affect the upper 32 bits of the solution:
	currentProduct = (numberD * numberF) + (numberC * numberG) + (numberB * numberH); 
/* 	alert(currentProduct); */
	//third to last of the FOIL, so we have to check for overflow */
	if (currentProduct >= Math.pow(2,32)){
/* 		alert("true"); */
		currentOverflow = Math.floor(currentProduct / Math.pow(2,32)) * Math.pow(2,32); 
		product.highBits += currentProduct - currentOverflow;
	}
	else{
/*
		alert("false");
		alert("new high"+product.highBits);
*/
		product.highBits += currentProduct;
	}
/* 	alert("new high"+product.highBits); */
	
	//last part of the FOIL can only affect the upper 16 bits of the solution:
	currentProduct = (numberE * numberD) + (numberC * numberF) + (numberB * numberG) + (numberA * numberH);
	alert("current product "+currentProduct);
	alert("old high bits "+product.highBits);
	if (currentProduct >= Math.pow(2,16)){
		alert("true");
		currentOverflow = Math.floor(currentProduct / Math.pow(2,16)) * Math.pow(2,16); 
		product.highBits += (currentProduct - currentOverflow) << 16 ;
	}
	else{
		alert("false");
		product.highBits += currentProduct << 16;
	}
	alert("new high bits "+product.highBits);
	
	return product;
	
	/*
	productLowBits = this.lowBits*multiplier.lowBits;
		productHighBits = (this.highBits*multiplier.lowBits)+(this.lowBits*multiplier.highBits);
		alert(productLowBits);
		//Now we have to move any overflow from the low bits to the high bits:
		var overflowBits = Math.floor(productLowBits / Math.pow(2, sizeOfSmallerNumbers));
		productLowBits -= overflowBits * Math.pow(2, sizeOfSmallerNumbers);
		productHighBits +=overflowBits;
		
		
		//truncate any overflow on the highBits (like in Java)
		highBitsString = productHighBits.toString(16);
		highBitLength = highBitsString.length;
		highBitsString = highBitsString.substr(highBitLength-(sizeOfSmallerNumbers/4), (sizeOfSmallerNumbers/4));
		productHighBits = parseInt(highBitsString,16);
		
		return (new LongBitString(productHighBits,productLowBits));
*/

		//we will do this bit by bit so we know when to stop due to overflow:
/*
		thisString = this.highBits.toString(2) + this.lowBits.toString(2);
		multiplierString = multiplier.highBits.toString(2) + multiplier.lowBits.toString(2);
		
		numberOverflow = false;
		factor = 10;
		oldProduct = 0;
		product = 0;
		
		while (multiplierString!=0 && !numberOverflow){
			
			thisNumber = parseInt(thisString,2);
			multiplierNumber = parseInt(multiplierString,2);
			currentDigit = multiplierNumber % 10;
			
			if (currentDigit == 1){
				
				thisNumber = thisNumber * factor;
				oldProduct=product;
				product = binaryPlus(thisNumber, product);
			}
			else{
				
				thisNumber *= 10;
			}
			if (product > Math.pow(2, 64)){
				
				numberOverflow = true;
				product = oldProduct;                                                                 
			}
			*/

			
		}
}


/* OriginalNumber must be less than 2*sizeOfSmallerNumbers. */
/* Only works for numbers up to 0x1FFFFFFFFFFFFF (2^53-1), use longSplitBits for higher ones */
function splitBits(originalNumber){

	var highBits = Math.floor(originalNumber / Math.pow(2, sizeOfSmallerNumbers));
	var lowBits = originalNumber - (highBits * Math.pow(2, sizeOfSmallerNumbers));
	return (new LongBitString(highBits,lowBits));
}

/* OriginalNumber must be less than 2*sizeOfSmallerNumbers. */
/* This is for numbers that can't even be stored in js to begin with (larger than 54 bits) and thus need to be inputted as a string */
/* Note: input the number without 0x formatting, just enter the hex number without the leading 0x */
/* Untested for sizeOfSmallerNumbers not divisible by 4 */
function longSplitBits(originalNumberAsString){

	var stringLength = originalNumberAsString.length;

	if (stringLength > (sizeOfSmallerNumbers/4)){
		
		newHighBits = originalNumberAsString.substring(0, stringLength-(sizeOfSmallerNumbers/4));
		newLowBits = originalNumberAsString.substr(stringLength-(sizeOfSmallerNumbers/4), (sizeOfSmallerNumbers/4));
		return (new LongBitString(parseInt(newHighBits,16),parseInt(newLowBits,16)));
		}
	
	else{
		return (new LongBitString(parseInt("0",16),parseInt(originalNumberAsString,16)));
		}
	
}