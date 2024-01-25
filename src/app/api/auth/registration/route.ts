import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/server/db";
import UserModel from "@/server/models/userModel";
import { requiredFieldsReq } from "@/server/middleware/requiredFieldsReq";
import { TypesReqParams } from "@/server/types/types";

// registration

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
				"email",
				"login",
				"birthDay",
				"password",
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

		const newUser = new UserModel({
			email: "letonik@gmail.com",
			password: "121212",
			firstName: "Алексей",
			middleName: "Алексеевич",
			lastName: "Смирнов",
			birthDay: new Date("05/11/2001"),
			phoneNumber: "8(950)900-50-98",
			country: "Россия",
			city: "Санкт-Петербург",
			educationLevel: "бакалавр",
			institutes: [
				{
					educationInstitution: "РГПУ им А. И. Герцена",
					specialization: "Блоггер",
					yearOfEnding: "2021",
				},
			],
			certificate: {
				links: [
					"https://crm.lichishop.com/marketplace/app/100/",
					"https://crm.ishop.com/mare/tre/10008989/",
				],
			},
			experience: "one",
			placesOfWork: [
				{
					companyName: "Компания LICHI",
					position: "Программист",
					yearStart: "2022",
					yearEnd: "",
					description:
						"Задача организации, в особенности же постоянное информационно-пропагандистское обеспечение нашей деятельности представляет собой интересный эксперимент проверки системы обучения кадров, соответствует насущным потребностям. Задача организации, в особенности же постоянный количественный рост и сфера нашей активности позволяет оценить значение существенных финансовых и административных условий. Задача организации, в особенности же постоянное информационно-пропагандистское обеспечение нашей деятельности позволяет выполнять важные задания по разработке новых предложений.",
				},
			],
			isBlackList: false,
			isLike: false,
			comments: [
				{
					author: "Иванов Иван",
					date: new Date("05/11/2022"),
					comment: "Чушпан",
				},
			],
		});
		await newUser.save();

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
