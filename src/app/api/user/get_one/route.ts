// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/server/db";
import UserModel from "@/server/models/userModel";
import { requiredFieldsReq } from "@/server/middleware/requiredFieldsReq";
import { TypesReqParams } from "@/server/types/types";
import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;

// getHistoryUser

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const GET = async (req: NextRequest) => {
	try {
		const checkParams = requiredFieldsReq(req, TypesReqParams.query, [
			"userId",
		]);
		if (checkParams.length) {
			return NextResponse.json(
				{ error: true, errorMessage: checkParams },
				{ status: 412 }
			);
		}

		await dbConnect();

		const userId = searchParams.get("page") as string;

		const userAggregate = [
			{
				$match: {
					_id: new ObjectId(userId),
				},
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
				$group: {
					_id: "$_id",
					firstName: { $first: "$firstName" },
					middleName: { $first: "$middleName" },
					lastName: { $first: "$lastName" },
					reactions: {
						$push: {
							_id: "$reactions._id",
							history: "$reactions.history",
							vacancy: {
								_id: "$reactions.vacancy",
								name: { $arrayElemAt: ["$vacancies.name", 0] },
							},
						},
					},
					createdAt: { $first: "$createdAt" },
				},
			},
		];
		const user = await UserModel.aggregate(userAggregate);
		return NextResponse.json(
			// eslint-disable-next-line no-bitwise
			user.length ? user[0] : [],
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
