// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { dbConnect } from "@/server/db";
import ReactionModel from "@/server/models/reactionModel";
import { requiredFieldsReq } from "@/server/middleware/requiredFieldsReq";
import { TypesReqParams } from "@/server/types/types";

const { ObjectId } = mongoose.Types;

// getOneReaction

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const GET = async (req: NextRequest) => {
	try {
		const checkParams = requiredFieldsReq(req, TypesReqParams.query, [
			"reactionId",
		]);
		if (checkParams.length) {
			return NextResponse.json(
				{ error: true, errorMessage: checkParams },
				{ status: 412 }
			);
		}

		await dbConnect();

		const { searchParams } = req.nextUrl;

		const reactionId = searchParams.get("reactionId") as string;

		const reactionAggregate = [
			{
				$match: {
					_id: new ObjectId(reactionId),
				},
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
				$project: {
					user: {
						_id: "$user.id",
						firstName: "$user.firstName",
						middleName: "$user.middleName",
						lastName: "$user.lastName",
						email: "$user.email",
						phoneNumber: "$user.phoneNumber",
					},
					vacancy: {
						_id: "$vacancy._id",
						name: "$vacancy.name",
						city: "$vacancy.city",
						country: "$vacancy.country",
						department: "$vacancy.department",
					},
					coverLetter: 1,
					status: 1,
					comments: 1,
					createdAt: 1,
				},
			},
		];
		const reaction = await ReactionModel.aggregate(reactionAggregate);

		return NextResponse.json(
			// eslint-disable-next-line no-bitwise
			reaction.length ? reaction[0] : [],
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
