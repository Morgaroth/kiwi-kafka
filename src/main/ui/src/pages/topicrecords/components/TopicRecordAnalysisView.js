import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button, Pagination, PaginationItem, PaginationLink, Table} from "reactstrap";
import TopicDensityBar from "./TopicDensityBar";

class TopicRecordAnalysisView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activePartition: 0,
            total: {
                partitions: 3,
                minOffset: 0,
                maxOffset: 2323,
                avgDensity: 0.44,
                totalRecords: 2222,
                uniqueKeys: 232,
                keysPerRecord: 1.5,
            },
            partitions: [
                {
                    number: 0,
                    minOffset: 0,
                    maxOffset: 2323,
                    totalRecords: 2222,
                    avgDensity: 0.11,
                    offsetHeatmap: {
                        rangeLength: 100,
                        ranges: [
                            {width: 10, density: 96, label: "Offsets 0-122 0.96%"},
                            {width: 5, density: 42, label: "Offsets 0-122  0.96%"},
                            {width: 2, density: 13, label: "Offsets 0-122  0.96%"},
                            {width: 4, density: 2, label: "Offsets 0-122  0.96%"},
                            {width: 42, density: 56, label: "Offsets 0-122  0.96%"},
                            {width: 11, density: 99, label: "Offsets 0-122  0.96%"},
                            {width: 3, density: 100, label: "Offsets 0-122  0.96%"},
                            {width: 23, density: 55, label: "Offsets 0-122  0.96%"},
                        ]
                    }
                },
                {
                    number: 1,
                    minOffset: 0,
                    maxOffset: 500,
                    totalRecords: 232,
                    avgDensity: 0.23,
                    offsetHeatmap: {
                        rangeLength: 100,
                        ranges: [
                            {width: 5, density: 96, label: "Offsets 0-122"},
                            {width: 7, density: 13, label: "Offsets 0-122"},
                            {width: 4, density: 2, label: "Offsets 10-122"},
                            {width: 42, density: 56, label: "Offsets 111-222"},
                            {width: 16, density: 99, label: "Offsets 222-333"},
                            {width: 26, density: 100, label: "Offsets 444-500"},
                        ]
                    }
                },
                {
                    number: 2,
                    minOffset: 0,
                    maxOffset: 100,
                    totalRecords: 232,
                    avgDensity: 0.56,
                    offsetHeatmap: {
                        rangeLength: 100,
                        ranges: [
                            {width: 1, density: 96, label: "Offsets 0-122"},
                            {width: 5, density: 42, label: "Offsets 0-122"},
                            {width: 2, density: 13, label: "Offsets 0-122"},
                            {width: 24, density: 2, label: "Offsets 0-122"},
                            {width: 22, density: 56, label: "Offsets 0-122"},
                            {width: 20, density: 99, label: "Offsets 0-122"},
                            {width: 3, density: 100, label: "Offsets 0-122"},
                            {width: 11, density: 55, label: "Offsets 0-122"},
                            {width: 12, density: 55, label: "Offsets 0-122"},
                        ]
                    }
                }
            ]
        }
    }

    componentDidMount() {
    }

    analyseTopic = () => {};

    activePartition = () => this.state.partitions[this.state.activePartition];

    setActivePartition = (value) => this.setState({activePartition: value})

    render() {
        return (
            <div>
                <h6>Scans through records on the {this.state.topic} topic and provides statistics on count, size, and
                    when timestamps present, provides estimates on rate</h6>

                <div className={"TwoGap"}/>

                <Button color="success" onClick={this.analyseTopic}>Analyse Topic...</Button>

                <div className={"TwoGap"}/>

                <h3>Total Topic Metrics</h3>
                <Table>
                    <tbody>
                    <tr>
                        <td><label><b>Min Offset</b></label></td>
                        <td>{this.state.total.minOffset}</td>
                        <td><label><b>Max Offset</b></label></td>
                        <td>{this.state.total.maxOffset}</td>
                    </tr>
                    <tr>
                        <td><label><b>No. of Records</b></label></td>
                        <td>{this.state.total.totalRecords}</td>
                        <td><label><b>Partition Average Density</b></label></td>
                        <td>{this.state.total.avgDensity}</td>
                    </tr>
                    </tbody>
                </Table>

                <div className={"TwoGap"}/>
                <div style={{display: "inline"}}>
                    <Pagination size="lg" aria-label="Choose Partition to inspect">
                        {
                            this.state.partitions.map((_, index) =>
                                (<PaginationItem key={"page" + index}>
                                    <PaginationLink onClick={() => this.setActivePartition(index)}>{index}</PaginationLink>
                                </PaginationItem>)
                            )
                        }
                    </Pagination>
                </div>


                <h4>Partition {this.activePartition().number}</h4>
                <Table>
                    <tbody>
                    <tr>
                        <td><label><b>Min Offset</b></label></td>
                        <td>{this.activePartition().minOffset}</td>
                        <td><label><b>Max Offset</b></label></td>
                        <td>{this.activePartition().maxOffset}</td>
                    </tr>
                    <tr>
                        <td><label><b>No. of Records</b></label></td>
                        <td>{this.activePartition().totalRecords}</td>
                        <td><label><b>Average Record/Offset</b></label></td>
                        <td>{this.activePartition().avgDensity}</td>
                    </tr>
                    </tbody>

                </Table>
                <Table>
                    <tbody>
                    <tr>
                        <td>
                            <label><b>Record/Offset Density Chart </b></label>(Average records per offset, between min/max offset)
                        </td>
                    </tr>
                    <tr>
                        <td><TopicDensityBar data={this.activePartition().offsetHeatmap}
                                             number={this.activePartition().number}
                                             color={"red"}
                                             startBar={this.activePartition().minOffset+""}
                                             stopBar={this.activePartition().maxOffset+""}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label><b>Record/Time Density Chart </b></label> (Record Distribution over time, between min/max offset & timestamp)
                        </td>
                    </tr>
                    <tr>
                        <td><TopicDensityBar data={this.activePartition().offsetHeatmap}
                                             number={this.activePartition().number}
                                             color={"blue"}
                                             startBar={"-3d2h"}
                                             stopBar={"Now"}/>
                        </td>
                    </tr>
                    </tbody>
                </Table>

            </div>
        )
    }
}

TopicRecordAnalysisView.propTypes = {
    topic: PropTypes.string.isRequired
};


export default TopicRecordAnalysisView;