package org.djcattan.relations;

public class OrderedPair<E> implements Comparable<OrderedPair<E>>{
	
	//OrderedPair Variables
	private E firstElement;
	private E secondElement;
	
	/** constructor
	 * @param first element of ordered pair, e.g. a in (a,b)
	 * @param second element of ordered pair, e.g. b in (a,b)
	 */
	public OrderedPair(E first, E second){
		firstElement = first;
		secondElement = second;
	}
	
	/** returns the first element of the ordered pair
	 * 
	 * @return e.g. a in (a, b)
	 */
	public E getFirstElement(){
		return firstElement;
	}
	
	/** returns the second element of the ordered pair
	 * 
	 * @return e.g. b in (a, b)
	 */
	public E getSecondElement(){
		return secondElement;
	}
	
	/** returns ordered pair as a string
	 *
	 * @returns ordered pair in notation such as  "(a,b)"
	 */
	public String toString(){
		return "(" + firstElement.toString() + ", " + secondElement.toString() + ")";
	}
	
	/**
	 * Overrides the normal .equals() method to compare the elements of the OrderedPair
	 * 
	 * @param op
	 * @return true if the first and second elements of this OrderedPair equal the first and second elements of OrderedPair op.
	 */
	public boolean equals(OrderedPair<E> op){
		boolean first = firstElement.equals(op.getFirstElement());
		boolean second = secondElement.equals(op.getSecondElement());
		
		return (first && second);
	}
	
	/** returns comparison result as an integer value
	 * @param other OrderedPair object of the same type
	 * 
	 * @return -1 if this is less than op, 0 if they are equal, 1 if this is greater than op
	 */
	public int compareTo(OrderedPair<E> op){
		int result;
		boolean first = firstElement.equals(op.getFirstElement());
		boolean second = secondElement.equals(op.getSecondElement());
		
		//Check to see if the elements are equal. Otherwise, normalize the value given by the String compareTo method.
		if ( first && second ){
			result = 0;
		} else {
			result = toString().compareTo(op.toString());
			result /= Math.abs(result);
		}
		
		return result;
	}
}
