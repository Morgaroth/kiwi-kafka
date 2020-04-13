import React, {Component} from "react";
import {Button, InputGroup, InputGroupAddon, InputGroupText, ListGroup, ListGroupItem} from "reactstrap";
import "../../App.css";
import PropTypes from "prop-types";
import {Typeahead} from "react-bootstrap-typeahead";
import {MdUndo} from "react-icons/md";

class SearchableViewList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            unfilteredList: props.elementList,
            filteredList: props.elementList,
            activeElement: null
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.elementList !== this.props.elementList) {
            this.setState({
                unfilteredList: this.props.elementList,
                filteredList: this.props.elementList
            }, () => this.filterList(this.state.filterWord));
        }
    }

    filterList = (filterWord) => {
        if (filterWord && filterWord.length > 0) {
            this.setState({
                filterWord: filterWord,
                filteredList: this.state.unfilteredList
                    .filter(element => element.toLowerCase().search(filterWord.toLowerCase()) !== -1)
            })
        } else {
            this.setState({
                filterWord: '',
                filteredList: this.state.unfilteredList
            })
        }
    };

    toggleActiveElement = (element) => {
        if (this.state.activeElement) {
            this.setState({
                activeElement: null
            }, this.props.setActiveElement(element))
        } else {
            this.setState({
                activeElement: element
            }, this.props.setActiveElement(element))
        }
    };

    render() {
        return (
            <div>
                <ListGroup style={{display: this.state.activeElement === null ? "" : "none"}}>
                    <ListGroupItem>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Filter:</InputGroupText>
                            </InputGroupAddon>
                            <Typeahead
                                id={"searchList"}
                                onChange={selected => selected && selected[0] ? this.filterList(selected[0]) : ''}
                                onInputChange={i => this.filterList(i || '')}
                                options={this.state.unfilteredList}
                                className={"StretchedInput"}
                                selectHintOnEnter={true}
                            />
                        </InputGroup>
                    </ListGroupItem>
                    {
                        this.state.filteredList.map(element =>
                            (<ListGroupItem key={element + "_parent"} id={element}>
                                    <Button color={this.state.toggle ? "success" : "secondary"} size="sm"
                                            onClick={() => this.toggleActiveElement(element)} block>{element}</Button>
                                </ListGroupItem>
                            )
                        )
                    }
                </ListGroup>
                {
                    this.state.activeElement !== null ?
                        <div>
                            <div className={"Gap"}/>
                            <Button color={this.state.toggle ? "success" : "secondary"} size="sm"
                                    onClick={() => this.toggleActiveElement(null)} block><MdUndo/> Return to List View</Button>
                            <div className={"Gap"}/>
                            {this.props.elementViewProvider(this.state.activeElement)}
                        </div> : null
                }

            </div>
        )
    }
}

SearchableViewList.propTypes = {
    elementList: PropTypes.array.isRequired,
    elementViewProvider: PropTypes.func.isRequired,
    setActiveElement: PropTypes.func.isRequired
};

export default SearchableViewList;