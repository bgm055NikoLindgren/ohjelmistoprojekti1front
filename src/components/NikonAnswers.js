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


function NikonAnswers() {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [open, setOpen] = useState(false)

    useEffect(() => {
        fecthAnswers();
    }, []);

    const fecthAnswers = () => {
        fetch('https://uskomatonkyselyjuttu.herokuapp.com/api/answers')
            .then(response => response.json())
            .then(data => setAnswers(data));

    }


    return (

        <div>
            <h2>Answers!</h2>

            {answers.map((vastaus, index) => {
                return (
                    <div>
                    {vastaus.question} 
                    <div className="tuloksetnumerot">
                    {vastaus.vastaus}
                    </div>
                    
                  </div>
                )
              })} 
        </div>
    )
}

export default NikonAnswers;