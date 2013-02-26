function MultipleChoiceQuestion(questionText,correctAnswer,incorrectAnswers){
    this.questionText = questionText;
    this.correctAnswer = correctAnswer;
    this.incorrectAnswers = incorrectAnswers;
    this.getIncorrectAnswers = function(numberOfAnswers){
        if(numberOfAnswers){
            return randFromArray(this.incorrectAnswers,numberOfAnswers);
        } else{
            return this.incorrectAnswers;
        }
    };
    this.helloWorld = function(){
        return "Hello world!"
    };
};
