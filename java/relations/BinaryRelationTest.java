package org.djcattan.relations;
import junit.framework.TestCase;
import java.util.Random;
import java.util.*;

public class BinaryRelationTest extends TestCase{
	
	protected void tearDown() throws Exception {
		super.tearDown();
	}
	
	public static void main(String args[]){
		junit.textui.TestRunner.run(BinaryRelationTest.class);
	}

	public void testConstructor(){
		MathematicalSet s = new MathematicalSet('x', 3);
		BinaryRelation r = new BinaryRelation(s);
		r.addCartesian();
		
		assertEquals("{(x, x), (x, y), (x, z), (y, x), (y, y), (y, z), (z, x), (z, y), (z, z)}", r.toString() );
	}
	
	public void testError(){
		try{
			MathematicalSet s = new MathematicalSet('x', 3);
			new BinaryRelation(s).addRandom(1.5, new Random() );
			fail("A given probability cannot be greater than 1 or less than 0.");
		} catch (IllegalArgumentException expected){
			//Test passed. Do nothing.
		}
	}
	
	public void testCopy(){
		MathematicalSet s = new MathematicalSet('s', 4);
		BinaryRelation base = new BinaryRelation(s);
		base.addRandom( .7, new Random() );
		BinaryRelation copy = base.copy();
		
		assertTrue( copy.subsetOf( base ) && base.subsetOf( copy ) );
	}
	
	public void testReflexive(){
		MathematicalSet s = new MathematicalSet('x', 3);
		BinaryRelation r = new BinaryRelation(s);
		r.addCartesian();
		
		assertTrue( r.isReflexive() );
	}
	
	public void testSymmetric(){
		MathematicalSet s = new MathematicalSet('x', 3);
		BinaryRelation r = new BinaryRelation(s);
		r.addCartesian();
		
		assertTrue( r.isSymmetric() );
	}
	
	public void testTransitive(){
		MathematicalSet s = new MathematicalSet('x', 3);
		BinaryRelation r = new BinaryRelation(s);
		r.addCartesian();
		
		assertTrue( r.isTransitive() );
	}
	
	public void testReflexiveClosure(){
		MathematicalSet s = new MathematicalSet(4, 3);
		BinaryRelation r = new BinaryRelation(s);
		r.addRandom(.6, new Random() );
		r.addReflexiveClosure();
		
		assertTrue( r.isReflexive() );
	}
	
	public void testSymmetricClosure(){
		MathematicalSet s = new MathematicalSet(10, 3);
		BinaryRelation r = new BinaryRelation(s);
		r.addRandom(.7, new Random() );
		r.addSymmetricClosure();
		
		assertTrue( r.isSymmetric() );
	}
	
	public void testTransitiveClosure(){
		MathematicalSet s = new MathematicalSet(100, 3);
		BinaryRelation r = new BinaryRelation(s);
		r.addRandom(.4, new Random() );
		r.addTransitiveClosure();
		
		assertTrue( r.isTransitive() );
	}
	
	public void testAddRelations(){
		MathematicalSet s = new MathematicalSet('c', 3);
		BinaryRelation r = new BinaryRelation(s);
		r.addRandom(.35, new Random() );
		
		// Create random booleans to create
		// a relation with random properties
		int n = new Random().nextInt(100);
		boolean sym, ref, tran;
		
		ref = n % 2 == 0;
		sym = n % 3 == 0;
		tran = n > 50;
		
		r.addRelations(ref, sym, tran);
		assertTrue( r.isReflexive() == ref &&
					r.isSymmetric() == sym &&
					r.isTransitive() == tran );
		
	}
	
	public void testRemove(){
		MathematicalSet s = new MathematicalSet('x', 3);
		BinaryRelation r = new BinaryRelation(s);
		r.addCartesian();
		OrderedPair<String> pair = new OrderedPair<String> ("x", "y");
		r.remove( pair );
		
		assertFalse( r.contains( pair ) );
		
	}
	
	public void testRemoveAll(){
		MathematicalSet s = new MathematicalSet(4, 3);
		BinaryRelation r = new BinaryRelation(s);
		r.addCartesian();
		r.removeAll();
		
		assertEquals(0, r.numElements());
	}
	
	public void testRemoveRef(){
		MathematicalSet s = new MathematicalSet(4, 3);
		BinaryRelation r = new BinaryRelation(s);
		r.addRandom(.6, new Random() );
		r.addReflexiveClosure();
		r.removeReflexivity();
		
		assertFalse( r.isReflexive() );
	}
	
