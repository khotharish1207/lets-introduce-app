import axios from "axios";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { API_URL } from "../../constants/appConstants";
import { setLoading } from "../reducer/app.reducer";
import { saveSite, getSite } from "../reducer/site.reducer";

function* handler(action) {
  try {
    yield put(setLoading(true));

    const {
      site: { id, endpoint },
      contactInformation,
      pageDesign,
      actionItems,
      images,
      app: { user },
      feature,
    } = yield select((state) => state);

    const getImages = () => {
      return Object.keys(images).map((name) => ({ name, ...images[name] }));
    };

    const config = {
      method: id ? "PATCH" : "POST",
      url: id ? `${API_URL}/site/update/${id}` : `${API_URL}/site/create-new`,
      headers: {
        "x-auth-credential": user?.credential,
      },
      data: {
        contactInformation,
        pageDesign,
        actionItems,
        endpoint,
        images: getImages(),
        feature,
      },
    };

    const { data } = yield call(axios, config);
    if (data?.id) {
      yield put(getSite(data?.id));
    }
    yield put(setLoading(false));
  } catch (e) {
    yield put(setLoading(false));
  }
}

export default function* watcher() {
  yield takeLatest(saveSite, handler);
}
