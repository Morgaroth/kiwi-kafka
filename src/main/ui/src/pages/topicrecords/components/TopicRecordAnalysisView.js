import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button} from "reactstrap";

class TopicRecordAnalysisView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggle: false,
            analysed: false
        }
    }

    componentDidMount() {
    }

    analyseTopic = () => {

    };

    render() {
        return (
            <div>
                <h6>Scans through records on the {this.state.topic} topic and provides statistics on count, size, and when timestamps present, provides estimates on rate</h6>

                <div className={"TwoGap"}/>

                <Button color="success" onClick={this.analyseTopic}>Analyse Topic...</Button>
            </div>
        )
    }
}

TopicRecordAnalysisView.propTypes = {
    topic: PropTypes.string.isRequired
};


export default TopicRecordAnalysisView ;