import React from "react";
import { Button, Card, Typography } from "antd";

class Destination extends React.Component {
  state = {
    destinationCity: ""
  };

  render() {
    const { Text } = Typography;
    return (
      <Card className="destination" border={true} style={{ width: 300 }}>
        <h2>Destination City</h2>
        <h4>
          <Text> Los Angeles </Text>
        </h4>
        <p>
          <Button>Change city</Button>
        </p>
      </Card>
    );
  }
}

export default Destination;
