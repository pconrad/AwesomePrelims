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
    this.selectNumAnswers = function(numOfAnswers){
        var pos = _.random(0,numOfAnswer-1);
        var arr = this.getIncorrectAnswers(numOfAnswers-1);
        arr.splice(pos,0,this.correctAnswer);
        return [arr,pos];
    }
};
