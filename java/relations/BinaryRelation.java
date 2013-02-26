package org.djcattan.relations;
import java.util.*;
import java.lang.IllegalArgumentException;


/**
 * 
 * The Binary Relation takes the elements of a given MathematicalSet and then creates some kind of relation on the set.
 *
 */
public class BinaryRelation {

	MathematicalSet originalSet;
	TreeSet<OrderedPair<String>> relation;
	
	/**
	 * Creates a binary relation which is the Cartesian product of the set with itself.
	 */
	public BinaryRelation(MathematicalSet s){
		originalSet = s;
		relation = new TreeSet<OrderedPair<String>>();
	}
	/**
	 * Adds the Cartesian product of the originalSet with itself to the relation.
	 */
	public void addCartesian(){
		Object [] elements = originalSet.toArray();
		for ( int x = 0; x < elements.length; x ++ ){
			for ( int y = 0; y < elements.length; y ++ ){
				relation.add( new OrderedPair<String>(elements[x].toString(), elements[y].toString()) );
			}
		}
	}
	
	/**
	 * Uses the given MathematicalSet to construct a random binary relation.  The constructor uses the given double as a probability of whether 
	 * or not a Cartesian product is in the relation. p must be between 0.0 and 1.0
	 */
	public void addRandom(double p, Random generator){
		if ( p < 0.0 || p > 1.0){
			throw new IllegalArgumentException("Probabilities must be between 0.0 and 1.0 exclusive.");
		} else {

			double probability;
			relation = new TreeSet<OrderedPair<String>>();
		
			Object [] elements = originalSet.toArray();
			for ( int x = 0; x < elements.length; x ++ ){
				for ( int y = 0; y < elements.length; y ++ ){
					probability = generator.nextDouble();
					if (probability <= p){ //Successful adding!
						relation.add( new OrderedPair<String>(elements[x].toString(), elements[y].toString()) );
					} // end if
				} //end y-for
			}//end x-for
		}//end exception if
	} // end method
	
	/**
	 * Retuns a binary relation that contains all the same elements as this binary relation
	 */
	public BinaryRelation copy(){
		BinaryRelation copy = new BinaryRelation(originalSet);
		OrderedPair<String>[] relations = this.toArray();
		
		for ( int i = 0; i < relations.length; i ++ ){
			copy.add( relations[i] );
		}
		
		return copy;
	}
	
	/**
	 * Uses the MathematicalSet to add the Reflexive Closure to the Binary Relation.
	 */
	public void addReflexiveClosure(){
		OrderedPair<String> ref;
		Object [] element = originalSet.toArray();
		
		for ( int i = 0; i < originalSet.numElements(); i ++){
			ref = new OrderedPair<String>(element[i].toString(), element[i].toString());
			relation.add( ref );
		}
	}
	
	/**
	 * Makes this BinaryRelation symmetric by adding the Symmetric Closure for this particular relation.
	 */
	public void addSymmetricClosure(){
		OrderedPair<String> sym;
		OrderedPair<String> [] pairs = this.toArray();
		
		for ( int i = 0; i < pairs.length; i ++ ){
			sym = new OrderedPair<String> ( pairs[i].getSecondElement(), pairs[i].getFirstElement() );
			relation.add( sym );
		}
	}
	
	/**
	 * Makes this BinaryRelation transitive by adding the Transitive Closure for this particular relation.
	 */
	public void addTransitiveClosure(){
		OrderedPair<String> transElement;
		OrderedPair<String> firstOP, secondOP;
		OrderedPair<String> [] pair = this.toArray();
		
		while ( !this.isTransitive() ){
			pair = this.toArray();
			for ( int i = 0; i < pair.length; i ++ ){
				firstOP = ((OrderedPair<String>) pair[i]);
				for ( int j = 0; j < pair.length; j ++ ){
					secondOP = ((OrderedPair<String>) pair[j]);
					if ( firstOP.getSecondElement().equals( secondOP.getFirstElement() ) ){
						// If the two elements satisfy the transitivity condition, add the respected transitive element.
						transElement = new OrderedPair<String>( firstOP.getFirstElement(), secondOP.getSecondElement() );
						relation.add( transElement );
					}
				}
			}
		}
		
	}
	
