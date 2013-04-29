import java.util.ArrayList;
import java.util.Random;

/**
   MakeTests creates QUnit tests for a JavaScript port of Java's
   java.util.Random object.   The test are written to System.out.

   @see java.util.Random


 */

public class MakeTests extends ArrayList<String> {

    public static void main (String [] args) {
	
	MakeTests mt = new MakeTests();

	// TODO: Write code here to add tests.

	String thisTest = 
	    " var r = new Random(new LongBitString(0x123456,0x789ABC));\n";

	Random r = new Random(0x123456789ABCL);
	int expected = r.nextInt();

	thisTest += "equal(" + expected + ",r.nextInt(),'first call to r.nextInt()');";

	mt.add(thisTest);



	writeHeader(mt.size());
	for (String s: mt) {
	    System.out.println(s);
	}
	writeTrailer();

    }

    


    public static void writeHeader(int numTests) {
	System.out.println("test(\"randomTest\"," + numTests + ",function() {");
    }

    public static void writeTrailer() {
	System.out.println("});");
    }

}