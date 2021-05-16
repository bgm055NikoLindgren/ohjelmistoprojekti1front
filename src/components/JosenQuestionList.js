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


function Questionlist() {
    const [questions, setQuestions] = useState([]); 
    const [answers, setAnswers] = useState([]);
    const [open, setOpen] = useState(false)
    const rowData = [{question: questions, option: answers}]
    const koira = [answers, questions]; 
    useEffect(() => {
        fetchAnswers();
        fecthQuestions();
    }, []);



    const openSnackBar = () => {
        setOpen(true);
    }

    const closeSnackBar = () => {
        setOpen(false);
    }
const SubmitAnswer = () => { if (document.getElementById('kissa').checked) { console.log("KYLLÄ")} 
else {
    console.log("eijau")
}
 if (document.getElementById('kissa2').checked) {console.log("EI")}
 else {
     console.log("jees")
 }
 let uusi = "uusiasdasdad"
   questions[0].vastaus = "koira"
   console.log(questions)
   try { 

    let tulos = fetch('http://localhost:8080/api/questions', {
        method: 'put',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',

        },
        body:{
            uusi
        }
    });
    console.log(tulos)
} catch(e) {
    console.log(e)
}

}

  const fecthQuestions = () => { 
     fetch('http://localhost:8080/api/questions')
       .then(response => response.json())
       .then(data => setQuestions(data));


  
    }
const fetchAnswers = () => {
        fetch('http://localhost:8080/api/answers')
        .then(response => response.json())
            .then(data => setAnswers(data))
            .catch(err => console.err(err))
    }

    const deleteQuestion = (id) => {
        if (window.confirm('Are you sure?')) {
            fetch('http://localhost:8080/api/questions/' + id, {method : 'DELETE'})
                .then(response => {
                    if (response.ok) {
                        fecthQuestions();
                        openSnackBar();
                    }

                    else{
                        alert('Could not delete this question!')
                }})
                .catch(err => console.error(err))

    }
    }
    const addQuestion = (newQuestion) => {
        fetch('http://localhost:8080/api/questions',
            {
                method: 'POST',
                body: JSON.stringify(newQuestion),
                headers: { 'Content-type': 'application/json' }
            })
            .then(response => fecthQuestions())
            .catch(err => console.error(err))
    }

    const editQuestion = (editQuestion) => {
        fetch('http://localhost:8080/api/questions', {
            method: 'PUT',
            body: JSON.stringify(editQuestion),
            headers: { 'Content-type': 'application/json' }
        })
            .then(_ => fecthQuestions())
            .catch(err => console.error(err))
    }
const columns = [
        { headerName: "Question", field: 'question' , width: 350},
        { headerName: "Options", field: 'option' , width: 350},
        {headerName: "Kyllä", field: 'kyllä', width: 80,cellRenderer: params => {
            return <input type='checkbox' id = "kissa"  /> ;
            },},
            {headerName: "Ei", field: 'ei', width: 80, cellRenderer: params => {
                return <input type='checkbox' id = "kissa2"  /> ;
                },}    , 
        {
            headerName: 'Edit',
            field: '_links.self.href',
            width: 150,
            cellRendererFramework: params =>
                <EditQuestion link={params.value} question={params.data} editQuestion={editQuestion} />
        },
        {
            headerName: 'Delete',
            field: '_links.self.href',
            width: 150,
            cellRendererFramework: params =>
                <IconButton color="secondary" onClick={() => deleteQuestion(params.data.id)}>
                    <DeleteIcon />
                </IconButton>
        }

    ]
return (
        <div>
            <h2>Questions!</h2>
            <AddQuestion addQuestion={addQuestion}/>
            <div className="ag-theme-material" style={{ height: 550, width: '80%', margin: 'auto', fontSize: '20px' }}>
                <AgGridReact

                    rowData = {questions}
                    columnDefs={columns}
                    suppressCellSelection={true}

                    />


                <Button onClick = {SubmitAnswer} color="inherit" size="large" variant="outlined">Submit</Button>
            </div>
            <Snackbar
                open={open}
                message='Question deleted succesfully'
                autoHideDuration={3000}
                onClose={closeSnackBar}
            />
        </div>
    )
}

export default Questionlist;