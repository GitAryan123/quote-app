import { createContext, useState } from "react";

export const QuoteContext = createContext({
  quotes: [],
  comments: [],
  setCommentsData: (commentData) => {},
  setQuotesData: (quoteData) => {},
});

const QuoteContextProvider = (props) => {
  const DUMMY_QUOTES = [
    { id: "q1", author: "Aryan", text: "We Seek aknowledgement" },
    { id: "q2", author: "Aryan", text: "We Seek love" },
  ];

  const [quotes, setQuotes] = useState(DUMMY_QUOTES);
  const [comments, setComments] = useState();

  const setQuotesData = (quoteData) => {
    setQuotes((prevQuotes) => [quoteData, ...prevQuotes]);
  };
  const setCommentsData = (commentsData) => {
    setComments(commentsData);
  };
  const quoteContext = { quotes, comments, setCommentsData, setQuotesData };

  return (
    <QuoteContext.Provider value={quoteContext}>
      {props.children}
    </QuoteContext.Provider>
  );
};

export default QuoteContextProvider;
