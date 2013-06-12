/*

  random.js

  Original author, Phill Conrad and Emilie Barnard
  UCSB CS Dept. for Project Awesome

  Original Version: Spring 2013
  
  Provide a stream of random numbers that is seeded and repeatable,
  with a contract similar to that of the Random object in Java SE 7
  Implementing everyting from JavaDoc except for nextByte

*/
//Random creates a new random number generator using a single LongBitString seed. The seed is the initial value of the internal state of the pseudorandom number generator which is maintained by method next(int).
function Random(seed) {
	
	this.currentSeed = 0; //initial value, but will be set upon constructor call with setSeed

/* 	Sets the seed of this random number generator using a single long seed. The general contract of setSeed is that it alters the state of this random number generator object so as to be in exactly the same state as if it had just been created with the argument seed as a seed. The method setSeed is implemented by class Random by atomically updating the seed*/
	this.setSeed = function(seed) {
        
        this.currentSeed = (seed.bitwiseXOr(splitBits(0x5DEECE66D))).bitwiseAnd(splitBits(0xffffffffffff));
    }

    this.setSeed(seed); // constructor calls setSeed to initialize all attributes
    
/*     The general contract of next is that it returns an int value and if the argument bits is between 1 and 32 (inclusive), then that many low-order bits of the returned value will be (approximately) independently chosen bit values, each of which is (approximately) equally likely to be 0 or 1. The method next is implemented by class Random by atomically updating the seed */

/* This is a linear congruential pseudorandom number generator, as defined by D. H. Lehmer and described by Donald E. Knuth in The Art of Computer Programming, Volume 3: Seminumerical Algorithms, section 3.2.1. */
    this.next = function(bits) {
    	this.currentSeed = this.currentSeed.times(splitBits(0x5DEECE66D));
    	this.currentSeed = this.currentSeed.plus(splitBits(0xB));
    	this.currentSeed = this.currentSeed.bitwiseAnd(splitBits(0xffffffffffff));
    	if ((48-bits)<32){
	    	return this.currentSeed.rightShift(48-bits);
    	}
       	else
    		return null; //this shouldn't happen*/
    }
    
}

/** Method to select either a random element or a new array with a random number of elements from an array.
 *  If count is not present, a single random element will be returned.
 *  If count is present, the result array will be of size count. The random array will not use an element
 *  from the same source index more than once. Thus, if the source array has no duplicates, the random
 *  array will not have duplicates as well.
 *  @param {array} arr The array of elements to be selected from
 *  @param {int} [count] The number of elements in the result array
 *  @returns {object|array} A single random element, or a new array consisting of random elements
 *  @throws Throws if count is not within bounds of the array
 */

function Random_randFromArray(arr, count) {
    if (count == null){
        return arr[_.random(arr.length-1)];
    } else{
        if(count < 0 || count > arr.length){
            throw "count is out of bounds in randFromArray"
        }
        arr = arr.slice(0);
        return _.map(arr.slice(0,count),function(){
                return arr.splice(_.random(0,arr.length-1),1)[0];
                });
    }
};

/** Method to generate a random array of elements from one of three built in,
 *  primitive sets (letters 't' through 'z', 'a' through 'f', or numbers 1
 *  throught 7), or the sourceSet, if present. Randomly selects the size from
 *  between maxElems and minElems, incusively.
 *  @param {int} [maxElems=5] The maximum number of elements in the result array
 *  @param {int} [minElems=1] The minimum number of elements in the result array
 *  @param {array} [sourceArray] The source array, or one of the primitives described above.
 *  @returns {array} An array of elements
 */

function Random_randArrayOfElements(maxElems,minElems,sourceArray) {
    var source = sourceArray || [
        ["t","u","v","w","x","y","z"],
        ["a","b","c","d","e","f"],
        [1,2,3,4,5,6,7]][_.random(2)];
    minElems = minElems || 1;
    maxElems = maxElems || 5;
    maxElems = Math.min(source.length,maxElems);
    minElems = Math.min(maxElems,minElems);
    return randFromArray(source,_.random(minElems,maxElems));
};

