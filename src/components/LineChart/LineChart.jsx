import React from 'react';
import Chart from 'chart.js';
import Card from 'react-md/lib/Cards';

class LineChart extends React.Component {
  componentDidMount() {
    this.appendChart();
  }

  componentWillUpdate() {
    this.chart.destroy();
  }

  componentDidUpdate() {
    this.appendChart();
  }

  appendChart() {
    const ctx = document.getElementById(this.props.chartID);
    this.chart = new Chart(ctx, {
      data: this.props.chartObj.chartData,
      options: this.props.chartOptions,
      type: 'line',
    });
  }

  render() {
    return (
      <Card className="md-grid md-cell md-cell--12">
        <canvas className="chart-canvas" id={this.props.chartID} />
      </Card>
    );
  }

}

export default LineChart;
