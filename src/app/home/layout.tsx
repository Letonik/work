import { NavigationBar } from "@/components/widgets/client/NavigationBar";
import { MainFooter } from "@/components/widgets/client/MainFooter";

export default function MainLayout({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element {
	return (
		<>
			<NavigationBar />
			{children}
			<MainFooter />
		</>
	);
}
