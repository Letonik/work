import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/server/db";
import VacancyModels from "@/server/models/vacancyModel";
import { requiredFieldsReq } from "@/server/middleware/requiredFieldsReq";
import { TypesReqParams } from "@/server/types/types";

// createVacancy

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const POST = async (req: NextRequest) => {
	try {
		const values = await req.json();
		const checkParams = requiredFieldsReq(
			req,
			TypesReqParams.body,
			["name", "department", "country", "city", "address", "descriptionJson"],
			values
		);
		if (checkParams.length) {
			return NextResponse.json(
				{ error: true, errorMessage: checkParams },
				{ status: 412 }
			);
		}

		await dbConnect();

		const location = new VacancyModels({ ...values, isActive: true });
		await location.save();
		return NextResponse.json(
			{ success: true },
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
