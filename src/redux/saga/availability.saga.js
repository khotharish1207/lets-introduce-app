import { put, takeLatest, call } from "redux-saga/effects";
import axios from "axios";
import { checkAvailability, setSite } from "../reducer/site.reducer";
import { setLoading } from "../reducer/app.reducer";
import { API_URL } from "../../constants/appConstants";

function* handler({ payload }) {
  try {
    yield put(setLoading(true));
    const config = {
      method: "GET",
      url: `${API_URL}/site/verify-endpoint/${payload}`,
    };

    const { data } = yield call(axios, config);
    //available-to-use

    yield put(
      setSite({
        key: "isValidEndpoint",
        value: data["available-to-use"],
      })
    );
    yield put(setLoading(false));
  } catch (e) {
    yield put(setLoading(false));
  }
}

export default function* watcher() {
  yield takeLatest(checkAvailability, handler);
}