	/**
	 * Adds a given element op to the relation only if it is an element of the Cartesian product of originalSet with itself.
	 * @param op
	 */
	public void add(OrderedPair<String> op){
		String first = op.getFirstElement();
		String second = op.getSecondElement();
		
		if ( !originalSet.contains( first ) ){
			throw new IllegalArgumentException("Element " + first + " not in the original set!");
		} else if ( !originalSet.contains( second ) ){
			throw new IllegalArgumentException("Element " + second + " not in the original set!");
		} else {
			relation.add( op );
		}
	}
	
	/**
	 * Adds elements to the current relation to make the relation have the properties specified by the inputs. For example, if all three values
	 * are true, then this method will create an equivalence relation.  If the input is (true, false, true) then the created relation will be
	 * both reflexive and transitive but not symmetric.  
	 *  
	 * @param wantReflexive
	 * @param wantSymmetric
	 * @param wantTransitive
	 */
	public void addRelations( boolean wantReflexive, boolean wantSymmetric, boolean wantTransitive ){
		String e1, e2, e3;
		OrderedPair<String> p1, p2;
		Random generator = new Random();
		Object elements[] = originalSet.toArray();
		// For an equivalence relation, just add all the closures
		if ( wantReflexive && wantSymmetric && wantTransitive ){
			this.addReflexiveClosure();
			this.addSymmetricClosure();
			this.addTransitiveClosure();
		// To remove the reflexivity, pick one element in the original set
		// and remove every relation that contains that one element
		} else if ( !wantReflexive && wantSymmetric && wantTransitive ){
			this.addCartesian();		
			int numRemove = 1;
			if (elements.length > 3){
				numRemove += generator.nextInt( elements.length - 3 );
			}
			for ( int x = 0; x < numRemove; x ++ ){
				int n = generator.nextInt( elements.length );
				for ( int i = 0; i < elements.length; i ++ ){
					p1 = new OrderedPair<String> ( elements[i].toString(), elements[n].toString() );
					p2 = new OrderedPair<String> ( elements[n].toString(), elements[i].toString() );
					
					if ( this.contains( p1 ) ){
						this.remove( p1 );
					}
					
					if ( this.contains( p2 ) ){
						this.remove( p2 );
					}
				} // end Element for
			} // end Remove for
		// Look at all relations (x, y) where x != y then remove relations so that when the
		// transitive closure is added, a symmetric element is not add. 
		// i.e. Let (x, y) is in R then pick either x or y (say x) then remove 
		// all elements of the form: (a, x) for all a in A so when the transitive closure
		// is added, the element (y, x) can not be added to the relation
		// if reflexive is desired, add the reflexive closure ( not reflexive because (x, x) was removed)
		} else if ( !wantSymmetric && wantTransitive ){
			ArrayList<OrderedPair<String>> mixElem = new ArrayList<OrderedPair<String>>();
			OrderedPair<String> pairs[] = this.toArray();
			for ( int i = 0; i < pairs.length; i ++ ){
				if ( !pairs[i].getFirstElement().equals( pairs[i].getSecondElement() ) ){
					mixElem.add( pairs[i] );
				}
			}
			if ( mixElem.isEmpty() ){
				do {
					e1 = originalSet.getRandomElement();
					e2 = originalSet.getRandomElement();
				} while ( e1.equals( e2 ) );
				this.add( new OrderedPair<String>( e1, e2 ) );
			} else {
				int n = generator.nextInt( mixElem.size() );
				p2 = mixElem.get(n);
				e1 = p2.getFirstElement();
				e2 = p2.getSecondElement();
				
				n = generator.nextInt( 100 );
				for ( int i = 0; i < elements.length; i ++ ){
					e3 = elements[i].toString();
					if ( n > 50 ){
						p1 = new OrderedPair<String> ( e2, e3 );
					} else {
						p1 = new OrderedPair<String> ( e3, e1 );
					}
					
					if ( this.contains( p1 ) && !p1.equals( p2 ) )
						this.remove( p1 );
				}
			}
			if ( wantReflexive ){
				this.addReflexiveClosure();
			} else if ( !wantReflexive && this.isReflexive() ){
				this.removeReflexivity();
			}
			this.addTransitiveClosure();
		// Make sure there are elements where (x, y), (y, z) are in the relation but
		// (x, z) and (y, x) or (z, y) are not. then add reflexive closure
		} else if ( wantReflexive && !wantSymmetric && !wantTransitive ){
			ArrayList<OrderedPair<String>> mixElem = new ArrayList<OrderedPair<String>>();
			OrderedPair<String> pairs[] = this.toArray();
			for ( int i = 0; i < pairs.length; i ++ ){
				if ( !pairs[i].getFirstElement().equals( pairs[i].getSecondElement() ) ){
					mixElem.add( pairs[i] );
				}
			}
			if ( mixElem.isEmpty() ){
				do {
					e1 = originalSet.getRandomElement();
					e2 = originalSet.getRandomElement();
					e3 = originalSet.getRandomElement();
				} while ( e1.equals( e2 ) || e1.equals( e3 ) || e2.equals( e3 ) );
				this.add( new OrderedPair<String>( e1, e2 ) );
				this.add( new OrderedPair<String>( e2, e3 ) );
			} else {
				int n = generator.nextInt( mixElem.size() );
				e1 = mixElem.get(n).getFirstElement();
				e2 = mixElem.get(n).getSecondElement();
				
				do {
					e3 = originalSet.getRandomElement();
				} while ( e3.equals( e1 ) || e3.equals( e2 ) );
				this.add( new OrderedPair<String>( e2, e3 ) );
				p1 = new OrderedPair<String>( e2, e1);
				if ( this.contains( p1 ) )
					this.remove( p1 );
				
				p2 = new OrderedPair<String>( e1, e3 );
				if ( this.contains( p2 ) )
					this.remove( p2 );
			}
			this.addReflexiveClosure();
		// Add and remove elements to make sure there is at least one violation of the transitive property
		// Then add or remove reflexive properties depending on desired result
		} else if ( wantSymmetric && !wantTransitive ){
			do {
				e1 = originalSet.getRandomElement();
				e2 = originalSet.getRandomElement();
				e3 = originalSet.getRandomElement();
			} while ( e1.equals( e2 ) || e1.equals( e3 ) || e2.equals( e3 ) );
			this.add( new OrderedPair<String>( e1, e2 ) );
			this.add( new OrderedPair<String>( e2, e3 ) );
			
			p1 = new OrderedPair<String>( e1, e3 );
			if ( this.contains( p1 ) ){
				this.remove( p1 );
			}
			p2 = new OrderedPair<String>( e3, e1 );
			if ( this.contains( p2 ) ){
				this.remove( p2 );
			}
			if ( wantReflexive ){
				this.addReflexiveClosure();
			} else {
				if ( this.contains( new OrderedPair<String>( e1, e1 ) ) ){
					this.remove( new OrderedPair<String>( e1, e1 ) );
				} else if ( this.contains( new OrderedPair<String>( e3, e3 ) ) ){
					this.remove( new OrderedPair<String>( e3, e3 ) );
				}
			}
			this.addSymmetricClosure();
		// This makes a relation that is not reflexive, symmetric, or transitive
		} else {
			ArrayList<OrderedPair<String>> mixElem = new ArrayList<OrderedPair<String>>();
			OrderedPair<String> pairs[] = this.toArray();
			for ( int i = 0; i < pairs.length; i ++ ){
				if ( !pairs[i].getFirstElement().equals( pairs[i].getSecondElement() ) ){
					mixElem.add( pairs[i] );
				}
			}
			
			// If the relation has no elements of the form (x, y) where x != y then add
			// (x, y), (y, z) and (y, y) to the relation
			// remove (x, x) if it is in the relation
			if ( mixElem.isEmpty() ){
				do {
					e1 = originalSet.getRandomElement();
					e2 = originalSet.getRandomElement();
					e3 = originalSet.getRandomElement();
				} while ( e1.equals( e3 ) || e1.equals( e2 ) || e2.equals( e3 ) );
				
				this.add( new OrderedPair<String>(e1, e2) );
				this.add( new OrderedPair<String>(e2, e3) );
				
				p1 =  new OrderedPair<String>(e1, e1);
				if ( this.contains( p1 ) )
					this.remove( p1 );
					
			} else { 
				// Else, take an element (x, y) that is in the relation and add
				// (y, z) and (y, y) to the relation, remove (x, z) and (x, x) if they exist
				int n = generator.nextInt( mixElem.size() );
				p1 = mixElem.get(n);
				e1 = p1.getFirstElement();
				e2 = p1.getSecondElement();
				
				do {
					e3 = originalSet.getRandomElement();
				} while ( e1.equals( e3 ) || e2.equals( e3 ) );
				
				this.add( new OrderedPair<String>(e2, e3 ) );
				p2 = new OrderedPair<String>( e1, e3 );
				
				if ( this.contains( p2 ) )
					this.remove( p2 );
				
				p1 = new OrderedPair<String>( e2, e1 );
				if ( this.contains( p1 ) )
					this.remove( p1 );
				
				p1 = new OrderedPair<String>( e1, e1 );
				if ( this.contains( p1 ) )
					this.remove( p1 );
					
			}
		
			p2 = new OrderedPair<String>( e2, e2 );
			this.add( p2 );
		}
	}
	
