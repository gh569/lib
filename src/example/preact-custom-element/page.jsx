import Layout from "com/layout/layout";
import config from "./config";
import Element from "./element";
const { title, description } = config;

export default function Page() {
  return (
    <Layout title={title} description={description}>
      <Element />
    </Layout>
  );
}
