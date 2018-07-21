import React from "react";
import "./css/Paragraph.css";

class Paragraph extends React.Component {
  render() {
    return <p id="test"> {this.props.children} </p>;
  }
}

export default Paragraph;
