import * as React from 'react';
import {Text, View} from 'react-native';
import { List } from 'react-native-paper';

const Accord = (props) => {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Section>
      <List.Accordion
        title={"Waste  " + props.wScore}
        left={props => <List.Icon {...props} />}>
        <View><Text>{props.wDesc}</Text></View>
      </List.Accordion>
      <List.Accordion
        title={"Product  " + props.pScore}
        left={props => <List.Icon {...props} />}>
        <View><Text>{props.pDesc}</Text></View>

      </List.Accordion>
      <List.Accordion
        title={"Community  " + props.cScore}
        left={props => <List.Icon {...props} />}>
        <View><Text>{props.cDesc}</Text></View>
      </List.Accordion>
    </List.Section>
  );
};

export default Accord;