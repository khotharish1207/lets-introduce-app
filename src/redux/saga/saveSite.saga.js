import axios from "axios";
import { call, select, takeLatest, put } from "redux-saga/effects";
import { saveSite } from "../reducer/site.reducer";
import { setLoading } from "../reducer/app.reducer";
import { API_URL } from "../../constants/appConstants";

function* handler(action) {
  try {
    put(setLoading(true));

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
      method: "PATCH",
      url: `${API_URL}/site/update/${id}`,
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

    console.log(data);
    put(setLoading(false));
  } catch (e) {
    put(setLoading(false));
  }
}

export default function* watcher() {
  yield takeLatest(saveSite, handler);
}
