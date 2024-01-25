import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/server/db";
import ReactionModel from "@/server/models/reactionModel";
import { requiredFieldsReq } from "@/server/middleware/requiredFieldsReq";
import { TypesReqParams } from "@/server/types/types";

// setStatus

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const PUT = async (req: NextRequest) => {
	try {
		const values = await req.json();
		const checkParams = requiredFieldsReq(
			req,
			TypesReqParams.body,
			["reactionId", "status"],
			values
		);
		if (checkParams.length) {
			return NextResponse.json(
				{ error: true, errorMessage: checkParams },
				{ status: 412 }
			);
		}

		await dbConnect();

		const { reactionId, status } = values;
		await ReactionModel.updateOne({ _id: reactionId }, { $set: { status } });
		await ReactionModel.updateOne(
			{ _id: reactionId },
			{
				$push: {
					history: {
						value: "Перевод в статус",
						status,
						date: new Date(),
					},
				},
			}
		);
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
