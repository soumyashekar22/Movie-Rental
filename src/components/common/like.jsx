import React from "react";
class Like extends React.Component {
  render() {
    let classes = "fa fa-heart";
    if (!this.props.liked) classes += "-o";
    return (
      <i
        onClick={this.props.onClick}
        className={classes}
        aria-hidden="true"
      ></i>
    );
  }
}

export default Like;
