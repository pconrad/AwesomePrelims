/* for quick java testing: http://rextester.com/PEHB61236 */

test("testRandom",28,function() {

//Constructor and setSeed testing:
var r = new Random(0x123456789ABC);
equal(new LongBitString(0x1231,0x88947cd1).isEqual(r.currentSeed),true,'testing RNG constructor (which calls setSeed) with intial seed value 0x123456789ABC'); 

var s = new Random(0x1);
equal(new LongBitString(0x5,0xdeece66c).isEqual(s.currentSeed),true,'testing RNG constructor (which calls setSeed) with intial seed value 0x1'); 

var t = new Random(0x0);
equal(new LongBitString(0x5,0xdeece66d).isEqual(t.currentSeed),true,'testing RNG constructor (which calls setSeed) with intial seed value 0x0'); 

var u = new Random(0xFFFFFFFFFFFFF);
equal(new LongBitString(0xfffa,0x21131992).isEqual(u.currentSeed),true,'testing RNG constructor (which calls setSeed) with intial seed value 0xFFFFFFFFFFFFFFFF'); 


//next testing on 32 bits:

//first call

equal(new LongBitString(0x0,0x5d01de08).isEqual(r.next(32)),true,'testing return value after one step of next (32 bits) with intial seed value 0x123456789ABC');
equal(new LongBitString(0x5d01,0xde08eb08).isEqual(r.currentSeed),true,'internally testing one step of next (32 bits) with intial seed value 0x123456789ABC'); 


equal(new LongBitString(0x0,0xbb1ad573).isEqual(s.next(32)),true,'testing return value after one step of next (32 bits) with intial seed value 0x1');
equal(new LongBitString(0xbb1a,0xd5732407).isEqual(s.currentSeed),true,'internally testing one step of next (32 bits) with intial seed value 0x1'); 

equal(new LongBitString(0x0,0xbb20b460).isEqual(t.next(32)),true,'testing return value after one step of next (32 bits) with intial seed value 0x0');
equal(new LongBitString(0xbb20,0xb4600a74).isEqual(t.currentSeed),true,'internally testing one step of next (32 bits) with intial seed value 0x0'); 


equal(new LongBitString(0x0,0x44d96cb3).isEqual(u.next(32)),true,'testing return value after one step of next (32 bits) with intial seed value 0xFFFFFFFFFFFFFFFF');
equal(new LongBitString(0x44d9,0x6cb30f35).isEqual(u.currentSeed),true,'internally testing one step of next (32 bits) with intial seed value 0xFFFFFFFFFFFFFFFF'); 


//second call
equal(new LongBitString(0x0,0x4a792855).isEqual(r.next(32)),true,'testing return value after two steps of next (32 bits) with intial seed value 0x123456789ABC');
equal(new LongBitString(0x4a79,0x28554273).isEqual(r.currentSeed),true,'internally testing two steps of next (32 bits) with intial seed value 0x123456789ABC');

equal(new LongBitString(0x0,0x19b89cd8).isEqual(s.next(32)),true,'testing return value after two steps of next (32 bits) with intial seed value 0x1');
equal(new LongBitString(0x19b8,0x9cd8a106).isEqual(s.currentSeed),true,'internally testing two steps of next (32 bits) with intial seed value 0x1'); 

equal(new LongBitString(0x0,0xd4d95138).isEqual(t.next(32)),true,'testing return value after one step of next (32 bits) with intial seed value 0x0');
equal(new LongBitString(0xd4d9,0x5138ab6f).isEqual(t.currentSeed),true,'internally testing two steps of next (32 bits) with intial seed value 0x0'); 

equal(new LongBitString(0x0,0x708722c3).isEqual(u.next(32)),true,'testing return value after two steps of next (32 bits) with intial seed value 0xFFFFFFFFFFFFFFFF');
equal(new LongBitString(0x7087,0x22c3179c).isEqual(u.currentSeed),true,'internally testing two steps of next (32 bits) with intial seed value 0xFFFFFFFFFFFFFFFF'); 


//nextInt testing:

//first call
strictEqual(0xfa4ac204, r.nextInt(), 'testing return value after one step of nextInt with intial seed value 0x123456789ABC');

strictEqual(0x68fb0e6f, s.nextInt(), 'testing return value after one step of nextInt with intial seed value 0x1');

strictEqual(0x3d93cb7a, t.nextInt(), 'testing return value after one step of nextInt with intial seed value 0x0');

strictEqual(0x3242017, u.nextInt(), 'testing return value after one step of nextInt with intial seed value 0xFFFFFFFFFFFFFFFF');



//second call
strictEqual(0xa9973ade, r.nextInt(), 'testing return value after two steps of nextInt with intial seed value 0x123456789ABC');

strictEqual(0x684df992, s.nextInt(), 'testing return value after two steps of nextInt with intial seed value 0x1');

strictEqual(0x9b3970be, t.nextInt(), 'testing return value after two steps of nextInt with intial seed value 0x0');

strictEqual(0x8c4bff9e, u.nextInt(), 'testing return value after two steps of nextInt with intial seed value 0xFFFFFFFFFFFFFFFF');

});
