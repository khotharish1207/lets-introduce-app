import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import contactInformation from "./reducer/contactInformation.reducer";
import actionItems from "./reducer/actionItems.reducer";
import pageDesign from "./reducer/pageDesign.reducer";
import images from "./reducer/images.reducer";
import app from "./reducer/app.reducer";
import site from "./reducer/site.reducer";
import feature from "./reducer/feature.reducer";

import rootSaga from "./saga/rootSaga";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    contactInformation,
    actionItems,
    pageDesign,
    images,
    app,
    site,
    feature,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these field paths in all actions
        ignoreActions: true,
        ignoreState: true,
      },
    }).concat(sagaMiddleware),
});

// then run the saga
sagaMiddleware.run(rootSaga);
