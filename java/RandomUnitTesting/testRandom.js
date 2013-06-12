/* for quick java testing: http://rextester.com/OMOGXL21081 */

test("testRandom",4,function() {

var r = new Random(new LongBitString(0x1234,0x56789ABC));
equal(new LongBitString(0x1231,0x88947cd1).isEqual(r.currentSeed),true,'testing RNG constructor (which calls setSeed) with intial seed value 0x123456789ABC'); 

var s = new Random(new LongBitString(0x0,0x1));
equal(new LongBitString(0x5,0xdeece66c).isEqual(s.currentSeed),true,'testing RNG constructor (which calls setSeed) with intial seed value 0x1'); 

var t = new Random(new LongBitString(0x0,0x0));
equal(new LongBitString(0x5,0xdeece66d).isEqual(t.currentSeed),true,'testing RNG constructor (which calls setSeed) with intial seed value 0x0'); 

var u = new Random(new LongBitString(0xFFFFFFFF,0xFFFFFFFF));
equal(new LongBitString(0xfffa,0x21131992).isEqual(u.currentSeed),true,'testing RNG constructor (which calls setSeed) with intial seed value 0xFFFFFFFFFFFFFFFF'); 




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
