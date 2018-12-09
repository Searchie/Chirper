import React from "react";
import Chirp from "./Chirp";

const ChirpList = props => {
  let listItems = props.items.map(item => {
    return (
      <Chirp
        key={item.id}
        id={item.id}
        avatarUrl={item.avatarUrl}
        username={item.userName}
        commentText={item.text}
      />
    );
  });

  return <React.Fragment>{listItems}</React.Fragment>;
};

export default ChirpList;
