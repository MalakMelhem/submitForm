/**
 * Empty: Form has a disabled “Submit” button.
Typing: Form has an enabled “Submit” button.
Submitting: Form is completely disabled. Spinner is shown.
Success: “Thank you” message is shown instead of a form.
Error: Same as Typing state, but with an extra error message.
 */
import { useState } from 'react';
import './Form.css';
export default function Form() {
  const [status, setStatus] = useState('Typing'); //Typing Submitting Success
  const [answer, setAnswer] = useState(''); //any text or nothing
  const [error, setError] = useState(null);



  function handleTextareaChange(e) {
    setAnswer(e.target.value);
  }


  async function handleFormSubmit(e) {
    e.preventDefault();
    setStatus('Submitting');
    try {
      await submitForm(answer);
      setStatus('Success');
    } catch (err) {
      setStatus('Typing');
      setError(err);
    }
  }
  
function submitForm(answer) {
  // Pretend it's hitting the network.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (answer.toLowerCase() !== "istanbul") {
        reject(new Error('Good guess but a wrong answer. Try again!'));
      } else {
        resolve();
      }
    }, 1500);
  });
}

  if(status==='Success') return <h1 id="success">Thank you!</h1>;

  return (
    <>
      <form id="form" onSubmit={handleFormSubmit}>
        <h2>City quiz</h2>
        <p>What city is located on two continents?</p>
        <textarea id="textarea"value={answer} onChange={handleTextareaChange}></textarea>
        <br />
        <button id="button" disabled={answer.length === 0|| status === 'Submitting'} >Submit</button>
        {status==='Submitting'&& <p id="loading">Loading...</p>}
        {error !== null && <p className="Error"> {error.message} </p>}
      </form>
      
    </>
  );
}