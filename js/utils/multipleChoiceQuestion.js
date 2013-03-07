/** Represents a multiple choice question.
    @constructor
    @param {string} questionText The text of the question
    @param {string} correctAnswer The text of the correct answer
    @param {array[string]} incorrectAnswers An array of texts for the incorrectAnswers
    */
function MultipleChoiceQuestion(questionText,correctAnswer,incorrectAnswers){
    /** The question text describing this problem.
     */
    this.questionText = questionText;
    /** The text to the correct answer
     */
    this.correctAnswer = correctAnswer;
    /** An array of text corresponding to incorrect answers
     */
    this.incorrectAnswers = incorrectAnswers;
    /** Method used to selectn answers from the list of incorrect answers, returned in a random order.
     *  If no number is specified, all incorrect answers are returned.
     *  @param {int} [numberOfAnswers] The number of incorrect answers that should be returned.
     *  @returns {array[string]} An array of incorrect answers
     */
    this.getIncorrectAnswers = function(numberOfAnswers){
        if(numberOfAnswers){
            return randFromArray(this.incorrectAnswers,numberOfAnswers);
        } else{
            return this.incorrectAnswers;
        }
    };
    /** Used to select a total number of answers, one of which is correct, the rest of 
     *  which are incorrect. The position of the correct answer among the incorrect answers
     *  is also returned.
     *  @param {int} numOfAnswers The total number of answers requested
     *  @returns {array} An array where the first index is an array of answers, and the second index denotes the correct answer position
     */
    this.selectNumAnswers = function(numOfAnswers){
        var pos = _.random(0,numOfAnswer-1);
        var arr = this.getIncorrectAnswers(numOfAnswers-1);
        arr.splice(pos,0,this.correctAnswer);
        return [arr,pos];
    }
};
