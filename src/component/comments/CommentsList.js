import { useContext } from "react";
import CommentItem from "./CommentItem";
import classes from "./CommentsList.module.css";
import { QuoteContext } from "../../store/quote-context";

const CommentsList = () => {
  const quoteCtx = useContext(QuoteContext);

  return (
    <ul className={classes.comments}>
      {quoteCtx.comments.map((comment) => (
        <CommentItem key={comment.id} text={comment.text} />
      ))}
    </ul>
  );
};

export default CommentsList;