	/**
	 * Removes the given element op to the relation only if it was already in the relation.
	 * @param op
	 */
	public void remove(OrderedPair<String> op){
		if (!this.contains(op) ){
			throw new IllegalArgumentException("Ordered Pair " + op.toString() + " is not in the relation.");
		} else {
			relation.remove( op );
		}
	}
	
	/**
	 * Removes all elements in the relation.
	 */
	public void removeAll(){
		//Take the set relation, and remove all the elements that happen to be in the same set.
		relation.removeAll(relation);
	}
	
	/**
	 * Assumes that the relation is Reflexive before method call. After the method call, the relation is no longer reflexive.
	 */
	public void removeReflexivity(){
		String e1, e2;
		if ( this.numElements() != 0 ){
			e1 = originalSet.getRandomElement();
			OrderedPair<String> pair = new OrderedPair<String>(e1, e1);
			this.remove(pair);
		} else {
			do {
				e1 = originalSet.getRandomElement();
				e2 = originalSet.getRandomElement();
			} while ( e1.equals( e2 ) );
			this.add( new OrderedPair<String>( e1, e2 ) );
		}
	}
	
	/**
	 * Assumes that the relation is symmetric before method call. After the method call, the relation is no longer symmetric.
	 */
	public void removeSymmetry(){
		String elem1, elem2;
		OrderedPair<String> pair;
		
		// Here it is possible that the set is symmetric because it contains only the reflexive closure.
		// Thus, instead of removing an element, we add one to remove the symmetry of this relation.
		if ( this.numElements() <= originalSet.numElements() ){
			do{
				elem1 = originalSet.getRandomElement();
				elem2 = originalSet.getRandomElement();
				pair = new OrderedPair<String>(elem1, elem2);
			} while ( elem1.equalsIgnoreCase(elem2) || this.contains(pair) );
			
			this.add( pair );
		} else { 
			// In this case, there are at least one symmetric pair in the relation: e.g. (a, b) and (b, a).
			// find one of these pairs and remove one of those elements.
			do{
				elem1 = originalSet.getRandomElement();
				elem2 = originalSet.getRandomElement();
				pair = new OrderedPair<String>(elem1, elem2);
			} while ( elem1.equals(elem2) || !this.contains(pair) );
			
			this.remove( pair );
		}
	}
	
