import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import QuoteForm from "../component/quotes/QuoteForm";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";
import { QuoteContext } from "../store/quote-context";

function NewQuote() {
  const { sendRequest } = useHttp(addQuote);
  const navigate = useNavigate();
  const quoteCtx = useContext(QuoteContext);
  const newQuoteHandler = (quoteData) => {
    const id = "q" + (quoteCtx.quotes.length + 1);
    const idAddedQuote = { id, ...quoteData };
    console.log(idAddedQuote);

    sendRequest(idAddedQuote);
    quoteCtx.setQuotesData(idAddedQuote);
    navigate("/all-quotes");
  };
  return <QuoteForm onAddQuote={newQuoteHandler} />;
}

export default NewQuote;
