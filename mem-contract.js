export async function handle(state, action) {
  const input = action.input;

  if (input.function === "get_quotes") {
    return {
      result: state.quotes,
    };
  }

  if (input.function === "del_quote") {
    const { index } = input;

    ContractAssert(
      index >= 0 && index <= state.quotes.length,
      "ERROR_INVALID_QUOTE_INDEX",
    );
    state.quotes.splice(index, 1);

    return { state };
  }

  if (input.function === "put_quote") {
    const { quote } = input;

    ContractAssert(
      Array.isArray(quote) && quote.length === 2,
      "ERROR_INVALID_QUOTE_FORMAT",
    );

    state.quotes.push(quote);

    return { state };
  }
}
