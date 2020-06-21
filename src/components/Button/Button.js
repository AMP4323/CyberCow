import React, {Component} from 'react';
import classes from './Button.css';
import posed from 'react-pose';



const Btn = posed.button({
    pressable: true,
    hoverable: true,
    init: {
        scale: 1
    },
    hover: {
        scale: 1.1
    },
    press: {
        scale: 0.9
    }
});

class Button extends Component {
    state = {
        hovered: false,
        pressed: false
    };

    render() {
        return (
            <Btn onClick={this.props.onClicked} className={classes.Btn}>
                {this.props.value}
            </Btn>
        );
    }
}

export default Button;