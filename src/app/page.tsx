import { redirect } from "next/navigation";

export default function Home(): JSX.Element {
	redirect("/home", "replace");
	return <div />;
}
