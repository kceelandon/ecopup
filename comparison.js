import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
 
export default class Comparison extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: [ '', props.title1, 'title 2', 'Explanation'],
      tableData: [
        ['Waste', props.wScore, 'waste 2', 'text'],
        ['Product', props.pScore, 'product 2', 'text'],
        ['Community', props.cScore, 'community 2', 'text'],
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