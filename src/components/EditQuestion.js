import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';


function AddQuestion(props){
    const [open, setOpen] = React.useState(false);
    const [question, setQuestion] = React.useState({
        question: '',
        
    });

    const handleClickOpen = () => {
        setQuestion({
            question: props.question.question,
        });
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const handleSave = () => {
        props.editQuestion(props.link,question);
        setOpen(false);
    };

    const inputChanged = (event) => {
        setQuestion({...question,[event.target.name]: event.target.value})
    }
    return (
        <div>
          <IconButton color="primary" onClick={handleClickOpen}>
            <EditIcon/>
          </IconButton>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit Question</DialogTitle>
            <DialogContent>
              <DialogContentText>
                In this form you can edit a question
              </DialogContentText>
              <TextField
                margin="dense"
                label="Question"
                name='question'
                value={question.question}
                onChange={inputChanged}
                fullWidth

              />
                   </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSave} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}

export default AddQuestion;