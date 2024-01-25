// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/server/db";
import { requiredFieldsReq } from "@/server/middleware/requiredFieldsReq";
import { TypesReqParams } from "@/server/types/types";

// getOneVacancy

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const GET = async (req: NextRequest) => {
	try {
		const checkParams = requiredFieldsReq(req, TypesReqParams.query, ["_id"]);
		if (checkParams.length) {
			return NextResponse.json(
				{ error: true, errorMessage: checkParams },
				{ status: 412 }
			);
		}

		await dbConnect();

		const _id = searchParams.get("_id") as string;

		const dataRes = await VacancyModels.findOne({ _id });

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
