package org.phillconrad.thing.modules;

import java.io.PrintWriter;
import java.util.Random;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.phillconrad.thing.kernel.*;
import org.phillconrad.thing.support.*;


/**
* AbstractModule that asks a for loop question in
* the multiple choice form.
* @author David Cattan
* @author Phill Conrad
*/
public class Relations extends org.phillconrad.thing.kernel.AbstractModule
{

   /**
   * Returns this class' associated element name.
   */
   public String getAssociatedElementName()
   {
      return "relations";
   }

   /**
   * Receives this class' element and any nested children from
   * TheThing for processing.  
   * 
   *
   */
   public void interpretNode(Node node, PrintWriter xmlOutput, Random random, StringBuffer mckey)
       throws org.phillconrad.thing.kernel.TheThingException
   {


       NodeList children = node.getChildNodes(); // all children	
       Node n;
       double pairProb = 0.5; // Set a default value for the probability.

       for (int i=0; i<children.getLength(); i++) {
		n = children.item(i);   

		//Note: The Node getNodeValue() method returns a String
		//      So to get the pairProb value, we have to use the 
		//      Double valueOf( String s ) method to parse the String
		if (n.getNodeName().toLowerCase().equals("isittransitive")) {
	   		Node pairProbNode = n.getAttributes().getNamedItem("pairProb");
			if ( pairProbNode != null )
				pairProb = Double.valueOf( pairProbNode.getNodeValue() );
			generateIsItTransitive(xmlOutput, pairProb, random, mckey);  
	   
		} else if (n.getNodeName().toLowerCase().equals("isitsymmetric")) {
 			Node pairProbNode = n.getAttributes().getNamedItem("pairProb");
			if ( pairProbNode != null )
				pairProb = Double.valueOf( pairProbNode.getNodeValue() );	
			generateIsItSymmetric(xmlOutput, pairProb, random, mckey);
	
		} else if (n.getNodeName().toLowerCase().equals("isitreflexive")) {
			Node pairProbNode = n.getAttributes().getNamedItem("pairProb");
                        if ( pairProbNode != null )
				pairProb = Double.valueOf( pairProbNode.getNodeValue() );
                        generateIsItReflexive(xmlOutput, pairProb, random, mckey);
	
		} else if (n.getNodeName().toLowerCase().equals("picksymmetric")) {
			Node pairProbNode = n.getAttributes().getNamedItem("pairProb");
			if ( pairProbNode != null )
				pairProb = Double.valueOf( pairProbNode.getNodeValue() );
			generatePickSymmetric(xmlOutput, pairProb, random, mckey);
	
		} else if (n.getNodeName().toLowerCase().equals("picktransitive")) {
                        Node pairProbNode = n.getAttributes().getNamedItem("pairProb");
                        if ( pairProbNode != null )
				pairProb = Double.valueOf( pairProbNode.getNodeValue() );
                        generatePickTransitive(xmlOutput, pairProb, random, mckey);
        
	        } else if (n.getNodeName().toLowerCase().equals("pickreflexive")) {
                        Node pairProbNode = n.getAttributes().getNamedItem("pairProb");
                        if ( pairProbNode != null )
				pairProb = Double.valueOf( pairProbNode.getNodeValue() );
                        generatePickReflexive(xmlOutput, pairProb, random, mckey);
        
		} else if (n.getNodeName().toLowerCase().equals("pickrefsym")) {
                        Node pairProbNode = n.getAttributes().getNamedItem("pairProb");
                        if ( pairProbNode != null )
                                pairProb = Double.valueOf( pairProbNode.getNodeValue() );
                        generatePickRefSym(xmlOutput, pairProb, random, mckey);
		
		} else if (n.getNodeName().toLowerCase().equals("pickreftran")) {
                        Node pairProbNode = n.getAttributes().getNamedItem("pairProb");
                        if ( pairProbNode != null )
                                pairProb = Double.valueOf( pairProbNode.getNodeValue() );
                        generatePickRefTran(xmlOutput, pairProb, random, mckey);

                } else if (n.getNodeName().toLowerCase().equals("picksymtran")) {
                        Node pairProbNode = n.getAttributes().getNamedItem("pairProb");
                        if ( pairProbNode != null )
                                pairProb = Double.valueOf( pairProbNode.getNodeValue() );
                        generatePickSymTran(xmlOutput, pairProb, random, mckey);

                } else if (n.getNodeName().toLowerCase().equals("pickspecific")) {
			Node pairProbNode = n.getAttributes().getNamedItem("pairProb");
			if ( pairProbNode != null )
				pairProb = Double.valueOf( pairProbNode.getNodeValue() );
			generatePickSpecific(xmlOutput, pairProb, random, mckey);
		} else if (n.getNodeName().toLowerCase().equals("pickproperties")) {
			Node pairProbNode = n.getAttributes().getNamedItem("pairProb");
			if ( pairProbNode != null )
				pairProb = Double.valueOf( pairProbNode.getNodeValue() );
			generatePickProperties(xmlOutput, pairProb, random, mckey);
		}


	}
   }

