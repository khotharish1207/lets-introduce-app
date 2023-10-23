import { put, takeLatest, call } from "redux-saga/effects";
import axios from "axios";
import { getUser } from "../reducer/app.reducer";
import { initiatInfo } from "../reducer/contactInformation.reducer";
import { setInitialPageDesign } from "../reducer/pageDesign.reducer";
import { setActionItems } from "../reducer/actionItems.reducer";
import { setImages } from "../reducer/images.reducer";
import { setInitialSite } from "../reducer/site.reducer";
import { setInitialFeatures } from "../reducer/feature.reducer";
import { setLoading } from "../reducer/app.reducer";
import { API_URL } from "../../constants/appConstants";

function* getUserSaga({ payload }) {
  try {
    put(setLoading(true));

    const config = {
      method: "POST",
      url: `${API_URL}/user/find-and-update`,
      data: { ...payload },
    };

    const { data } = yield call(axios, config);

    const { sites = [] } = data;

    if (sites.length) {
      const {
        contactInformation,
        pageDesign,
        actionItems,
        images,
        endpoint,
        id,
        feature,
      } = sites[0];
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
export function* watchGetUser() {
  yield takeLatest(getUser, getUserSaga);
}
