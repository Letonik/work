import { NextRequest } from "next/server";
import { TypesReqParams } from "@/server/types/types";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const requiredFieldsReq = (
	req: NextRequest,
	type: TypesReqParams,
	keyList: string[],
	values?: Record<string, any>
): Record<string, string>[] => {
	if (type === TypesReqParams.query) {
		const { searchParams } = req.nextUrl;
		return keyList
			.map((item) => {
				if (!searchParams.get(item)) {
					return { [item]: `Поле ${item} обязательное` };
				}
				return null;
			})
			.filter((item) => item !== null) as Record<string, string>[];
	}
	if (type === TypesReqParams.body) {
		return keyList
			.map((item) => {
				if (values && values[item] === undefined) {
					return { [item]: `Поле ${item} обязательное` };
				}
				return null;
			})
			.filter((item) => item !== null) as Record<string, string>[];
	}
	return [];
};

/// const { userId, vacancyId, coverLetter } = await req.json();
