/* for quick java testing: http://rextester.com/OMOGXL21081 */

test("testRandom",8,function() {

//Constructor and setSeed testing:
var r = new Random(new LongBitString(0x1234,0x56789ABC));
equal(new LongBitString(0x1231,0x88947cd1).isEqual(r.currentSeed),true,'testing RNG constructor (which calls setSeed) with intial seed value 0x123456789ABC'); 

var s = new Random(new LongBitString(0x0,0x1));
equal(new LongBitString(0x5,0xdeece66c).isEqual(s.currentSeed),true,'testing RNG constructor (which calls setSeed) with intial seed value 0x1'); 

var t = new Random(new LongBitString(0x0,0x0));
equal(new LongBitString(0x5,0xdeece66d).isEqual(t.currentSeed),true,'testing RNG constructor (which calls setSeed) with intial seed value 0x0'); 

var u = new Random(new LongBitString(0xFFFFFFFF,0xFFFFFFFF));
equal(new LongBitString(0xfffa,0x21131992).isEqual(u.currentSeed),true,'testing RNG constructor (which calls setSeed) with intial seed value 0xFFFFFFFFFFFFFFFF'); 


//next testing on 32 bits:
r.next(32);
equal(new LongBitString(0x5d01,0xde08eb08).isEqual(r.currentSeed),true,'testing one step of next (32 bits) with intial seed value 0x123456789ABC'); 

s.next(32);
equal(new LongBitString(0xbb1a,0xd5732407).isEqual(s.currentSeed),true,'testing one step of next (32 bits) with intial seed value 0x1'); 

t.next(32);
equal(new LongBitString(0xbb20,0xb4600a74).isEqual(t.currentSeed),true,'testing one step of next (32 bits) with intial seed value 0x0'); 

u.next(32);
equal(new LongBitString(0x44d9,0x6cb30f35).isEqual(u.currentSeed),true,'testing one step of next (32 bits) with intial seed value 0xFFFFFFFFFFFFFFFF'); 


/* alert(r.currentSeed); */
/*
equal(new LongBitString(0x123188,0x947cd1).isEqual(r.currentSeed),true,'testing RNG constructor with intial seed value 0x123456789ABC'); 
alert(r.currentSeed);

r.setSeed(new LongBitString(0x123456,0x789ABC));

equal(new LongBitString(0x123188,0x947cd1).isEqual(r.currentSeed),true,'testing setSeed with seed value 0x123456789ABC'); 

r.setSeed(new LongBitString(0x123ABC,0x000000));

equal(new LongBitString(0x123F62,0xECE66D).isEqual(r.currentSeed),true,'testing setSeed with seed value 0x123ABC000000'); 

r.next(32);

equal(new LongBitString(0xDA35E8,0x600A74).isEqual(r.currentSeed),true,'testing one step of next (32 bits) with intial seed value 0x123ABC000000'); 
*/


});
