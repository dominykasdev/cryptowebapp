import React from 'react';
import * as d3 from 'd3';
import { pie } from 'd3';
import { connect } from 'react-redux';
import PieClass from './PieClass';
import { calculateProfit } from '../calculateHolding';

class pieChart extends React.Component {
    render() {
        if (this.props.crypto.length) {
            return (
                <div className="mainContent">
                    <h3>Profits</h3>
                    <PieClass
                        data={this.props.crypto}
                        targetProp={"profit"}
                        width={300}
                        height={300}
                        innerRadius={0}
                        outerRadius={100}
                    />
                    <h3>Invested</h3>
                    <PieClass
                        data={this.props.crypto}
                        targetProp={"invested"}
                        width={300}
                        height={300}
                        innerRadius={0}
                        outerRadius={100}
                    />
                </div>
            )
        } else {
            return (
                <div className="mainContent">Loading...</div>
            )
        }

    }

}

const mapStateToProps = state => {
    return { crypto: state.crypto }
}

export default connect(mapStateToProps, null)(pieChart);