	/**
	 * Assumes that the relation is transitive before method call. After the method call, the relation is no longer transitive.
	 */
	public void removeTransitivity(){
		String e1, e2, e3;
		OrderedPair<String> [] pair = this.toArray();
		
		if ( this.numElements() == 0 ){ 
			do {
				e1 = originalSet.getRandomElement();
				e2 = originalSet.getRandomElement();
				e3 = originalSet.getRandomElement();
			} while ( e1.equals( e2 ) || e2.equals( e3 ) );
			
			this.add( new OrderedPair<String>( e1, e2 ) );
			this.add( new OrderedPair<String>( e2, e3 ) );
		} else if ( this.numElements() == 1 ){
			if ( pair[0].getFirstElement().equals( pair[0].getSecondElement() ) ){
				do {
					e1 = originalSet.getRandomElement();
					e2 = originalSet.getRandomElement();
					e3 = originalSet.getRandomElement();
				} while ( e2.equals(e3) || (e1.equals(e3) && e1.equals(pair[0].getFirstElement()) ) );
				this.add( new OrderedPair<String>( e1, e2 ) );
				this.add( new OrderedPair<String>( e2, e3 ) );
			} else {
				e2 = pair[0].getSecondElement();
				do {
					e3 = originalSet.getRandomElement();
				} while ( e2.equals(e3) );
				this.add( new OrderedPair<String>(e2, e3) );
			}
		} else if ( this.numElements() == 2 ){
			if ( pair[0].getFirstElement().equals( pair[0].getSecondElement() ) && pair[1].getFirstElement().equals( pair[1].getSecondElement() ) ){
				e1 = pair[0].getFirstElement();
				e2 = pair[1].getSecondElement();
				
				do {
					e3 = originalSet.getRandomElement();
				} while ( e2.equals( e3 ) || e1.equals( e3 ) );
				this.add( new OrderedPair<String>( e2, e3 ) );
				this.add( new OrderedPair<String>( e3, e2 ) );
			} else if ( pair[0].getFirstElement().equals( pair[0].getSecondElement() ) || pair[1].getFirstElement().equals( pair[1].getSecondElement() ) ){
				if ( pair[0].getFirstElement().equals( pair[0].getSecondElement() ) ){
					e1 = pair[1].getFirstElement();
					e2 = pair[1].getSecondElement();
					e3 = pair[0].getFirstElement();
				} else {
					e1 = pair[0].getFirstElement();
					e2 = pair[0].getSecondElement();
					e3 = pair[1].getFirstElement();
				}
				
				if ( !e1.equals( e3 ) && !e2.equals( e3 ) ){
					this.add( new OrderedPair<String>( e3, e1 ) );
				} else if ( e1.equals( e3 ) ){
					do {
						e1 = originalSet.getRandomElement();
					} while ( e1.equals(e3) );
					this.add( new OrderedPair<String>( e1, e3 ) );
				} else {
					do {
						e2 = originalSet.getRandomElement();
					} while ( e2.equals( e3 ) );
					this.add( new OrderedPair<String>( e3, e2 ) );
				}
			} else {
				e1 = pair[0].getSecondElement();
				e2 = pair[1].getFirstElement();
				this.add( new OrderedPair<String>( e1, e2 ) );
			}
		} else {
			
			OrderedPair<String> transElement;
			OrderedPair<String> firstOP, secondOP;
			ArrayList<OrderedPair<String>> toRemove = new ArrayList<OrderedPair<String>>();
			
			//Look in the relation for an element (x, y) such that
			// (x, z) and (z, y) are also in the relation
			// Do this by systematically looking at each relation in the set.
			for ( int i = 0; i < pair.length; i ++ ){
				firstOP = ((OrderedPair<String>) pair[i]);
				for ( int j = 0; j < pair.length; j ++ ){
					secondOP = ((OrderedPair<String>) pair[j]);
					if ( firstOP.getSecondElement().equals( secondOP.getFirstElement() ) ){
						transElement = new OrderedPair<String>( firstOP.getFirstElement(), secondOP.getSecondElement() );
						// Check to make sure that the element created is not of the form (x, x)
						// If it is of this form, there is no guarantee that remove this element removes the
						// transitivity. i.e. {(x, y), (y, y)} removing (y, y) leaves {(x, y)} which 
						// is still transitive.
						if ( !transElement.getFirstElement().equals( transElement.getSecondElement() ) &&
								!transElement.equals(firstOP) && !transElement.equals(secondOP) && this.contains( transElement) ) {
							toRemove.add( transElement );
							
						}
					}
				}
			}
			
			// If there were no such transitive elements, create a relation not already in the relation
			// that will remove the transitive property of the relation
			if ( toRemove.isEmpty() ){
				Object[] element = originalSet.toArray();
				for ( int i = 0; i < pair.length; i ++ ){
					e1 = ((OrderedPair<String>) pair[i]).getFirstElement();
					e2 = ((OrderedPair<String>) pair[i]).getSecondElement();
					for ( int j = 0;  j < element.length; j ++ ){
						e3 = element[j].toString();
						if ( !e2.equals( e3 ) ){
							transElement = new OrderedPair<String>( e1, e3 );
							if ( !this.contains( transElement ) ){
								this.add( new OrderedPair<String>( e2, e3 ) );
								break;
							}
							
						}
					}	
				}
			} else {
				Random random = new Random();
				int remove = random.nextInt( toRemove.size() );
				transElement  = toRemove.get( remove );
				this.remove( transElement );
			}
		}
	}
	
