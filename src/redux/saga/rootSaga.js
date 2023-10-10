import { all, fork } from "redux-saga/effects";
import { watchGetUser } from "./user.saga";
import availability from "./availability.saga";
import saveSite from "./saveSite.saga";
import getSite from "./getSite.saga";

const rootSaga = function* () {
  yield all([
    fork(watchGetUser),
    fork(availability),
    fork(saveSite),
    fork(getSite),
    // Other forks
  ]);
};

export default rootSaga;
