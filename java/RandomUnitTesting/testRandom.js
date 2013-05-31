/* for quick java testing: http://rextester.com/QRT10759 */

test("testRandom",2,function() {

var r = new Random(new LongBitString(0x123456,0x789ABC));

equal(new LongBitString(0x123456,0x789ABC).isEqual(r.randomValue),true,'testing RNG constructor'); 

r.setSeed(new LongBitString(0x123456,0x789ABC));

equal(new LongBitString(0x123188,0x947cd1).isEqual(r.randomValue),true,'testing setSeed'); 

});
