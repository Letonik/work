import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/server/db";
import ReactionModel from "@/server/models/reactionModel";
import { requiredFieldsReq } from "@/server/middleware/requiredFieldsReq";
import { TypesReqParams } from "@/server/types/types";

// addNewComment

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const POST = async (req: NextRequest) => {
	try {
		const values = await req.json();
		const checkParams = requiredFieldsReq(
			req,
			TypesReqParams.body,
			["reactionId", "comment", "token"],
			values
		);
		if (checkParams.length) {
			return NextResponse.json(
				{ error: true, errorMessage: checkParams },
				{ status: 412 }
			);
		}

		await dbConnect();

		const { token, reactionId, comment } = values;
		// eslint-disable-next-line no-warning-comments
		// todo: провести операции над token
		const newComment = {
			author: token,
			date: new Date(), // Устанавливаем текущую дату и время
			comment,
		};
		await ReactionModel.updateOne(
			{ _id: reactionId },
			{ $push: { comments: newComment } }
		);
		const reaction = await ReactionModel.findById(reactionId);
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const sortedComments = reaction.comments.sort((a, b) => b.date - a.date);
		return NextResponse.json(sortedComments[0], {
			status: 200,
		});
	} catch (error) {
		const { name, message } = error as Error;
		return NextResponse.json(
			{ type: name, errorMessage: message },
			{ status: 400 }
		);
	}
};
