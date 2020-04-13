import React, {Component} from "react";
import PropTypes from "prop-types";
import {Alert, Button, ButtonGroup, Label, ListGroup, ListGroupItem, Spinner} from "reactstrap";
import {MdRefresh} from "react-icons/md";
import DeleteTopic from "./DeleteTopic";
import PartitionView from "./PartitionView";
import ConfigurationView from "./ConfigurationView";
import ConsumerView from "./ConsumerView";
import * as ApiService from "../../../services/ApiService";
import {toast} from "react-toastify";

class TopicView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            topicData: {},
            toggle: false,
            viewName: 'partitions',
            deleted: false
        };
    }

    componentDidMount() {
        this.mounted = true;
        this.loadDetails();
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    onDelete = () => {
        this.setState({
            deleted: true
        }, this.props.onDeletion())
    };

    loadDetails = () => {
        ApiService.getTopicInfo(this.props.topic, (details) => {
            if (this.mounted) {
                this.setState({
                    topicData: details,
                    toggle: true,
                    loading: false
                });
                toast.info(`Retrieved details for ${this.props.topic} topic list from server`)
            }
        }, (err) => {
            if (this.mounted) {
                this.setState({
                    loading: false,
                    toggle: true,
                    topicData: {
                        replicaCount: 'Not available',
                        partitionCount: 'Not available',
                        partitions: [],
                        configuration: {}
                    }
                });
                toast.error(`Could not retrieve topic list: ${err.message}`)
            }
        });
    };

    onTopicViewChange = (viewName) => {
        this.setState({
            viewName: viewName
        });
    };

    render() {
        return this.state.deleted ? (<Alert color="warning">Topic has been marked for deletion</Alert>) :
            this.state.loading ? (<Spinner color="secondary"/>) :
            (
                <ListGroup>
                    <ListGroupItem>
                        <Label>Name: </Label><b> {this.props.topic}</b>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Label>Replication Count: </Label><b> {this.state.topicData.replicaCount} </b>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Label>Partitions: </Label><b> {this.state.topicData.partitionCount}</b>
                    </ListGroupItem>
                    <ListGroupItem>
                        <ButtonGroup>
                            <Button color="primary"
                                    onClick={() => this.loadDetails()}>Refresh <MdRefresh/></Button>
                            <DeleteTopic topic={this.props.topic} onComplete={this.onDelete}
                                         profiles={this.props.profiles}/>
                        </ButtonGroup>
                    </ListGroupItem>
                    <ListGroupItem>
                        <div className={"Gap"}/>
                        <ButtonGroup className={"WideBoiGroup"}>

                            <Button
                                onClick={() => this.onTopicViewChange('partitions')}
                                color={this.state.viewName === 'partitions' ? 'success' : 'secondary'}>
                                Partitions
                            </Button>
                            <Button
                                onClick={() => this.onTopicViewChange('configuration')}
                                color={this.state.viewName === 'configuration' ? 'success' : 'secondary'}>
                                Topic Configuration
                            </Button>
                            <Button
                                onClick={() => this.onTopicViewChange('consumers')}
                                color={this.state.viewName === 'consumers' ? 'success' : 'secondary'}>
                                Active Consumer Groups
                            </Button>

                        </ButtonGroup>
                        <div className={"Gap"}/>
                        {
                            this.state.viewName === 'partitions' ?
                                <PartitionView topic={this.props.topic} partitions={this.state.topicData.partitions}/>
                                :
                                this.state.viewName === 'configuration' ?
                                    <ConfigurationView topic={this.props.topic}
                                                       configuration={this.state.topicData.configuration}
                                                       profiles={this.props.profiles}/>
                                    :
                                    <ConsumerView topic={this.props.topic}/>
                        }

                    </ListGroupItem>
                </ListGroup>)
    }
}

TopicView.propTypes = {
    topic: PropTypes.string.isRequired,
    profiles: PropTypes.array,
    onDeletion: PropTypes.func
};

export default TopicView;