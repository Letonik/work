export type Tab = {
	name: string;
	route: string;
	icon?: JSX.Element;
	count?: number;
};

export type TabsCollapsed = {
	name: string;
	icon: JSX.Element;
	tabs: Tab[];
};
