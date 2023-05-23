import React, { useState } from 'react';
import QuestionEntry from './QuestionEntry.jsx';

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  color: 'black',
  padding: '50px',
  zIndex: 1000
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
}

const AddAnswerModal = ({open, onClose, question, productName}) => {

  if (!open) {
    return (null);
  }

  const [aaAnswer, setAaAnswer] = useState('');
  const [aaNickname, setAaNickname] = useState('');
  const [aaEmail, setAaEmail] = useState('');


  const aaAnswerChange = (e) => {
    setAaAnswer(e.target.value);
  };

  const aaNicknameChange = (e) => {
    setAaNickname(e.target.value);
  };

  const aaEmailChange = (e) => {
    setAaEmail(e.target.value);
  };

  const handleSubmit = () => {
    if (aaAnswer === '') {
      alert('You must enter the following: answer');
    } else if (aaNickname === '') {
      alert('You must enter the following: nickname');
    } else if (aaEmail === '' || aaEmail.indexOf('@') === -1) {
      alert('You must enter the following: email')
    } else {
      //console.log(answers)
      //TODO handle data submission
      onClose();
    }
  };


  return (
    <div style={OVERLAY_STYLES}>
    <div style={MODAL_STYLES}>
      <form>
        <div className="qa-aam-header">
          <h2>Submit your Answer</h2>
          <h3 >{productName} : {question.question_body}</h3>
        </div>
        <br></br>
        <label>Your Answer*</label>
        <textarea type="text" id="aaAnswer" maxLength="1000" onChange={aaAnswerChange}></textarea>
        <br></br>
        <label>Nickname*</label>
        <input type="text" id="aaNickname" className="qa-aam-nickname" placeholder='Example: jack543!' maxLength="60" onChange={aaNicknameChange}/>
        <small>For privacy reasons, do not use your full name or email address</small><br></br><br></br>
        <label>Email*</label>
        <input type="email" id="aaEmail" maxLength="60" placeholder="jack@email.com" onChange={aaEmailChange}/>
        <small>For authentication reasons, you will not be emailed</small>
        <br></br><br></br>

      </form>
      <input type="file" id="aaMyFile" name="filename" multiple="multiple" accept="image/*" />
      <button>Upload Photos</button><br></br><br></br>
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={onClose}>Exit</button>

    </div>
    </div>
  )
}

export default AddAnswerModal

