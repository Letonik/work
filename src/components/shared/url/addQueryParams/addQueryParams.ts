import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

export const getQueryParams = (
	params: Record<string, string | number | boolean>
): string => {
	const searchParams = new URLSearchParams();
	Object.entries(params).forEach(([name, value]) => {
		if (value !== undefined) {
			searchParams.set(name, value.toString());
		}
	});
	return `?${searchParams.toString()}`;
};

export const addQueryParams = (
	params: Record<string, string | number | boolean>,
	navigate: AppRouterInstance
): void => {
	navigate.push(getQueryParams(params));
};
