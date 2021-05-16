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
import { Checkbox } from '@material-ui/core';


function Questionlist() {
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


    const fecthQuestions = () => {
        fetch('http://localhost:8080/api/questions')
            .then(response => response.json())
            .then(data => setQuestions(data))
            .catch(err => console.err(err))
    }

    const fetchAnswers = () => {
        fetch('http://localhost:8080/api/answers')
        .then(response => response.json())
            .then(data => setAnswers(data))
            .catch(err => console.err(err))
    }

    const deleteQuestion = () => {
        if (window.confirm('Are you sure?')) {
            fetch('http://localhost:8080/api/questions', {method : 'DELETE'})
                .then(response => {
                    if (response.ok) {
                        fecthQuestions();
                        openSnackBar();
                    }
                    else
                        alert('Could not delete this question!')
                })
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
    
    const editQuestion = (url, editQuestion) => {
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(editQuestion),
            headers: { 'Content-type': 'application/json' }
        })
            .then(_ => fecthQuestions())
            .catch(err => console.error(err))
    }


    const columns = [
        { headerName: "Question", field: 'question' },
        { headerName: "Options", field: 'option' },
        {
            headerName: 'Edit',
            field: '_links.self.href',
            width: 100,
            cellRendererFramework: params =>
                <EditQuestion link={params.value} question={params.data} editQuestion={editQuestion} />
        },
        {
            headerName: 'Delete',
            field: '_links.self.href',
            width: 100,
            cellRendererFramework: params =>
                <IconButton color="secondary" onClick={() => deleteQuestion(params.value)}>
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
                    rowData={questions}
                   
                    columnDefs={columns}
                    suppressCellSelection={true}

                />
               
                <Button color="inherit" size="large" variant="outlined">Submit</Button>
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