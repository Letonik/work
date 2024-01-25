import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/server/db";
import UserModel from "@/server/models/userModel";
import VacancyModel from "@/server/models/vacancyModel";
import ReactionModel from "@/server/models/reactionModel";
import { requiredFieldsReq } from "@/server/middleware/requiredFieldsReq";
import { TypesReqParams } from "@/server/types/types";
import { v4 as uuidv4 } from "uuid";

// addApplicant

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const POST = async (req: NextRequest) => {
	try {
		const values = await req.json();
		const checkParams = requiredFieldsReq(
			req,
			TypesReqParams.body,
			[
				"firstName",
				"lastName",
				"middleName",
				"phoneNumber",
				"email",
				"city",
				"birthDay",
				"status",
			],
			values
		);
		if (checkParams.length) {
			return NextResponse.json(
				{ error: true, errorMessage: checkParams },
				{ status: 412 }
			);
		}

		await dbConnect();

		const {
			firstName,
			lastName,
			middleName,
			phoneNumber,
			email,
			city,
			birthDay,
			vacancy,
			status,
			comment,
		} = values;

		const newUser = new UserModel({
			email,
			password: uuidv4(),
			firstName,
			lastName,
			middleName,
			phoneNumber,
			city,
			birthDay: new Date(birthDay),
			country: "Россия",
			certificate: {
				links: [
					"https://crm.lichishop.com/marketplace/app/100/",
					"https://crm.ishop.com/mare/tre/10008989/",
				],
			},
			isBlackList: false,
			isLike: false,
			isApplicant: true,
			comments: comment
				? [
						{
							author: "Иванов Иван",
							date: new Date(),
							comment,
						},
				  ]
				: [],
		});
		const applicant = await newUser.save();
		const vacancyList = await VacancyModel.find({
			city,
			name: { $regex: vacancy, $options: "i" }, // $options: 'i' - делает поиск регистронезависимым
		});

		const dataCreate = {
			user: applicant._id,
			vacancy: vacancyList[0]._id,
			status,
			history: [
				{
					value: "Отклик на вакансию",
					vacancyName: true,
					date: new Date(),
				},
			],
		};

		const createReaction = new ReactionModel(dataCreate);
		const savedReaction = await createReaction.save();

		await UserModel.findByIdAndUpdate(applicant._id, {
			$push: { reactions: savedReaction._id },
		});
		await VacancyModel.findByIdAndUpdate(vacancyList[0]._id, {
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
