import React ,{ Component } from 'react';
import classes from './Info.css';

class Info extends Component {
    render() {
        return (
            <div className={classes.Background}>
                <span className={classes.Info}>Confidence : {this.props.severity}%</span>
                <span className={classes.Info}>Result : {this.props.label}</span>
                {/*<span className={classes.Info}>Remarks: dummy text</span>*/}
            </div>
        );
    }
}

export default Info;