import React, { Component } from 'react';

class PieChart extends Component {
    render(){
        console.log(this.props.percentage);
        return (
            <div>
                <div className="flex-wrapper">
                    <div className="single-chart" style={{width: '50px', height: '50px'}}>
                        <svg viewbox="0 0 1 1" className={this.props.percentage < 80 ? "circular-chart orange" : "circular-chart green"}>
                        <path className="circle-bg"
                            d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path className="circle"
                            strokeDasharray={this.props.percentage + ", 100"}
                            d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <text x="18" y="20.35" className="percentage">{this.props.percentage}</text>
                        </svg>
                    </div>
                </div>
            </div>
        )
    }
}

export default PieChart;
