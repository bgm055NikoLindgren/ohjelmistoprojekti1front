
import './App.css';
import JosenQuestionList from './components/JosenQuestionList';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import NikonAnswers from './components/NikonAnswers';
import Button from '@material-ui/core/Button';





function App() {

  return (
    <div className="App">
      <main>
        <BrowserRouter>
        <Link to="/"> <Button>Questions</Button> </Link> {''}
        <Link to="/answers"><Button>Answers</Button></Link>
        <Switch>
        <Route path="/" component={JosenQuestionList} exact />
        <Route path="/answers" component={NikonAnswers}/>
        </Switch>
        
        

        </BrowserRouter>
      </main>
    </div>
  
  );
}

export default App;
