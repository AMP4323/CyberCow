import React, {Component} from 'react';
import posed from 'react-pose';
import classes from './Message.css';
import Info from '../Info/Info';
import Aux from '../../../hoc/Auxilliary';

const Backgrnd = posed.div({
   hidden: {
       opacity: 0,
       transition: {duration: 1000}
   } ,
    visible: {
        opacity: 1,
        transition: {duration: 1000}
    }
});

class Message extends Component {
    render() {
        const bk_classes = [];
        bk_classes.push(classes.Background);
        if(this.props.message === '') {
            bk_classes.push(classes.hidden);
        }
        return (
            <Aux>
                <Backgrnd pose={this.props.message !== ''?"visible":"hidden"} className={bk_classes.join(' ')}>
                    <span className={classes.Message}>For: {this.props.message}</span>
                </Backgrnd>
                <Backgrnd pose={this.props.message !== ''?"visible":"hidden"} className={bk_classes.join(' ')}>
                    <Info severity={this.props.severity} label={this.props.label}/>
                </Backgrnd>
            </Aux>



        );
    }
}

export default Message;