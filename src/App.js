import { Navigate, Route, Routes } from "react-router-dom";
import AllQuotes from "./pages/AllQuotes";
import QuoteDetail from "./pages/QuoteDetail";
import NewQuote from "./pages/NewQuote";
import Layout from "./component/layout/Layout";
import NotFound from "./pages/NotFound";
import useHttp from "./hooks/use-http";
import { getAllQuotes } from "./lib/api";
import { QuoteContext } from "./store/quote-context";
import { useContext, useEffect } from "react";
import LoadingSpinner from "./component/UI/LoadingSpinner";

function App() {
  const { sendRequest, status, data } = useHttp(getAllQuotes);

  const quoteCtx = useContext(QuoteContext);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  useEffect(() => {
    if (data) {
      quoteCtx.setQuotesData(data);
    }
  }, [data]);

  return (
    <>
      {status === "completed" && (
        <Layout>
          <Routes>
            <Route path={"/"} element={<Navigate to={"/all-quotes"} />} />
            <Route path={"/all-quotes"} element={<AllQuotes />} />
            <Route
              path={"/quote-detail/:quoteId/*"}
              element={<QuoteDetail />}
            />
            <Route path={"/new-quote"} element={<NewQuote />} />
            <Route path={"*"} element={<NotFound />} />
          </Routes>
        </Layout>
      )}

      {status === "pending" && <LoadingSpinner />}
    </>
  );
}

export default App;
