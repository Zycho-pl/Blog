// dział polis - reducer alwayes have arguments: (state - poprzedni, + action - nowa polisa - uaktualnia stan listy polis o action - nowa polisa) - jak brak zmian -> zwraca stan poprzedni - return state
export default (state = [], action) => {
  //   if (action.type === "FETCH_POSTS") {
  //     return action.payload;
  //   }
  //   return state;
  switch (action.type) {
    case "FETCH_POSTS":
      return action.payload;
    default:
      return state;
  }
};
