export function formatDateTime(isoString: string): any {
	const options: any = {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
	};
	const date = new Date(isoString);
	return date.toLocaleDateString("ru-RU", options);
}
