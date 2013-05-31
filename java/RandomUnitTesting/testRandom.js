/* for quick java testing: http://rextester.com/OMOGXL21081 */

test("testRandom",4,function() {

var r = new Random(new LongBitString(0x123456,0x789ABC));

equal(new LongBitString(0x123188,0x947cd1).isEqual(r.currentSeed),true,'testing RNG constructor with intial seed value 0x123456789ABC'); 

r.setSeed(new LongBitString(0x123456,0x789ABC));

equal(new LongBitString(0x123188,0x947cd1).isEqual(r.currentSeed),true,'testing setSeed with seed value 0x123456789ABC'); 

r.setSeed(new LongBitString(0x123ABC,0x000000));

equal(new LongBitString(0x123F62,0xECE66D).isEqual(r.currentSeed),true,'testing setSeed with seed value 0x123ABC000000'); 

r.next(32);

equal(new LongBitString(0xDA35E8,0x600A74).isEqual(r.currentSeed),true,'testing one step of next (32 bits) with intial seed value 0x123ABC000000'); 


});
