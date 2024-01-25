import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/server/db";
import ReactionModel from "@/server/models/reactionModel";
import UserModel from "@/server/models/userModel";
import VacancyModel from "@/server/models/vacancyModel";
import { requiredFieldsReq } from "@/server/middleware/requiredFieldsReq";
import { TypesReqParams } from "@/server/types/types";

// createReaction

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const POST = async (req: NextRequest) => {
	try {
		const values = await req.json();
		const checkParams = requiredFieldsReq(
			req,
			TypesReqParams.body,
			["userId", "vacancyId"],
			values
		);
		if (checkParams.length) {
			return NextResponse.json(
				{ error: true, errorMessage: checkParams },
				{ status: 412 }
			);
		}

		await dbConnect();

		const { userId, vacancyId, coverLetter } = values;

		let dataCreate = {
			user: userId,
			vacancy: vacancyId,
			status: "application",
			history: [
				{
					value: "Отклик на вакансию",
					vacancyName: true,
					date: new Date(),
				},
			],
		};

		if (coverLetter) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			dataCreate = { ...dataCreate, coverLetter };
		}

		const createReaction = new ReactionModel(dataCreate);
		const savedReaction = await createReaction.save();

		await UserModel.findByIdAndUpdate(userId, {
			$push: { reactions: savedReaction._id },
		});
		await VacancyModel.findByIdAndUpdate(vacancyId, {
			$push: { reactions: savedReaction._id },
		});

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
