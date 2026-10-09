import config from "./config";
import Description from "com/layout/layout";
import App from "./app";

const { title, description } = config;

export default function Page() {
  return (
    <Description title={title} description={description}>
      <App />
    </Description>
  );
}
