import Layout from "com/layout/layout";
import config from "./config";
import App from "./app";
const { title, description } = config;

export default function Page() {
	return (
		<Layout title={title} description={description}>
			<App />
		</Layout>
	);
}
