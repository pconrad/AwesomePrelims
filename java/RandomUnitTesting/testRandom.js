test("testRandom",2,function() {

 var r = new Random(new LongBitString(0x123456,0x789ABC));
 
equal(1560403464,r.nextInt(),'first call to r.nextInt()');

equal(1,1,"stub test");

});
