// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/server/db";
import { requiredFieldsReq } from "@/server/middleware/requiredFieldsReq";
import { TypesReqParams } from "@/server/types/types";

// getVacancies

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const GET = async (req: NextRequest) => {
	try {
		const checkParams = requiredFieldsReq(req, TypesReqParams.query, [
			"page",
			"isActive",
		]);
		if (checkParams.length) {
			return NextResponse.json(
				{ error: true, errorMessage: checkParams },
				{ status: 412 }
			);
		}

		await dbConnect();

		const page = searchParams.get("page") as string;
		const isActive = searchParams.get("isActive") as string;
		const name = searchParams.get("name");
		const city = searchParams.get("city");
		const department = searchParams.get("department");
		const dateStart = searchParams.get("dateStart");
		const dateEnd = searchParams.get("dateEnd");

		let dataFind = { isActive };
		if (name) dataFind = { ...dataFind, name: { $regex: name, $options: "i" } };
		if (city) dataFind = { ...dataFind, city };
		if (department) dataFind = { ...dataFind, department };
		if (dateStart || dateEnd) {
			let createAt = {};
			if (dateStart) {
				const startDate = new Date(dateStart);
				startDate.setHours(0, 0, 0, 0);
				createAt = { $gte: startDate };
			}
			if (dateEnd) {
				const endDate = new Date(dateEnd);
				endDate.setHours(0, 0, 0, 0);
				createAt = { ...createAt, $lt: endDate };
			}
			dataFind = { ...dataFind, createAt };
		}
		const pageSize = 10;
		const itemsToSkip = (page - 1) * pageSize;
		const dataRes = await VacancyModels.find(dataFind)
			.limit(10)
			.skip(itemsToSkip);
		const count = await VacancyModels.find(dataFind).count();

		return NextResponse.json(
			// eslint-disable-next-line no-bitwise
			{ count, data: dataRes },
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
