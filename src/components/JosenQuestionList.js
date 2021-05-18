import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import AddQuestion from './AddQuestion';
import EditQuestion from './EditQuestion';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { ContactSupportOutlined } from '@material-ui/icons';


function JosenQuestionList() {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [open, setOpen] = useState(false)
   

    useEffect(() => {
        fecthQuestions();
    }, []);

    const openSnackBar = () => {
        setOpen(true);
    }

    const closeSnackBar = () => {
        setOpen(false);
    }


    const SubmitAnswer = () => {
        fetch('https://uskomatonkyselyjuttu.herokuapp.com/api/answers',
            {
              method: 'POST', 
              mode: 'cors',
              body: JSON.stringify(answers),
              headers: { 'Content-type': 'application/json' }

            })
                alert("Form Submitted succesfully");
            
    }

    const onChange = (event) => {
        let newArr = [...answers];
        newArr[event.target.className] = {vastaus:event.target.value,
        question: event.target.name
        };
        setAnswers(newArr);

        console.log(newArr);
    }

    const fecthQuestions = () => {
        fetch('https://uskomatonkyselyjuttu.herokuapp.com/api/questions')
            .then(response => response.json())
            .then(data => setQuestions(data));

    }



    const deleteQuestion = (id) => {
        if (window.confirm('Are you sure?')) {
            fetch('https://uskomatonkyselyjuttu.herokuapp.com/api/questions/' + id, {method: 'DELETE',   headers: { 'Content-type': 'application/json' }})
                .then(response => {
                    if (response.ok) {
                        fecthQuestions();
                        openSnackBar();
                    }

                    else {
                        alert('Could not delete this question!')
                    }
                })
                .catch(err => console.error(err))

        }
    }
    const addQuestion = (newQuestion) => {
        fetch('https://uskomatonkyselyjuttu.herokuapp.com/api/questions',
            {
                method: 'POST',
                body: JSON.stringify(newQuestion),
                headers: { 'Content-type': 'application/json' }
            })
            .then(response => fecthQuestions())
            .catch(err => console.error(err))
    }

    const editQuestion = (editQuestion, id) => {
        fetch('https://uskomatonkyselyjuttu.herokuapp.com/api/questions' + id, {
            method: 'PUT',
            body: JSON.stringify(editQuestion),
            headers: { 'Content-type': 'application/json' }
        })
            .then(_ => fecthQuestions())
            .catch(err => console.error(err))
    }

  

    return (

        <div>
            <h2>Questions!</h2>
            <AddQuestion addQuestion={addQuestion} />
            
            {questions.map((question, index) => {
                return (
                    <div className="mau">
                    <div>
                    {question.question}
                    
                    </div>
                    <div className="kissamau" onChange = {onChange}>
                    <p><input type="radio" value="1" name={question.question} className={index} />1
                    <input type="radio" value="2" name={question.question} className={index} />2
                    <input type="radio" value="3" name={question.question} className={index} />3
                    <input type="radio" value="4" name={question.question} className={index} />4
                    <input type="radio" value="5" name={question.question} className={index} />5</p>

                    <Button onClick={() => deleteQuestion(question.id)}  color="secondary" variant="contained" >DELETE</Button>
                    </div>
                    
                  </div>
                  
                )  
                })}

            <Button onClick={SubmitAnswer} color="inherit" variant="contained" >SUBMIT</Button>
           
            <Snackbar
                open={open}
                message='Question deleted succesfully'
                autoHideDuration={3000}
                onClose={closeSnackBar}
            />
        </div>
    )
}

export default JosenQuestionList;