	public void testRemoveSym(){
		MathematicalSet s = new MathematicalSet(0, 10);
		BinaryRelation r = new BinaryRelation(s);
		r.addRandom(.5, new Random() );
		r.addSymmetricClosure();
		r.removeSymmetry();
		
		assertFalse( r.isSymmetric() );
	}
	
	public void testRemoveTran(){
		MathematicalSet s = new MathematicalSet('w', 4);
		BinaryRelation r = new BinaryRelation(s);
		r.addRandom(.4, new Random() );
		r.addTransitiveClosure();
		r.removeTransitivity();
		
		assertFalse( r.isTransitive() );
	}
	
	public void testSubsetOf(){
		MathematicalSet s = new MathematicalSet(12, 4);
		BinaryRelation r1 = new BinaryRelation(s);
		BinaryRelation r2 = new BinaryRelation(s);
		r1.addRandom(.5, new Random() );
		r2.addCartesian();
		
		assertTrue( r1.subsetOf(r2) );
	}
	
	public void testContains(){
		MathematicalSet s = new MathematicalSet('w', 4);
		BinaryRelation r = new BinaryRelation(s);
		r.addCartesian();
		OrderedPair<String> pair = new OrderedPair<String> ("1", "2");
		
		assertFalse( r.contains( pair ) );
	}
	
	public void testContains1(){
		MathematicalSet s = new MathematicalSet('u', 6);
		BinaryRelation r = new BinaryRelation(s);
		r.addCartesian();
		OrderedPair<String> pair = new OrderedPair<String> ("x", "y");

		assertTrue( r.contains( pair ) );
	}
	
	public void testcontains2(){
		MathematicalSet s = new MathematicalSet('v', 5);
		BinaryRelation r = new BinaryRelation(s);
		OrderedPair<String> op = new OrderedPair<String> ("x", "y");
		
		r.add(op);
		
		assertTrue( r.contains( op ) );	
	}

	public void testnzeros(){
		assertEquals( "0000", nzeros(4) );
		assertEquals( "", nzeros(0) );
		assertEquals( "0", nzeros(1) );
		assertEquals( "000", nzeros(3) );
	}
	
	public void testULITMATE(){
		BinaryRelation copy;
		int n = 3; // Our logic depends on n being at least 3
		MathematicalSet s = new MathematicalSet('a', n);
		BinaryRelation base = new BinaryRelation(s);
		ArrayList<OrderedPair<String>> cartesianProduct = new ArrayList<OrderedPair<String>>();
		OrderedPair<String> op;
		boolean ref, sym, tran;
		Object element[] = s.toArray();
		// Add every possible pair into the cartesianProduct
		for ( int x = 0; x < element.length; x ++ ){
			for ( int y = 0; y < element.length; y ++ ) {
				op = new OrderedPair<String>( element[x].toString(), element[y].toString() );
				cartesianProduct.add( op );
			}
		}
		
		// Construct all the bit strings of length n*n 
		// Use those bit strings to construct every possible relation on the set of n elements
		int poss = (int) Math.pow( 2.0, (double) s.numElements() * s.numElements() );
		for ( int i = 0; i < poss; i ++ ){
			String bits = Integer.toBinaryString( i );
			bits = nzeros( n*n - bits.length() ) + bits;
			char digits[] = bits.toCharArray();
			assertTrue( digits.length == n*n );
			
			base.removeAll();
			for ( int p = 0; p < digits.length; p ++ ){
				if ( digits[p] == '1' )
					base.add( cartesianProduct.get(p) );
			}
			// Recreate this relation each time through the following loop
			// This loop goes over all eight possibilities of ref, sym, tran
			for ( int t = 0; t < 8; t ++ ){
				//System.out.println( "t = " + t );
				copy = base.copy();
				// Set the booleans of ref, sym, and tran based
				// on the individual bits of the int t where
				// 0 <= t < 8
				ref = (t & 0x1)!= 0;
				sym = (t & 0x2)!= 0;
				tran = (t & 0x4)!= 0;
				
				copy.addRelations(ref, sym, tran);
				
				assertTrue( copy.isReflexive() == ref &&
						copy.isSymmetric() == sym &&
						copy.isTransitive() == tran );
			}
		}
	}
	
	private String nzeros( int n ){
		String result = "";
		for ( int i = 0; i < n; i ++ ){
			result += "0";
		}
		return result;
	}

}