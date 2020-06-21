import React, {Component} from 'react';
import Button from '../../components/Button/Button';
import classes from './Report.css';
import Aux from '../../hoc/Auxilliary';
import posed from 'react-pose';
import axios from 'axios';

const ReportControls = posed.div({
    visible: {
        height: 85,
        opacity: 1,
        transition: {duration: 400}
    },
    hidden: {
        height: 0,
        opacity: 0,
        transition: {duration: 400}
    }
});

class Report extends Component {

    state = {
        controlsIsVisible: false
    };
    reportOnClicked = () => {
        this.setState({controlsIsVisible: true});
    };
    reportControlOnClicked = (isOffensive) => {
        const data = {
            text: this.props.text,
            correct: isOffensive
        };
        axios.put('http://172.22.29.86:5000/model', data).then(response => {
            console.log(response);
        }).catch(err => console.log(err));
        this.setState({controlsIsVisible: false});

    };

    render() {

        return (
            <div className={classes.ReportDiv}>
                <div className={classes.Report}>
                    <Button onClicked={this.reportOnClicked} value="Report"/>
                </div>
                <ReportControls pose={this.state.controlsIsVisible?"visible":"hidden"} className={classes.ReportControls}>
                    <Button onClicked={() => this.reportControlOnClicked(1)} value="Offensive"/>
                    <Button onClicked={() => this.reportControlOnClicked(0)} value="Non Offensive"/>
                </ReportControls>
            </div>
        );
    }
}

export default Report;