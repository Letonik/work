export const convertDateFormat = (
	dateDb: string,
	full: boolean = false
): string => {
	const date = new Date(dateDb);

	const day = date.getDate().toString().padStart(2, "0");
	const month = (date.getMonth() + 1).toString().padStart(2, "0");

	const year = date.getFullYear().toString();

	return `${day}.${month}.${full ? year : year.slice(-2)}`;
};
