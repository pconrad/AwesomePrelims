test("testRandom",2,function() {

var r = new Random(new LongBitString(0x123456,0x789ABC));

equal(new LongBitString(0x123456,0x789ABC).isEqual(r.randomValue),true,'testing RNG constructor'); 

equal(1,1,"stub test");


});
