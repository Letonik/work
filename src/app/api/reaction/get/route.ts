// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/server/db";
import ReactionModel from "@/server/models/reactionModel";
import { requiredFieldsReq } from "@/server/middleware/requiredFieldsReq";
import { TypesReqParams } from "@/server/types/types";

// getReactions

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const GET = async (req: NextRequest) => {
	try {
		const checkParams = requiredFieldsReq(req, TypesReqParams.query, ["page"]);
		if (checkParams.length) {
			return NextResponse.json(
				{ error: true, errorMessage: checkParams },
				{ status: 412 }
			);
		}

		await dbConnect();

		const { searchParams } = req.nextUrl;

		const page = searchParams.get("page") as string;
		const status = searchParams.get("status");
		const firstName = searchParams.get("firstName");
		const lastName = searchParams.get("lastName");
		const email = searchParams.get("email");
		const city = searchParams.get("city");
		const vacancy = searchParams.get("vacancy");
		const dateStart = searchParams.get("dateStart");
		const dateEnd = searchParams.get("dateEnd");

		const pageSize = 10;
		// eslint-disable-next-line
		const itemsToSkip = (+page - 1) * pageSize;

		let dataFindReaction = {};
		if (status) dataFindReaction = { ...dataFindReaction, status };
		if (dateStart || dateEnd) {
			const createdAt = {
				$gte: dateStart ? new Date(dateStart) : new Date(0),
				$lte: dateEnd ? new Date(`${dateEnd}T23:59:59.999Z`) : new Date(),
			};
			dataFindReaction = { ...dataFindReaction, createdAt };
		}
		const dataFindOtherModels = {};
		if (firstName) {
			dataFindOtherModels["user.firstName"] = {
				$regex: new RegExp(firstName, "i"),
			};
		}
		if (lastName) {
			dataFindOtherModels["user.lastName"] = {
				$regex: new RegExp(lastName, "i"),
			};
		}
		if (email) {
			dataFindOtherModels["user.email"] = { $regex: new RegExp(email, "i") };
		}
		if (vacancy) {
			dataFindOtherModels["vacancy.name"] = {
				$regex: new RegExp(vacancy, "i"),
			};
		}
		if (city) dataFindOtherModels["vacancy.city"] = city;
		if (age) {
			const twentySevenYearsAgo = new Date();
			twentySevenYearsAgo.setFullYear(twentySevenYearsAgo.getFullYear() - +age);
			dataFindOtherModels["user.birthDay"] = { $gt: twentySevenYearsAgo };
		}

		const reactionAggregate = [
			{
				$match: dataFindReaction,
			},
			{
				$lookup: {
					from: "users",
					localField: "user",
					foreignField: "_id",
					as: "user",
				},
			},
			{ $unwind: "$user" },
			{
				$lookup: {
					from: "vacancies",
					localField: "vacancy",
					foreignField: "_id",
					as: "vacancy",
				},
			},
			{ $unwind: "$vacancy" },
			{
				$match: dataFindOtherModels,
			},
			{
				$project: {
					_id: "$_id",
					firstName: "$user.firstName",
					lastName: "$user.lastName",
					city: "$vacancy.city",
					country: "$vacancy.country",
					name: "$vacancy.name",
					department: "$vacancy.department",
				},
			},
		];
		const reactionList = await ReactionModel.aggregate([
			...reactionAggregate,
			{ $sort: { _id: 1 } },
		]);
		const totalCount = await ReactionModel.aggregate([
			...reactionAggregate,
			{ $count: "total" },
		]);

		return NextResponse.json(
			// eslint-disable-next-line no-bitwise
			{ data: reactionList, count: totalCount[0]?.total | 0 },
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
