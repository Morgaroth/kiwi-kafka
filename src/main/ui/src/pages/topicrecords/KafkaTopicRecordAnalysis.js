import React, {Component} from "react";
import {
    Badge,
    Button,
    ButtonGroup,
    Container,
    Spinner
} from "reactstrap";
import * as ApiService from "../../services/ApiService";
import {toast} from "react-toastify";
import "../../App.css";
import {MdRefresh} from "react-icons/md";
import SearchableViewList from "../common/SearchableViewList";
import PropTypes from "prop-types";
import TopicRecordAnalysisView from "./components/TopicRecordAnalysisView";

class KafkaTopicRecordAnalysis extends Component {

    constructor(props) {
        super(props);
        this.state = {
            topicList: [],
            loading: false,
            activeElement: null
        };
    }

    componentDidMount() {
        this.mounted = true;
        this.reloadTopics();
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    reloadTopics = () => {
        this.setState({
            loading: true
        }, () => {
            ApiService.getTopics((topics) => {
                if (this.mounted) {
                    this.setState({
                        topicList: topics || [],
                        loading: false
                    }, () => {
                        toast.info("Refreshed topic list from server");
                    });
                }
            }, (err) => {
                this.setState({
                    loading: false
                });
                toast.error(`Could not retrieve topic list ${err.message}`)
            });
        });
    };

    addTopic = (toggle) => {
        this.setState({
            addTopic: toggle
        })
    };

    setActiveElement = (element) => {
        this.setState({
            activeElement: element
        })
    };

    render() {
        return (
            <Container className={"WideBoi"}>

                <div className="mt-lg-4"/>
                <h4><Badge color="info" pill>Experimental</Badge></h4>
                <h1>Kafka Topic Record Analysis</h1>
                <div className="mt-lg-4"/>
                <div className={"TwoGap"}/>

                {this.state.activeElement === null ?
                    <div>
                        <ButtonGroup>
                            <Button color="primary" onClick={this.reloadTopics}>Reload List <MdRefresh/></Button>
                            {this.state.loading ? <Spinner color="secondary"/> : ''}
                        </ButtonGroup>

                        <div className={"Gap"}/>


                    </div>
                    : null}

                <SearchableViewList elementList={this.state.topicList}
                                    elementViewProvider={(topic) => <TopicRecordAnalysisView
                                        key={`${topic}_record_analysis`} profiles={this.props.profiles}
                                        topic={topic}/>}
                                    setActiveElement={this.setActiveElement}
                />
            </Container>
        );
    }
}

KafkaTopicRecordAnalysis.propTypes = {
    profiles: PropTypes.array.isRequired
};


export default KafkaTopicRecordAnalysis;