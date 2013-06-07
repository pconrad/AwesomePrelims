/**
   Some simple experiments with what happens when
   the "long" datatype overflows in Java

   @author Phill Conrad and Emilie Menard Barnard
   @version 06/07/2013

 */

public class Overflow01 {

    public static void overflow1() {

	long a = 0x8000000000000000L;
	/*       x---x---x---x---  */   
	long b = 0x0000000000000002L;

	/* Without overflow, result should be 10000000000000000L; */
	/*                                     x---x---x---x---   */ 
	/* Except, no such value exists.  What will we get?       */

	long product = a * b;

	System.out.printf("hex a=%x b=%x product=%x\n",a,b,product);
	System.out.printf("dec a=%d b=%d product=%d\n",a,b,product);

    }

    public static void overflow2() {

	long a = 0x4000000000000000L;
	/*       x---x---x---x---  */   
	long b = 0x0000000000000002L;

	/* Without overflow, result should be  8000000000000000L; */
	/*                                     x---x---x---x---   */ 

	long product = a * b;

	System.out.printf("hex a=%x b=%x product=%x\n",a,b,product);
	System.out.printf("dec a=%d b=%d product=%d\n",a,b,product);

    }

    public static void overflow3() {

	long a = 0x4000000000000000L;
	/*       x---x---x---x---  */   
	long b = 0x0000000000000004L;

	/* Without overflow, result should be  1000000000000000L; */
	/*                                     x---x---x---x---   */ 
	/* Except, no such value exists.  What will we get?       */

	long product = a * b;

	System.out.printf("hex a=%x b=%x product=%x\n",a,b,product);
	System.out.printf("dec a=%d b=%d product=%d\n",a,b,product);

    }

    public static void overflow4() {

	long a = 0x4111222244448888L;
	/*       x---x---x---x---  */   
	long b = 0x0000000000000004L;

	/* Without overflow, result should be 10444888911122220L; */
	/*                                     x---x---x---x---   */ 
	/* Except, no such value exists.  What will we get?       */

	long product = a * b;
	long expected = 0x0444888911122220L;

	System.out.printf("hex a=%x b=%x\n",a,b);
	System.out.printf("hex expected=%x\n",expected);
	System.out.printf("hex  product=%x\n",product);

	System.out.printf("dec a=%x b=%x\n",a,b);
	System.out.printf("dec expected=%x\n",expected);
	System.out.printf("dec  product=%x\n",product);


    }

    public static void main(String [] args) {

	overflow1();
	overflow2();
	overflow3();
	overflow4();

    }


}