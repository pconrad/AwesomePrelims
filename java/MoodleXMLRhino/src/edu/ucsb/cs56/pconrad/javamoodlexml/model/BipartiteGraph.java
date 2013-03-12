package edu.ucsb.cs56.pconrad.javamoodlexml.model;
import java.util.ArrayList;

public class BipartiteGraph {

    private ArrayList<BipartiteGraphEdge> edges;    
    private int numLeft;
    private int numRight;
    private String leftLabels="abcdefghi";
    private String rightLabels="123456789";
    private int width;
    private int height;

    private boolean [][] isEdge;

    private int [] leftOutDegree;
    private int [] rightInDegree;


    /** 
	Return the separation between nodes in the y dimension.
	@param left Is this a left node (true for left, false for right)
     */
    private int ySep(boolean left) {
	return (left ? ( height/(this.numLeft+1) ) : ( height/(this.numRight+ 1)) ); 
    }

    public int getX(boolean left) { 
	return left ? width/4 : (width/4) * 3; 
    }

    public  int getY(boolean left, int label) {
	return (label + 1) * ySep(left); 
    }

    public int getlabelX(boolean left) { 
	return getX(left) + (left ? -20 : 20);
    }

    public  int getlabelY(boolean left, int label) {
	return getY(left, label);
    }


    /**
       Construct a new Bipartite graph, initially with no edges.   The edges are numbered
       from zero through numLeft-1 and 0 through numRight-1.

       @param numLeft number of vertices in left partition
       @param numRight number of vertices in right partition
     */

    public BipartiteGraph(int numLeft, int numRight, int width, int height) {
	if (numLeft > leftLabels.length() || numRight > rightLabels.length())
	    throw new IllegalArgumentException("graph too big!");	
	this.numLeft = numLeft;
	this.numRight = numRight;	
	this.width = width;
	this.height = height;
	edges = new ArrayList<BipartiteGraphEdge>();
	isEdge = new boolean [numLeft][numRight];
	leftOutDegree = new int [numLeft];
	rightInDegree = new int [numRight];
	for (int i=0; i<numLeft; i++)
	    {
		leftOutDegree[i] = 0;
		for (int j=0; j<numRight; j++)
		    isEdge[i][j] = false;
	    }
	for (int j=0; j<numRight; j++)
	    rightInDegree[j]=0;
    }
    

    private class BipartiteGraphEdge {
	
	public int from;
	public int to;
	
	// has access to outer classes numLeft and numRight instance variables
	// and to width and height

	BipartiteGraphEdge(int from, int to) {
	    this.from = from; this.to = to;
	}
	
	public String toString() {

	    int xFrom = getX(true);
	    int yFrom = getY(true, from);
	    int xTo = endX(); // getX(false);
	    int yTo = endY(); // getY(false, to); // endY();

	    return "<path marker-end='url(#triangle)' stroke-width='1' fill='none' stroke='black' " +
		"d='M " + xFrom + " " + yFrom + " L " + xTo + " " + yTo + "' /> ";


	} // BipartiteGraphEdge.toString()

	/** theta of edge in polar coordinates, as vector from left
	    node to right node.

	*/
	public double theta() {
	    double dy = getY(false,to) - getY(true,from);
	    double dx = getX(false) - getX(true);
	    return Math.atan(dy/dx);
	}

	/** radius of edge in polar coordinates, as vector from left
	    node to right node.

	*/

	public double radius() {
	    double dy = getY(false,to) - getY(true,from);
	    double dx = getX(false) - getX(true);	    
	    return Math.sqrt(dx*dx + dy * dy);
	}

	private int arrowOffset = 4;

	public int endX() {
	    // x = r cos theta
	    return (int) ( (radius() - arrowOffset) * Math.cos(theta())) 
		+ getX(true);
	}

	public int endY() {
	    return (int) ( (radius() - arrowOffset) * Math.sin(theta())) 
		+ getY(true,from);
	}

    } // inner class BipartiteGraphEdge



    /**
       Add an edge.    
       @throw IllegalArgumentException if left or right is larger then numLeft-1 or numRight-1
     */
    public void addEdge(int left, int right) {
	edges.add(new BipartiteGraphEdge(left,right));
	isEdge[left][right]=true;
	leftOutDegree[left]++;
	rightInDegree[right]++;
    }

    private String labelsAndNodesSVGCode(boolean left) {
	String result = "";
	for (int i=0; i < this.numLeft; i++) {
	    result += "<circle cx='" + getX(left) +  "' cy='" + getY(left,i) + "'" + 
		" r='1' stroke='black' stroke-width='1' fill='black'/> ";
	    result += "<text " + 
		"x = '" + ( getX(left) + (left? -20 : 20) ) + "' " +
		"y = '" + getY(left,i) + "' " +
		"fill = 'navy' font-size = '10' font-family='sans-serif' >" + 
		(left ? this.leftLabels.charAt(i) : this.rightLabels.charAt(i) ) +
		"</text> ";
	}
	return result;
    }

    private final String triangleDefs = 
	"    <marker id='triangle' " + 
	"      viewBox='0 0 10 10' refX='0' refY='5' " + 
	"      markerUnits='strokeWidth' " + 
	"      markerWidth='4' markerHeight='3' " + 
	"      orient='auto'> " + 
	"      <path d='M 0 0 L 10 5 L 0 10 z' /> " + 
	"    </marker> ";
    
    /**
       Output as an SVG

    */
    public String toString() {
	
	String header = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 " + width + " " + height + "'>";

	String result = header + triangleDefs;

	// Loop through, adding a circle for each of the points on the left
	
	result += labelsAndNodesSVGCode(true);
	result += labelsAndNodesSVGCode(false);

	// Now draw the lines for each of the edges

	for (BipartiteGraphEdge e: edges) {
	    result += " " + e.toString() + " ";
	}
	
	result += "</svg> ";

	return result;

    } // toString

    public boolean isAnEdge(int left, int right) {
	return isEdge[left][right];
    }

    public boolean isAFunction() {
	for (int i=0; i<numLeft; i++) {
	    if (leftOutDegree[i]!=1)
		return false;
	}
	return true;
    }

    public boolean is1to1() {
	if (!isAFunction())
	    return false;
	// its a function
	
	for (int i=0; i<numRight; i++) {
	    if (rightInDegree[i]>1)
		return false;
	}
	return true;
    }

    public boolean isOnto() {
	if (!isAFunction())
	    return false;
	// its a function
	
	for (int i=0; i<numRight; i++) {
	    if (rightInDegree[i]==0)
		return false;
	}
	return true;
    }

    
}