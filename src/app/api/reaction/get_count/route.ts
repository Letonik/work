import { NextResponse } from "next/server";
import { dbConnect } from "@/server/db";
import ReactionModel from "@/server/models/reactionModel";

// getReactionsCount

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const GET = async () => {
	try {
		await dbConnect();
		const regexApplication = /application/i;
		const regexConsideration = /consideration/i;
		const regexInterview = /interview/i;
		const regexEmployee = /employee/i;

		const all = await ReactionModel.countDocuments();
		const application = await ReactionModel.countDocuments({
			status: regexApplication,
		});
		const consideration = await ReactionModel.countDocuments({
			status: regexConsideration,
		});
		const interview = await ReactionModel.countDocuments({
			status: regexInterview,
		});
		const employee = await ReactionModel.countDocuments({
			status: regexEmployee,
		});
		return NextResponse.json(
			{
				all,
				application,
				consideration,
				interview,
				employee,
			},
			{ status: 200 }
		);
	} catch (error) {
		const { name, message } = error as Error;
		return NextResponse.json(
			{ type: name, errorMessage: message },
			{ status: 400 }
		);
	}
};