	/**
	 * Assumed to be true until proven false.
	 * 
	 * @return true if the relation is reflexive, returns false otherwise.
	 */
	public boolean isReflexive(){
		Object [] element = originalSet.toArray();
		
		for ( int i = 0; i < element.length; i ++ ){
			if ( !this.contains( new OrderedPair<String>( element[i].toString(), element[i].toString()  ) ) ){
				return false;
			}
		}
		return true;
	}
	
	/**
	 * Assumed to be true until proven false.
	 * 
	 * @return true if the relation is symmetric, returns false otherwise.
	 */
	public boolean isSymmetric(){
		boolean result = true;
		OrderedPair<String> op;
		OrderedPair<String> testSym;
		Iterator<OrderedPair<String>> it = relation.iterator();
		
		while ( it.hasNext() ){
			op = it.next();
			testSym = new OrderedPair<String>( op.getSecondElement(), op.getFirstElement() );
			if ( !this.contains( testSym ) ){
				result = false;
				break;
			}
		}
		
		return result;
	}
	
	/**
	 * Assumed to be true until proven false.
	 * 
	 * @return true if the relation is transitive, returns false otherwise.
	 */
	public boolean isTransitive(){
		boolean result = true; 
		OrderedPair<String> testTran;
		OrderedPair<String> [] elements = this.toArray();
		
		for ( int i = 0; i < elements.length; i ++ ){
			for (int e = 0; e < elements.length; e ++ ){
				// Take the ordered pairs, compare the second element of one to the first element of the second one. Then see if the transitive element
				// is in the set.
				// e.g. if (x, y) and (y, z) are the two elements, see if y.equals(y)
				// if true, check to see if (x, z) is in the set.
				if ( ((OrderedPair<String>) elements[i]).getSecondElement().equals( ((OrderedPair<String>) elements[e]).getFirstElement() ) ){
					testTran = new OrderedPair<String> ( ((OrderedPair<String>) elements[i]).getFirstElement(), 
														((OrderedPair<String>) elements[e]).getSecondElement() );
					
					if ( !this.contains( testTran ) ){
						result = false;
						break;
					}
					
				}
			}
		}
		
		return result;
	}
	
