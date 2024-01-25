import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/server/db";
import VacancyModels from "@/server/models/vacancyModel";
import { requiredFieldsReq } from "@/server/middleware/requiredFieldsReq";
import { TypesReqParams } from "@/server/types/types";

// setToArchive

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const PUT = async (req: NextRequest) => {
	try {
		const values = await req.json();
		const checkParams = requiredFieldsReq(
			req,
			TypesReqParams.body,
			["_id"],
			values
		);
		if (checkParams.length) {
			return NextResponse.json(
				{ error: true, errorMessage: checkParams },
				{ status: 412 }
			);
		}

		await dbConnect();

		const { _id } = values;
		await VacancyModels.updateOne({ _id }, { $set: { isActive: true } });
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
