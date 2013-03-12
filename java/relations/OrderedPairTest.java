package org.djcattan.relations;
import junit.framework.TestCase;


public class OrderedPairTest extends TestCase {

	protected void tearDown() throws Exception {
		super.tearDown();
	}
	
	public static void main(String args[]){
		junit.textui.TestRunner.run(OrderedPairTest.class);
	}
	
	public void testConstructorString(){
		
		OrderedPair<String> p1 = new OrderedPair<String>("first", "second");
		
		String actual1 = p1.getFirstElement();
		String expected1 = "first";
		assertEquals(expected1, actual1);
		
		String actual2 = p1.getSecondElement();
		String expected2 = "second";
		assertEquals(expected2, actual2);
	}
		
	public void testConstructorInt(){	
		OrderedPair<Integer> p2 = new OrderedPair<Integer>(1, 2);
		
		int num1 = p2.getFirstElement();
		int expect1 = 1;
		assertEquals(expect1, num1);
		
		int num2 = p2.getSecondElement();
		int expect2 = 2;
		assertEquals(expect2, num2);
	}
	
	public void testToStringString(){
		OrderedPair<String> p3 = new OrderedPair<String>("uno", "dos");

		String result1 = p3.toString();
		String desire = "(uno, dos)";
		assertEquals("The ordered pair should be (uno, dos)", desire, result1);
	}	
		
	public void testToStringDouble(){	
		OrderedPair<Double> p4 = new OrderedPair<Double>(Math.PI, Math.E);
		String result2 = p4.toString();
		String desire = "(" + Math.PI + ", " + Math.E + ")";
		assertEquals(desire, result2);
	}
	
	public void testCompareToString(){
		OrderedPair<String> p5 = new OrderedPair<String>("this", "that");
		OrderedPair<String> p6 = new OrderedPair<String>("these", "those");
		
		int ans = p5.compareTo(p6);
		assertEquals(1, ans);
	}
	
	public void testCompareToChar(){
		OrderedPair<Character> p7 = new OrderedPair<Character>('x', 'y');
		OrderedPair<Character> p8 = new OrderedPair<Character>('z', 'w');
		
		int ans = p7.compareTo(p8);
		assertEquals(-1, ans);
	}
	
	public void testCompareToInt(){
		OrderedPair<Integer> p9 = new OrderedPair<Integer>(1, 2);
		OrderedPair<Integer> p10 = new OrderedPair<Integer>(2, 2);
		
		assertEquals(-1, p9.compareTo(p10));
	}
	
	public void testEquals(){
		OrderedPair<Character> p11 = new OrderedPair<Character>('x', 'y');
		OrderedPair<Character> p12 = new OrderedPair<Character>('x', 'y');
		
		assertTrue( p11.equals(p12) );
	}
	
}