   /**
   * write XML for an order of operations question to the printWriter
   */


    public void generateIsItTransitive(PrintWriter xmlOut, double pairProb, Random random, 
					   StringBuffer mckey) {

	IsItTransitiveQuestion iitq = new IsItTransitiveQuestion(pairProb, random);
	xmlOut.print("<p>Using the set " + iitq.getSet() + 
			" is the following relation transitive?</p>");
	xmlOut.print("<p><code>"  +  iitq.getExpression() +  "</code></p>");


	xmlOut.print("<multipleChoice>");
	
	MultChoiceUtils.generateChoices(xmlOut,
					random,
					iitq.getChoices(),
					iitq.getCorrectAnswer(),
					false, // already shuffled by iitq class
					mckey);


	xmlOut.print("</multipleChoice>");

    }

    public void generateIsItSymmetric(PrintWriter xmlOut, double pairProb, Random random, 
					   StringBuffer mckey) {

	IsItSymmetricQuestion iisq = new IsItSymmetricQuestion(pairProb, random);
	xmlOut.print("<p>Using the set " + iisq.getSet() +
			 " is the following relation symmetric?</p>");
	xmlOut.print("<p><code>"  +  iisq.getExpression() +  "</code></p>");


	xmlOut.print("<multipleChoice>");
	
	MultChoiceUtils.generateChoices(xmlOut,
					random,
					iisq.getChoices(),
					iisq.getCorrectAnswer(),
					false, // already shuffled by iisq class
					mckey);


	xmlOut.print("</multipleChoice>");

    }

    public void generateIsItReflexive(PrintWriter xmlOut, double pairProb, Random random,
                                           StringBuffer mckey) {

        IsItReflexiveQuestion iirq = new IsItReflexiveQuestion(pairProb, random);
	
	xmlOut.print("<p>Using the set " + iirq.getSet() + 
			" is the following set reflexive?</p>");
	xmlOut.print("<p><code>" + iirq.getExpression() + "</code></p>");

        xmlOut.print("<multipleChoice>");

        MultChoiceUtils.generateChoices(xmlOut,
                                        random,
                                        iirq.getChoices(),
                                        iirq.getCorrectAnswer(),
                                        false, // already shuffled by iirq class
                                        mckey);


        xmlOut.print("</multipleChoice>");

    }

    public void generatePickSymmetric(PrintWriter xmlOut, double pairProb, Random random,
                                           StringBuffer mckey) {

        PickSymmetricQuestion psq = new PickSymmetricQuestion(pairProb, random);
	xmlOut.print("<p>Here are a series of relations performed on the set "
			 + psq.getExpression() + ".</p>");
        xmlOut.print("<p>Only one of the relations is symmetric. Which one is it?</p>");


        xmlOut.print("<multipleChoice>");

        MultChoiceUtils.generateChoices(xmlOut,
                                        random,
                                        psq.getChoices(),
                                        psq.getCorrectAnswer(),
                                        true,
                                        mckey);


        xmlOut.print("</multipleChoice>");

    }

    public void generatePickTransitive(PrintWriter xmlOut, double pairProb, Random random,
                                           StringBuffer mckey) {

        PickTransitiveQuestion ptq = new PickTransitiveQuestion(pairProb, random);
	xmlOut.print("<p>Here are a series of relations performed on the set " 
        		 + ptq.getExpression() + ".</p>");
        xmlOut.print("<p>Only one of the relations is transitive. Which one is it?</p>");


        xmlOut.print("<multipleChoice>");

        MultChoiceUtils.generateChoices(xmlOut,
                                        random,
                                        ptq.getChoices(),
                                        ptq.getCorrectAnswer(),
                                        true,
                                        mckey);


        xmlOut.print("</multipleChoice>");

    }

