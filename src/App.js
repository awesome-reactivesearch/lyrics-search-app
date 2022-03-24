import React, { useState } from "react";
import { hot } from "react-hot-loader/root";
import LyricsInput from "./components/LyricsInput";
import ToggleButton from "./components/ToggleButton";

import {
  ReactiveBase,
  ReactiveComponent,
  ReactiveList,
} from "@appbaseio/reactivesearch";
const APP_NAME = {
  KNN: "app-store-data-ann",
  TEXT: "app-store-data-text",
};

function App() {
  const [appName, setAppName] = useState(APP_NAME.TEXT);

  return (
    <div className="app-wrapper">
      <ReactiveBase
        app={appName}
        enableAppbase
        url="https://lYFCzg5ga:89fbdf16-216f-44c6-9191-900afaeaa74d@calm-river-nesrtpa-arc.searchbase.io"
      >
        <div className="row">
          <div className="col max-width">
            <ToggleButton
              checked={appName === APP_NAME.TEXT}
              handleChange={(checked) =>
                setAppName(APP_NAME[checked ? "TEXT" : "KNN"])
              }
              labelBefore="KNN"
              labelAfter="TEXT"
            />
            <ReactiveComponent
              dataField={["Name", "Description"]}
              componentId="lyric-input"
            >
              {(data) => {
                return (
                  <LyricsInput {...data} dataField={["Name", "Description"]} />
                );
              }}
            </ReactiveComponent>
          </div>
          <div className="col">
            <ReactiveList
              infiniteScroll
              dataField="Name"
              showResultStats={true}
              componentId="lyric-result"
              pagination={false}
              react={{ and: ["lyric-input"] }}
              renderItem={(item) => {
                return (
                  <div className="lyric-item">
                    <h4>{item.Name}</h4>
                    <p>{item.Description}</p>
                    <div class="popover__content">
                      <p class="popover__message">{item.Description}</p>
                    </div>
                  </div>
                );
              }}
            />
          </div>
        </div>
      </ReactiveBase>
    </div>
  );
}

export default hot(App);