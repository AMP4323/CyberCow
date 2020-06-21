import React, {Component} from 'react';
import Textbox from '../components/Textbox/Textbox';
import Button from '../components/Button/Button';
import Message from '../containers/Details/Message/Message';
import classes from './Input.css';
import Report from './Report/Report';
import Guage from 'react-svg-gauge';
import axios from 'axios';
import {Route} from 'react-router-dom';

class Input extends Component {
    state = {
        value: '',
        exportedMsg: '',
        displayMsg: false,
        severity: 0,
        label: '',
        guageVal: 0
    };

    changeHandler = (event) => {
        this.setState({value: event.target.value});
    };

    btnClicked = () => {
        const value = this.state.value;
        const body = {
            "text": value
        };
        axios.post('http://172.22.29.86:5000/model', body).then(response => {
            const data = JSON.parse(response.data);
            const confidence = data.confidence * 100;
            const updatedGuageVal = Math.trunc(confidence);
            console.log(confidence);
            this.setState({severity: confidence, label: data.label, guageVal: updatedGuageVal});
            console.log(this.state.severity);

        });
        this.setState({exportedMsg: value});
    };

    render() {

        let guage;
        const switchModeVal = <a href="/second_mode">Switch Mode</a>
        if (this.state.exportedMsg !== '')
            guage = <Guage label="Confidence Meter" min={0} max={100} value={this.state.guageVal} width={300}
                           height={300}
                           valueFormatter={value => {
                               if(value>80){
                                   return '😣'
                               }
                               if(value>20)
                                   return '😒'
                               return '😁'
                           }}
                           backgroundColor='#ffc04c'
                           topLabelStyle={{color: '#ffc04c'}}
                           minMaxLabelStyle={{color: '#ffc04c'}}
            />;
        else
            guage = null;
        return (
            <div className={classes.Parent}>
                <div className={classes.Input}>
                    <Textbox value={this.state.value} onChange={this.changeHandler}/>
                    <div className={classes.InputControls}>
                        <Button value="Check" onClicked={this.btnClicked}/>
                        <Report text={this.state.exportedMsg}/>
                        {/*<Button value={switchModeVal }/>*/}
                    </div>


                </div>

                <div className={classes.Details}>
                    <Message severity={this.state.severity} message={this.state.exportedMsg} label={this.state.label}/>
                    {guage}
                </div>
            </div>


        );
    }
}

export default Input;