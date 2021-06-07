import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
 
export default class Comparison extends Component {
  constructor(props) {
    super(props);
    const comparisonData = props.compareData;
    this.state = {
      tableHead: [ '', props.title1, comparisonData.name, 'Explanation'],
      tableData: [
        ['Waste', props.wScore, comparisonData.waste, comparisonData['waste-desc']],
        ['Product', props.pScore, comparisonData.product, comparisonData['product-desc']],
        ['Community', props.cScore, comparisonData.community, comparisonData['community-desc']],
      ]
    }
  }
 
  render() {
    const state = this.state;
    return (
      <View style={styles.container}>
        <Table borderStyle={{borderWidth: 2, borderColor: '#A1C59E'}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={state.tableData} textStyle={styles.text}/>
        </Table>
      </View>
    )
  }
}
 
const styles = StyleSheet.create({
  container: { flex: 1,  backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#C1ECBE' },
  text: { margin: 6 }
});