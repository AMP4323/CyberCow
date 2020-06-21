import React, {Component} from 'react';
import Input from './containers/Input';
import Aux from './hoc/Auxilliary';
import classes from './App.css';
import axios from 'axios';
import {BrowserRouter, Route} from 'react-router-dom'



class App extends Component {

    componentDidMount() {
        axios.get('http://172.22.29.86:5000/model').then(response => {
            console.log(response);
        })
    }

    render() {
        return (
            <BrowserRouter>
                <Aux className={classes.Aux}>
                    <div className={classes.App}>
                        <Input className={classes.Input}/>

                    </div>
                </Aux>
                <Route exact path="/second_mode" render={() => {
                    window.location.href = "../../public/hackathon/second_mode.html"}
                }/>
            </BrowserRouter>



        );
    }
}

export default App;
