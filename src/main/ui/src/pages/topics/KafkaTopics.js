import React, {Component} from "react";
import {
    Button,
    ButtonGroup,
    Container,
    Spinner
} from "reactstrap";
import * as ApiService from "../../services/ApiService";
import {toast} from "react-toastify";
import "../../App.css";
import {MdRefresh} from "react-icons/md";
import CreateTopic from "./components/CreateTopic";
import TopicView from "./components/TopicView";
import SearchableViewList from "../common/SearchableViewList";
import PropTypes from "prop-types";

class KafkaTopics extends Component {

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
                if(this.mounted){
                    this.setState({
                        topicList: topics || [],
                        loading:false
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
                <h1>Kafka Topics</h1>
                <div className="mt-lg-4"/>

                {
                    this.state.activeElement === null ?
                        <div>
                            <ButtonGroup>
                                <Button color="primary" onClick={this.reloadTopics}>Reload List <MdRefresh/></Button>
                                {!this.state.addTopic ? <Button color="success" onClick={() => this.addTopic(true)}>Add Topic +</Button> : ''}
                                {this.state.loading ? <Spinner color="secondary"/> : ''}
                            </ButtonGroup>
                            <div className={"TwoGap"}/>
                            <div className={"Gap"}/>

                            {this.state.addTopic ? <CreateTopic onClose={() => this.addTopic(false)} onCreate={this.reloadTopics} profiles={this.props.profiles}/> : ''}
                            <div className={"Gap"}/>
                        </div>: null


                }

                <SearchableViewList elementList={this.state.topicList}
                                    elementViewProvider={(topic) => <TopicView key={`${topic}_view`} topic={topic} onDeletion={this.reloadTopics} profiles={this.props.profiles}/> }
                                    setActiveElement={this.setActiveElement}
                />
            </Container>
        );
    }
}

KafkaTopics.propTypes = {
    profiles: PropTypes.array.isRequired
};


export default KafkaTopics;