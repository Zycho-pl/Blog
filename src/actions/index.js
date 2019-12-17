import _ from "lodash";
import jsonPlaceholder from "../apis/jsonPlaceholder";

// thunk pobiera funkcję - nie object - i wysła dalej (w kółko) z arg(dispatch i getState) - dzieki getState mamy dostep i can modify all data in redux store!!  Czekamy na odp. z Api i "RĘCZNIE"!!! wysyłamy  -> dispatch później - jako new Action . Thunk przekazuje dalej wynik zapytania z Api aż przyjdzie odp. - jak nie ma odp. to przekazuje jako funkcję i następny obieg, aż dostanie odp z Api - wtedy zwraca jako obiekt i przekazuje dalej do reducers
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());
  // console.log(getState().posts);
  // const userIds = _.uniq(_.map(getState().posts, "userId"));
  // userIds.forEach(id => dispatch(fetchUser(id)));

  // chain various methods in one chain
  _.chain(getState().posts)
    .map("userId")
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value(); //exsecute chain
};

export const fetchPosts = () => async dispatch => {
  // Musi być Thunk (middleware) - bo: BŁąd - Async&await - babel convert ES2015!!!
  const response = await jsonPlaceholder.get("/posts");
  // response - pobiera all dane, a we need only: .data
  dispatch({ type: "FETCH_POSTS", payload: response.data });
};

export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: "FETCH_USER", payload: response.data });
};

// //-lodash memoize method - used only once per one api call
// export const fetchUser = id => dispatch => _fetchUser(id, dispatch);

// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);

//   dispatch({ type: "FETCH_USER", payload: response.data });
// });
