import React from 'react';
import { Card, CardTitle } from 'react-md/lib/Cards';
import { DataTable, TableBody, TableRow, TableColumn } from 'react-md/lib/DataTables';

class DataPanel extends React.Component {
  constructor(props) {
    super(props);
    this.formatData = this.formatData.bind(this);
  }

  formatData() {
    const rows = [];
    const labelList = Object.keys(this.props.rows);
    labelList.forEach((label) => {
      this.props.rows[label].forEach((item) => {
        rows.push({
          label,
          item,
        });
      });
    }, this);
    return rows;
  }
  render() {
    const rows = this.formatData();
    return (
      <Card className="md-grid md-cell md-cell--4">
        <CardTitle title={this.props.panelHeader} />
        <DataTable plain >
          <TableBody>
            {
              rows.map(row => (
                <TableRow key={row.label + row.item}>
                  <TableColumn>{row.label}</TableColumn>
                  <TableColumn>{row.item}</TableColumn>
                </TableRow>
              ))
            }
          </TableBody>
        </DataTable>
      </Card>
    );
  }

}

export default DataPanel;
