import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button, ListGroupItem} from "reactstrap";

class TopicRecordAnalysis extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggle: false
        }
    }

    componentDidMount() {
    }

    toggleDetails = () => {
        this.setState({
            toggle: !this.state.toggle
        })
    };

    render() {
        return (
            <div>
                <ListGroupItem key={this.props.topic + "_parent"} id={this.props.topic}>
                    <Button color={this.state.toggle ? "success" : "secondary"} size="sm" onClick={() => this.toggleDetails()} block>{this.props.topic}</Button>
                </ListGroupItem>
            </div>
        )
    }
}

TopicRecordAnalysis.propTypes = {
    topic: PropTypes.string.isRequired
};


export default TopicRecordAnalysis ;