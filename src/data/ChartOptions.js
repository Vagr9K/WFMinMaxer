const chartOptions = {
  scales: {
    xAxes: [
      {
        ticks: {
          callback(dataLabel, index) {
            if (index % 5 === 0) {
              return dataLabel;
            }

            return '';
          },
        },
      },
    ],
  },

  tooltips: {
    intersect: true,
    mode: 'index',
  },
};
export default chartOptions;
