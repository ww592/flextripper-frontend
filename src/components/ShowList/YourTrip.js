import React from "react";
import TripList from "../ShowList/TripList";
import { Card, Button } from "antd";

class YourTrip extends React.Component {
  state = {
    places: [
      {
        index: Math.random(),
        place: "",
        endTime: "",
        startTime: ""
      }
    ]
  };
  handleChange = (e) => {
    if (["place", "endTime", "startTime"].includes(e.target.name)) {
      let bookDetails = [...this.state.places];
      bookDetails[e.target.dataset.id][e.target.name] = e.target.value;
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };
  addNewRow = (e) => {
    this.setState((prevState) => ({
      places: [
        ...prevState.places,
        {
          index: Math.random(),
          place: "",
          endTime: "",
          startTime: ""
        }
      ]
    }));
  };

  deteteRow = (index) => {
    this.setState({
      places: this.state.places.filter((s, sindex) => index !== sindex)
    });
  };

  clickOnDelete(record) {
    this.setState({
      places: this.state.places.filter((r) => r !== record)
    });
  }
  render() {
    let { places } = this.state;
    return (
      <div className="content">
        <Card className="yourtrip" bordered={true} style={{ width: 500 }}>
          <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
            <div className="row" style={{ marginTop: 20 }}>
              <div className="col-sm-1" />
              <div className="col-sm-10">
                <h2>Plan Your Trip</h2>
                <div className="container">
                  <div className="row">
                    <TripList
                      add={this.addNewRow}
                      delete={this.clickOnDelete.bind(this)}
                      places={places}
                    />
                  </div>
                </div>
              </div>
              <div className="col-sm-1" />
            </div>
          </form>
          <p>
            <Button>Save Trip</Button>
          </p>
        </Card>
      </div>
    );
  }
}
export default YourTrip;
