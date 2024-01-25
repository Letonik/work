import { Schema, model, models } from "mongoose";

const ReactionSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "Users",
		},
		vacancy: {
			type: Schema.Types.ObjectId,
			ref: "Vacancies",
		},
		coverLetter: String,
		status: { type: String, required: true },
		comments: [
			{
				type: {
					author: { type: String, required: true },
					date: { type: Date, required: true },
					comment: { type: String, required: true },
				},
			},
		],
		history: [
			{
				type: {
					value: { type: String, required: true },
					date: { type: Date, required: true },
					vacancyName: Boolean,
					status: String,
				},
			},
		],
	},
	{ timestamps: true }
);

const Reaction = models.Reactions ?? model("Reactions", ReactionSchema);

export default Reaction;
