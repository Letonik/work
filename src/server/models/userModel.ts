import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
	{
		password: { type: String, required: true },
		firstName: { type: String, required: true },
		middleName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true },
		birthDay: { type: Date, required: true },
		phoneNumber: String,
		country: String,
		city: String,
		educationLevel: String,
		institutes: [
			{
				type: {
					educationInstitution: String,
					specialization: String,
					yearOfEnding: String,
				},
			},
		],
		certificate: {
			type: {
				links: [String],
				fileLinks: [String],
			},
		},
		experience: String,
		placesOfWork: [
			{
				type: {
					companyName: String,
					position: String,
					yearStart: String,
					yearEnd: String,
					description: String,
				},
			},
		],
		isBlackList: { type: Boolean, required: true },
		isLike: { type: Boolean, required: true },
		isApplicant: { type: Boolean, required: true },
		comments: [
			{
				type: {
					author: { type: String, required: true },
					date: { type: Date, required: true },
					comment: { type: String, required: true },
				},
			},
		],
		reactions: [
			{
				type: Schema.Types.ObjectId,
				ref: "Reactions",
			},
		],
		history: [
			{
				type: Schema.Types.ObjectId,
				ref: "History",
			},
		],
	},
	{ timestamps: true }
);

const User = models.Users ?? model("Users", UserSchema);

export default User;