	/**
	 * 
	 * @param op
	 * @return true if OrderedPair op is in the relation. False otherwise.
	 */
	public boolean contains(OrderedPair<String> op ){
		// Because relation.contains( op ) didn't work, we used the brute force method.
		
		boolean result = false;
		Iterator<OrderedPair<String>> it = relation.iterator();
		
		while (it.hasNext()){
			if ( it.next().equals(op) ){
				result = true;
				break;
			}
		}
		return result;
	}
	
	/**
	 * 
	 * @param br
	 * @return true if this BinaryRelation is a subset of the given BinaryRelation br.
	 */
	public boolean subsetOf(BinaryRelation br){
		boolean result = true;
		
		Iterator<OrderedPair<String>> it = relation.iterator();
		
		while( it.hasNext() ){
			if ( !br.contains( it.next() ) ){
				result = false;
				break;
			}
		}
		
		return result;
	}
	
	/**
	 * 
	 * @return the number of OrderedPair<String> contained in the relation.
	 */
	public int numElements(){
		return relation.size();
	}

	/**
	 * 
	 * @return an array of Objects that contains all the OrderedPair<String> of this BinaryRelation.
	 */
	public OrderedPair<String> [] toArray(){
		int counter = 0;
		OrderedPair<String>[] list = new OrderedPair[this.numElements()];
		Iterator<OrderedPair<String>> it = relation.iterator();
		
		while ( it.hasNext() ){
			list[counter] = it.next();
			counter ++;
		}
		
		return list;
	}
	
	/**
	 * @return A string that prints all of the relations in the BinaryRelation
	 * e.g. The MathematicalSet {x, y, z} would return a binary relation something like:
	 * {(x, x), (x, y), (x, z), (y, x), (y, y), (y, z), (z, x), (z, y), (z, z)} 
	 */
	public String toString(){
		String list = "{";
		
		Iterator<OrderedPair<String>> it = relation.iterator();
		
		// If the set is not empty
		if ( it.hasNext() ){
			list += it.next().toString();
		
			while ( it.hasNext() ){
				list += ", " + it.next().toString();
			}
		} else {
			list += "empty set";
		}
		list += "}";

		return list;
	}
}
