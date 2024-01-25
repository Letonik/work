// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/server/db";
import UserModel from "@/server/models/userModel";
import { requiredFieldsReq } from "@/server/middleware/requiredFieldsReq";
import { TypesReqParams } from "@/server/types/types";

// getUsersList

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

		const page = searchParams.get("page") as string;
		const isBlackList = searchParams.get("isBlackList");
		const isLike = searchParams.get("isLike");
		const firstName = searchParams.get("firstName");
		const lastName = searchParams.get("lastName");
		const email = searchParams.get("email");
		const city = searchParams.get("city");
		const vacancy = searchParams.get("vacancy");
		const dateStart = searchParams.get("dateStart");
		const dateEnd = searchParams.get("dateEnd");
		const age = searchParams.get("age");

		let dataFind = {};
		if (isBlackList) dataFind = { ...dataFind, isBlackList: true };
		if (isLike) dataFind = { ...dataFind, isLike: true };
		if (firstName)
			dataFind = {
				...dataFind,
				firstName: { $regex: firstName, $options: "i" },
			};
		if (lastName)
			dataFind = {
				...dataFind,
				lastName: { $regex: lastName, $options: "i" },
			};
		if (email)
			dataFind = { ...dataFind, email: { $regex: email, $options: "i" } };
		if (age) {
			const yearsAgo = new Date();
			yearsAgo.setFullYear(yearsAgo.getFullYear() - +age);
			dataFind = { ...dataFind, birthDay: { $gt: yearsAgo } };
		}
		if (city) dataFind = { ...dataFind, city };

		const pageSize = 10;
		const itemsToSkip = (+page - 1) * pageSize;

		let dateFindOtherModels = {};
		if (vacancy)
			dateFindOtherModels = {
				...dateFindOtherModels,
				"vacancies.name": {
					$regex: new RegExp(vacancy, "i"), // поиск по точному совпадению без учета регистра
				},
			};
		if (dateStart || dateEnd) {
			dateFindOtherModels = {
				...dateFindOtherModels,
				"reactions.createdAt": {
					$gte: dateStart ? new Date(dateStart) : new Date(0),
					$lte: dateEnd ? new Date(`${dateEnd}T23:59:59.999Z`) : new Date(),
				},
			};
		}

		const userAggregate = [
			{
				$match: dataFind,
			},
			{
				$lookup: {
					from: "reactions",
					localField: "_id",
					foreignField: "user",
					as: "reactions",
				},
			},
			{
				$unwind: {
					path: "$reactions",
					preserveNullAndEmptyArrays: true,
				},
			},
			{
				$lookup: {
					from: "vacancies",
					localField: "reactions.vacancy",
					foreignField: "_id",
					as: "vacancies",
				},
			},
			{
				$match: dateFindOtherModels,
			},
			{
				$group: {
					_id: "$_id",
					firstName: { $first: "$firstName" },
					lastName: { $first: "$lastName" },
					city: { $first: "$city" },
					country: { $first: "$country" },
					reactions: {
						$push: {
							_id: "$reactions._id",
							vacancy: {
								_id: "$reactions.vacancy",
								name: { $arrayElemAt: ["$vacancies.name", 0] },
							},
						},
					},
				},
			},
			{
				$project: {
					_id: 1,
					firstName: 1,
					lastName: 1,
					city: 1,
					country: 1,
					reactions: {
						$filter: {
							input: "$reactions",
							as: "reaction",
							cond: { $ne: ["$$reaction.vacancy", {}] },
						},
					},
				},
			},
		];
		const usersList = await UserModel.aggregate([
			...userAggregate,
			vacancy || dateStart || dateEnd
				? { $sort: { "reactions._id": -1 } }
				: { $sort: { _id: -1 } },
			{ $skip: itemsToSkip },
			{ $limit: pageSize },
		]);
		const totalCount = await UserModel.aggregate([
			...userAggregate,
			{ $count: "total" },
		]);

		return NextResponse.json(
			// eslint-disable-next-line no-bitwise
			{ data: usersList, count: totalCount[0]?.total | 0 },
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