    public void generatePickReflexive(PrintWriter xmlOut, double pairProb, Random random,
                                           StringBuffer mckey) {

        PickReflexiveQuestion prq = new PickReflexiveQuestion(pairProb, random);
	xmlOut.print("<p>Here are a series of relations performed on the set "
			 + prq.getExpression() + ".</p>");
	xmlOut.print("<p>Only one of the relations is reflexive. Which one is it?</p>");	

        xmlOut.print("<multipleChoice>");

        MultChoiceUtils.generateChoices(xmlOut,
                                        random,
                                        prq.getChoices(),
                                        prq.getCorrectAnswer(),
                                        true,
                                        mckey);


        xmlOut.print("</multipleChoice>");

    }

    public void generatePickRefSym(PrintWriter xmlOut, double pairProb, Random random,
					StringBuffer mckey) {

	PickRefSymQuestion prsq = new PickRefSymQuestion(pairProb, random);

	xmlOut.print("<p>Here are a series of relations performed on the set "
        		 + prsq.getExpression() + "</p>");
        xmlOut.print("<p>Only one of the relations is both reflexive and symmetric. Which one is it?</p>");

        xmlOut.print("<multipleChoice>");

        MultChoiceUtils.generateChoices(xmlOut,
                                        random,
                                        prsq.getChoices(),
                                        prsq.getCorrectAnswer(),
                                        true,
                                        mckey);


        xmlOut.print("</multipleChoice>");
    }

    public void generatePickRefTran(PrintWriter xmlOut, double pairProb, Random random,
                                        StringBuffer mckey) {

        PickRefTranQuestion prtq = new PickRefTranQuestion(pairProb, random);

        xmlOut.print("<p>Here are a series of relations performed on the set "
        		+ prtq.getExpression() + ".</p>");
        xmlOut.print("<p>Only one of the relations is both reflexive and transitive. Which one is it?</p>");

        xmlOut.print("<multipleChoice>");

        MultChoiceUtils.generateChoices(xmlOut,
                                        random,
                                        prtq.getChoices(),
                                        prtq.getCorrectAnswer(),
                                        true,
                                        mckey);


        xmlOut.print("</multipleChoice>");
    }


    public void generatePickSymTran(PrintWriter xmlOut, double pairProb, Random random,
                                        StringBuffer mckey) {

        PickRefSymQuestion pstq = new PickRefSymQuestion(pairProb, random);

        xmlOut.print("<p>Here are a series of relations performed on the set "
        		 + pstq.getExpression() + ".</p>");
        xmlOut.print("<p>Only one of the relations is both symmetric and transitive. Which one is it?</p>");

        xmlOut.print("<multipleChoice>");

        MultChoiceUtils.generateChoices(xmlOut,
                                        random,
                                        pstq.getChoices(),
                                        pstq.getCorrectAnswer(),
                                        true,
                                        mckey);


        xmlOut.print("</multipleChoice>");
    }

    public void generatePickSpecific(PrintWriter xmlOut, double pairProb, Random random,
					StringBuffer mckey) {

	PickSpecRelQuestion psrq = new PickSpecRelQuestion(pairProb, random, new char[]{'x', 'x', 'x'});

	xmlOut.print("<p>" + psrq.getExpression() + "</p>");
	xmlOut.print("<multipleChoice>");
	
	MultChoiceUtils.generateChoices(xmlOut,
					random,
					psrq.getChoices(),
					psrq.getCorrectAnswer(),
					true,
					mckey);

	xmlOut.print("</multipleChoice>");
    }

    public void generatePickProperties(PrintWriter xmlOut, double pairProb, Random random,
					StringBuffer mckey) {

	PickPropertiesQuestion ppq = new PickPropertiesQuestion(pairProb, random, new char[]{'x', 'x', 'x'});

	xmlOut.print( "<p>" + ppq.getExpression() + "</p>");
	xmlOut.print("<multipleChoice>");

	MultChoiceUtils.generateChoices(xmlOut,
					random,
					ppq.getChoices(),
					ppq.getCorrectAnswer(),
					true,
					mckey);

	xmlOut.print("</multipleChoice>");
   }

} //class Relations

