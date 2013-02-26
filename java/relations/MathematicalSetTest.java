package org.djcattan.relations;
import junit.framework.TestCase;
import java.util.*;


public class MathematicalSetTest extends TestCase {

	protected void tearDown() throws Exception {
		super.tearDown();
	}
	
	public static void main(String args[]){
		junit.textui.TestRunner.run(MathematicalSetTest.class);
	}
	
	public void testError(){
		try{
			new MathematicalSet('g', 27);
			fail("Expected IllegalArgumentException when numChars is greater than 26.");
		} catch (IllegalArgumentException expected){
			// Test passed. Do nothing.
		}
	}
	
	public void testToStringInt(){
		MathematicalSet set = new MathematicalSet(1, 3);
		String result = set.toString();
		String expected = "{1, 2, 3}";
		
		assertEquals(expected, result);
	}
		
	public void testToStringChar(){	
		MathematicalSet set1 = new MathematicalSet('x', 4);
		Collection<String> c = new HashSet<String>();
		c.add("x");
		c.add("y");
		c.add("z");
		c.add("a");
		
		assertTrue( set1.containsAll(c) );
	}
	
	public void testAddInt(){
		MathematicalSet set = new MathematicalSet(1, 3);
		set.add(2);
		set.add(10);
		
		Collection<String> c = new HashSet<String>();
		c.add("1");
		c.add("2");
		c.add("3");
		c.add("10");
		
		assertTrue( set.containsAll(c) );
	
	}
	
	public void testAddChar(){	
		MathematicalSet set1 = new MathematicalSet('x', 4);
		set1.add('y');
		set1.add('f');
		Collection<String> c = new HashSet<String>();
		c.add("x");
		c.add("y");
		c.add("z");
		c.add("a");
		c.add("f");
		
		assertTrue( set1.containsAll(c) );
		
	}
	
	public void testRemoveInt(){
		MathematicalSet set = new MathematicalSet(1, 3);
		set.remove(2);
		set.remove(20);
		String result = set.toString();
		String expected = "{1, 3}";
		
		assertEquals(expected, result);
	}
		
	public void testRemoveChar(){	
		MathematicalSet set1 = new MathematicalSet('x', 4);
		set1.remove('y');
		Collection<String> c = new HashSet<String>();
		c.add("x");
		c.add("y");
		c.add("z");
		c.add("a");
		
		assertFalse( set1.containsAll(c) );
	}

	public void testContains(){
		MathematicalSet s = new MathematicalSet('x', 3);
		
		assertTrue( s.contains( "y" ) );
	}
	
}
