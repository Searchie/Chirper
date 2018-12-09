import React from "react";
import { Link } from "react-router-dom";
import User from "./User";
import Comment from "./Comment";

const Chirp = props => {
  return (
    <div className="border border-info bg-white chirp row" >
      <User avatarUrl={props.avatarUrl} username={props.username} />
      <div className="d-flex flex-column col-9">
        <Comment commentText={props.commentText} />
        <Link to={`/${props.id}/edit`} className="btn btn-outline-info btn-sm" id="edit">
          Edit
        </Link>
      </div>
    </div>
  );
};

export default Chirp;
