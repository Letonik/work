import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/server/db";
import VacancyModels from "@/server/models/vacancyModel";
import { requiredFieldsReq } from "@/server/middleware/requiredFieldsReq";
import { TypesReqParams } from "@/server/types/types";

// getVacancyNames

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const GET = async (req: NextRequest) => {
	try {
		const { searchParams } = req.nextUrl;

		const name = searchParams.get("page") || "";
		const city = searchParams.get("city");

		await dbConnect();
		let filter: {
			name: { $regex: RegExp };
			city?: { $regex: RegExp };
		} = {
			name: { $regex: new RegExp(name, "i") },
		};

		if (city) {
			filter = { ...filter, city: { $regex: new RegExp(city, "i") } };
		}

		const dataRes = await VacancyModels.find(filter, { name: 1, _id: 0 })
			.collation({ locale: "simple", strength: 1 }) // Учитываем сортировку без учета регистра
			.limit(10)
			.distinct("name");
		return NextResponse.json(
			// eslint-disable-next-line no-bitwise
			dataRes,
			{
				status: 200,
			}
		);
	} catch (error) {
		const { name, message } = error as Error;
		return NextResponse.json(
			{ type: name, errorMessage: message },
			{ status: 400 }
		);
	}
};
