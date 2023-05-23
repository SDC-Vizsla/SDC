import React, { useState } from 'react';
import AnswerEntry from './AnswerEntry.jsx';
import AddAnswerModal from "./AddAnswerModal.jsx";


const QuestionEntry = ({question, productName}) => {


  //converts object of answers to an array of answers
  //individual answer objects still have an id property
  var answerObject = question.answers;
  var answers = [];
  for (var key in answerObject) {
    answers.push(answerObject[key]);
  }

  //sorts answers in terms of helpfulness from highest to lowest
  answers = answers.sort((a, b) => b.helpfulness - a.helpfulness);

  //sets default number of answers to display at 2
  const [numOfAnswers, setNumOfAnswers] = useState(2);

  const handleMoreAnswersClick = () => {
    if (!maxAnswersDisplayed) {
      setNumOfAnswers(numOfAnswers + 2);
    }

    if (numOfAnswers >= answers.length - 2) {
      setMaxAnswersDisplayed(true);
    }
  }

  const [maxAnswersDisplayed, setMaxAnswersDisplayed] = useState(false);

  const handleCollapseAnswersClick = () => {
    setNumOfAnswers(0);
    setMaxAnswersDisplayed(false);
  }

  //initializes question helpfulness to value from data
  const [questionHelpfulness, setQuestionHelpfulness] = useState(question.question_helpfulness)
  const [questHelpfulClicked, setQuestHelpfulClicked] = useState(false);

  //increments question helpfulness only once on user click
  const handleHelpfulQuestionClick = () => {
    if (!questHelpfulClicked) {
      setQuestionHelpfulness(questionHelpfulness + 1);
      setQuestHelpfulClicked(true);
    }
  };

  //sets a boolean to show/hide add answer modal
  const [addAnswerModalShow, setAddAnswerModalShow] = useState(false);

  const addAnswerModalClose = () => {
    setAddAnswerModalShow(false)
  }



  return (
    <div>
      <span >
        <hr/>
        <div className="qa-question-entry">
          {'Q: '}
          {question.question_body}
          <div className="qa-question-helpful">
            {' Helpful? '}
            <a onClick={handleHelpfulQuestionClick}>Yes ({questionHelpfulness})</a>
            {' | '}
            <AddAnswerModal open={addAnswerModalShow} onClose={addAnswerModalClose} productName={productName} question={question}/>
            <a onClick={()=>{setAddAnswerModalShow(true)}}>Add Answer</a><br></br>
          </div>
          </div>

          {answers.slice(0, numOfAnswers).map((answer, index) => (
          <AnswerEntry  answer={answer} key={index} />
        ))}
      </span>
      {answers.length ? maxAnswersDisplayed  ? (<a onClick={handleCollapseAnswersClick}>Collapse Answers</a>) : (<a id="qa-seeMoreAnswers" onClick={handleMoreAnswersClick}>See more answers</a>) : null}
    </div>
  )
}

export default QuestionEntry


