import React, { useState } from 'react';
import QuestionEntry from './QuestionEntry.jsx';
import QuestionsAndAnswers from "./QuestionsAndAnswers.jsx";

const QuestionList = ({questions, numOfQuestions, searchQuery, productName}) => {

  return (
    <div className="qa-question-list">
      {questions.slice(0, numOfQuestions).filter((question)=>{ return question.question_body.toLowerCase().includes(searchQuery.toLowerCase())}).map((question, index) => (
      <QuestionEntry
        question={question}
        key={index}
        productName={productName}
      />
      ))}
    </div>
  )
}

export default QuestionList


