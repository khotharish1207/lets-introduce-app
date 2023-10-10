import { put, takeLatest, call } from "redux-saga/effects";
import axios from "axios";
import { checkAvailability, setSite } from "../reducer/site.reducer";
import { setLoading } from "../reducer/app.reducer";

function* handler({ payload }) {
  try {
    put(setLoading(true));
    const config = {
      method: "GET",
      url: `http://localhost:5000/site/verify-endpoint/${payload}`,
    };

    const { data } = yield call(axios, config);
    //available-to-use

    yield put(
      setSite({
        key: "isValidEndpoint",
        value: data["available-to-use"],
      })
    );
    put(setLoading(false));
  } catch (e) {
    put(setLoading(false));
  }
}

export default function* watcher() {
  yield takeLatest(checkAvailability, handler);
}
