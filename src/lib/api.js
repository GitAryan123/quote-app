const LOCAL_DOMAIN = "http://localhost:5000";

export async function getAllQuotes() {
  const response = await fetch(`${LOCAL_DOMAIN}/get-all-quotes`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch quotes.");
  }

  const transformedQuotes = [];

  for (const key in data) {
    const quoteObj = {
      id: key,
      ...data[key],
    };

    transformedQuotes.push(quoteObj);
  }

  return transformedQuotes;
}

export async function addQuote(quoteData) {
  const response = await fetch(`${LOCAL_DOMAIN}/add-quotes`, {
    method: "POST",
    body: JSON.stringify(quoteData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not create quote.");
  }

  return null;
}

export async function addComment(requestData) {
  const response = await fetch(
    `${LOCAL_DOMAIN}/comments/${requestData.quoteId}.json`,
    {
      method: "POST",
      body: JSON.stringify(requestData.commentData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not add comment.");
  }

  return { commentId: data.name };
}

export async function getAllComments(quoteId) {
  const response = await fetch(`${LOCAL_DOMAIN}/comments/${quoteId}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not get comments.");
  }

  const transformedComments = [];
  console.log(data);
  for (const key in data) {
    const commentObj = {
      id: key,
      ...data[key],
    };

    transformedComments.push(commentObj);
  }
  console.log(transformedComments);

  return transformedComments;
}
