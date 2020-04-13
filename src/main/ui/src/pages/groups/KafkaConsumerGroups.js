import React, {Component} from "react";
import {
    Button,
    Container,
    Spinner
} from "reactstrap";
import {MdRefresh} from "react-icons/md";
import * as ApiService from "../../services/ApiService";
import {toast} from "react-toastify";
import SearchableViewList from "../common/SearchableViewList";
import PropTypes from "prop-types";
import ConsumerGroupDetailsView from "./components/ConsumerGroupDetailsView";

class KafkaConsumerGroups extends Component {

    constructor(props) {
        super(props);

        this.state = {
            groupList: [],
            loading: false,
            activeElement: null
        };
    }

    componentDidMount() {
        this.mounted = true;
        this.loadConsumerGroups();
    }

    componentWillUnmount(){
        this.mounted = false;
    }

    loadConsumerGroups = () => {
        this.setState({
            loading: true
        }, () => {
            ApiService.getConsumerGroups((groups) => {
                if(this.mounted){
                    this.setState({
                        groupList:  groups || [],
                        loading:false
                    }, () => {
                        toast.info("Refreshed consumer group list from server");
                    });
                }
            }, (err) => {
                if(this.mounted){
                    this.setState({
                        loading: false
                    });
                    toast.error(`Could not retrieve consumer group list ${err.message}`)
                }
            });
        });
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
                <h1>Kafka Consumer Groups</h1>
                <div className="mt-lg-4"/>

                {this.state.activeElement === null ?
                    <div>
                        <div className={"TwoGap"}/>

                        <Button color="primary" onClick={this.loadConsumerGroups}>Reload List <MdRefresh/></Button>

                        <div className={"Gap"}/>
                    </div> : null
                }

                {this.state.loading ? <Spinner color="secondary"/> : ''}

                <div className={"Gap"}/>

                <SearchableViewList elementList={this.state.groupList}
                                    elementViewProvider={(group) => <ConsumerGroupDetailsView groupId={group} onDeletion={this.loadConsumerGroups} profiles={this.props.profiles}/>}
                                    setActiveElement={this.setActiveElement}
                />
            </Container>
        );
    }
}

KafkaConsumerGroups.propTypes = {
    profiles: PropTypes.array.isRequired
};


export default KafkaConsumerGroups;