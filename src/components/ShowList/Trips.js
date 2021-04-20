import React from "react";

class Trips extends React.Component {
  constructor(props) {
    super(props);
    // const listItems = this.props;
    this.state = {
      listItems: this.props.listItems
    };
  }

  handleClick = (selectedID) => {
    debugger;

    const listItems = this.props.listItems;

    const newItems = listItems.forEach((item) => {
      if (item.id === selectedID) {
        item.isSelected = true;
      } else {
        item.isSelected = false;
      }
    });
    this.setState({ listItems: newItems });
  };

  render() {
    let listItemContent = this.props.listItems.map((e) => {
      let classList =
        "list-item " +
        (e.isSelected ? "list-item-highlighted" : "list-item-normal");
      return (
        <li
          key={e.id}
          className={classList}
          onClick={() => {
            this.handleClick(e.id);
          }}
        >
          {e.content}
        </li>
      );
    });
    return <ul id="container">{listItemContent}</ul>;
  }
}

export default Trips;
