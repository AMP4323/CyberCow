import React, {Component} from 'react';
import classes from './Textbox.css';

class Textbox extends Component {




    render() {


        return (
            <textarea
                className={classes.Textbox}
                name="message"
                cols="50" rows="4"
                placeholder="Enter the statement"
                value={this.props.value}
                onChange={this.props.onChange}
            />
        );
    }
}




export default Textbox;