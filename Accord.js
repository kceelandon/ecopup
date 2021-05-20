import * as React from 'react';
import Text from 'react-native';
import { List } from 'react-native-paper';

const Accord = () => {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Section>
      <List.Accordion
        title="Waste  10"
        left={props => <List.Icon {...props} />}>
        <List.Item title=" This store uses a lot of single use plastic. 
        This can cause great harm to our oceans. Read about this issue from uw oceanography proff here" />

      </List.Accordion>
      <List.Accordion
        title="Product  10"
        left={props => <List.Icon {...props} />}>
        <List.Item title="This shop sources a lot of material from other countries. Additionally they use a high amount of dairy. Learn how food miles and the dairy industry effect the earth here " />

      </List.Accordion>
      <List.Accordion
        title="Community  30"
        left={props => <List.Icon {...props} />}>
        <List.Item title="This shop has great engagement with the local community and supports local culture " />
      </List.Accordion>
    </List.Section>
  );
};

export default Accord;