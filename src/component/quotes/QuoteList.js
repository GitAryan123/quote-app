import { Fragment, useContext } from "react";

import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";
import { useLocation, useNavigate } from "react-router-dom";

import { QuoteContext } from "../../store/quote-context";

const SortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = () => {
  const navigate = useNavigate();
  const loc = useLocation();

  const queryParams = new URLSearchParams(loc.search);

  const isSortingAscending = queryParams.get("sort") === "asc";
  const quoteCtx = useContext(QuoteContext);

  const sortedQuotes = SortQuotes(quoteCtx.quotes, isSortingAscending);

  const sortHandler = () => {
    navigate(`/all-quotes?sort=${isSortingAscending ? "desc" : "asc"}`);
  };
  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={sortHandler}>
          Sort {isSortingAscending ? "Descending" : "Ascending"}
        </button>
      </div>

      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
