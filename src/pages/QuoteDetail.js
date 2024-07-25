import React, { useContext, useEffect } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import Comments from "../component/comments/Comments";
import HighlightedQuote from "../component/quotes/HighlightedQuote";
import { QuoteContext } from "../store/quote-context";
import useHttp from "../hooks/use-http";
import { getAllComments } from "../lib/api";

function QuoteDetail() {
  const { sendRequest, data } = useHttp(getAllComments);
  const params = useParams();
  const quoteCtx = useContext(QuoteContext);
  const quote = quoteCtx.quotes.find((q) => q.id === params.quoteId);

  const commentsLoadHandler = () => {
    sendRequest(params.quoteId);
  };

  useEffect(() => {
    quoteCtx.setCommentsData(data || []);
    console.log(data);
  }, [data]);

  if (!quote) {
    return <p>No quote found.</p>;
  }
  return (
    <>
      <HighlightedQuote text={quote.text} author={quote.author} />

      <Routes>
        <Route
          path="/"
          element={
            <div className="centered">
              <Link to={`/quote-detail/${params.quoteId}/comments`}>
                <button onClick={commentsLoadHandler} className="btn--flat">
                  Load Comments
                </button>
              </Link>
            </div>
          }
        />
        <Route path="/comments" element={<Comments />} />
      </Routes>
    </>
  );
}

export default QuoteDetail;
