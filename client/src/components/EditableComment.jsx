import React from "react";

const Comment = props => {

  return (
    <div contentEditable="true">
      <p>{props.commentText}</p>
    </div>
  );
};

Comment.defaultProps = {
  commentText: 'This is the default value'
};

export default Comment;
