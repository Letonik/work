import { useSearchParams } from "next/navigation";

export const useInitialValues = (): Record<string, string | null> => {
	const searchParams = useSearchParams();

	const firstName = searchParams.get("firstName")
		? searchParams.get("firstName")
		: "";
	const lastName = searchParams.get("lastName")
		? searchParams.get("lastName")
		: "";
	const age = searchParams.get("age") ? searchParams.get("age") : "";
	const vacancy = searchParams.get("vacancy")
		? searchParams.get("vacancy")
		: "";
	const city = searchParams.get("city") ? searchParams.get("city") : "";
	const phoneNumber = searchParams.get("phoneNumber")
		? searchParams.get("phoneNumber")
		: "";
	const email = searchParams.get("email") ? searchParams.get("email") : "";
	const dateStart = searchParams.get("dateStart");
	const dateEnd = searchParams.get("dateEnd");
	const page = searchParams.get("page");

	return {
		firstName,
		lastName,
		age,
		vacancy,
		city,
		phoneNumber,
		email,
		dateStart,
		dateEnd,
		page,
	};
};
