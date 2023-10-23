import { put, takeLatest, call } from "redux-saga/effects";
import axios from "axios";
import { initiatInfo } from "../reducer/contactInformation.reducer";
import { setInitialPageDesign } from "../reducer/pageDesign.reducer";
import { setActionItems } from "../reducer/actionItems.reducer";
import { setImages } from "../reducer/images.reducer";
import { setInitialSite, getSite } from "../reducer/site.reducer";
import { setInitialFeatures } from "../reducer/feature.reducer";
import { setLoading } from "../reducer/app.reducer";

function* handler({ payload }) {
  try {
    put(setLoading(true));

    const config = {
      method: "GET",
      url: `${process.env.API_URL}/site/find/${payload}`,
    };

    const { data } = yield call(axios, config);

    if (data?.contactInformation) {
      const {
        contactInformation,
        pageDesign,
        actionItems,
        images,
        endpoint,
        id,
        feature,
      } = data;
      yield put(initiatInfo(contactInformation));
      yield put(setInitialPageDesign(pageDesign));
      yield put(setActionItems(actionItems));
      yield put(setImages(images));
      yield put(
        setInitialSite({
          endpoint,
          id,
        })
      );
      yield put(setInitialFeatures(feature));
    }

    console.log("user response", data);
    put(setLoading(false));
  } catch (e) {
    console.log("error", e);
    put(setLoading(false));
  }
}

// Generator function
export default function* watchGetUser() {
  yield takeLatest(getSite, handler);
}
