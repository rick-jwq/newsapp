import React, { useEffect } from "react";
import commentBox from "commentbox.io";
interface CommentBoxProps {
  id: string;
}
const CommentBox: React.FC<CommentBoxProps> = props => {
  useEffect(() => {
    commentBox("5729049745817600-proj");

    return () => {
      commentBox("5729049745817600-proj");
    };
  });

  return (
    <div className="commentbox" style={{ marginTop: "2%" }} id={props.id}></div>
  );
};

export default CommentBox;
