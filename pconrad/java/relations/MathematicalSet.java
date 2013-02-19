package org.djcattan.relations;
import java.util.*;
import java.lang.IllegalArgumentException;

public class MathematicalSet {
	
	private TreeSet<String> element;
	
	/**
	 * Create a set such as {w,x,y,z} (from startChar='w' and numElements=4).
	 *
	 * If numElements passed is > 26, throw
	IllegalArgumentException("numElements must be <= 26");
	 *
	 * If you go past z, wrap around, e.g. startChar="x", numElements=4
	gives {x,y,z,a},
	 *
	 * @param startChar the starting character for the set
	 * @param numElements the number of elements in the set
	 */

	public MathematicalSet(char startChar, int numElements){
		if ( numElements > 26 ){
			throw new IllegalArgumentException("The number of elements must be less than 26");
		} else {
			element = new TreeSet<String>();
			int startVal = Character.getNumericValue(startChar);
			for (int i = 0; i < numElements; i ++ ){
				if ( startVal + i < 36 ){   // z has value 35
					element.add( String.valueOf(Character.forDigit(startVal + i, startVal + i + 1)).trim() );
				} else {
					element.add( String.valueOf(Character.forDigit(startVal + i - 26, startVal + i - 25)).trim() );
				}
			}
			
		}
	}

	/**
	 * Create a set such as {1,2,3} (from startNum='1' and numElements=3).
	 *
	 * @param num the starting character for the set
	 * @param numElements the number of elements in the set
	 */

	public MathematicalSet(int startNum, int numElements){
		element = new TreeSet<String>();
		for (int i = 0; i < numElements; i ++ ){
			element.add( String.valueOf(startNum + i).trim() );
		}
		
	}
	
	/**
	 * Adds a new character to the current set.
	 * Because of the properties of TreeSet, the character is added only if it is not already in the set.
	 */
	public void add(char c){
		element.add(String.valueOf(c));
	}
	
	/**
	 * Adds a new integer to the current set.
	 * Because of the properties of TreeSet, the integer is added only if ti is not already in the set.
	 */
	public void add(int i){
		element.add(String.valueOf(i));
	}
	
	/**
	 * Removes the given character from the set.
	 */
	public void remove(char c){
		element.remove(String.valueOf(c));
	}
	
	/*
	 * Removes the given integer from the set.
	 */
	public void remove(int i){
		element.remove(String.valueOf(i));
	}
	
	/**
	 * 
	 * @return An array that contains all the elements in the MathematicalSet.
	 */
	public Object [] toArray(){
		return element.toArray();
	}
	
	/**
	 * 
	 * @return An integer representing the number of elements in the MathematicalSet.
	 */
	public int numElements(){
		return element.size();
	}
	
	/**
 	 *
	 * @return a random element in the MathematicalSet.
	 */
	public String getRandomElement(){
		Random generator = new Random();
		Object [] stuff = element.toArray();
		return (String) stuff[generator.nextInt( numElements() )];
	}
	
	/**
	 * 
	 * @param String s
	 * @return true if the String s is in the set, return false otherwise
	 */
	public boolean contains(String s){
		return element.contains( s );
	}
	
	/**
	 * 
	 * @param Collection c
	 * @return true if all the elements from the Collection c are in the MathematicalSet. 
	 */
	public boolean containsAll(Collection<String> c){
		return element.containsAll(c);
	}
	
	/**
	 *
	 * @returns A string representation of the set, e.g. {a,b,c,d}
	 */
	public String toString(){
		String list= "{";
		
		Iterator<String> it = element.iterator();
		
		list += it.next();
		
		while ( it.hasNext() ){
			list += ", " + it.next();
		}
		
		list += "}";
		
		return list;
	}
	
}
