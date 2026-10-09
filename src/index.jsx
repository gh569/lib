import { render } from "preact";
import App from "./app.jsx";
import { LocationProvider, ErrorBoundary } from "preact-iso";



const Main = () => (
  <LocationProvider>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </LocationProvider>
);

render(<Main />, document.getElementById("app"));