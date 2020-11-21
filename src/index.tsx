import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

ReactDOM.render(
  <React.StrictMode>
    <meta name="apple-mobile-web-app-capable" content="yes"></meta>
    <meta name="mobile-web-app-capable" content="yes"></meta>
    <link rel="manifest" href="/manifest.webmanifest"></link>
    <link //iPhone splashscreens
      rel="apple-touch-startup-image"
      href="images/splash/iPhone SE - 1.png"
      media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
    ></link>
    <link
      rel="apple-touch-startup-image"
      href="images/splash/iPhone 8 - 1.png"
      media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
    ></link>
    <link
      rel="apple-touch-startup-image"
      href="images/splash/iPhone 8 Plus - 1.png"
      media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
    ></link>
    <link
      rel="apple-touch-startup-image"
      href="images/splash/X - 1.png"
      media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
    ></link>

    <link
      rel="apple-touch-startup-image"
      href="images/splash/iPhone 11 Pro Max - 4.png"
      media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
    ></link>

    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
