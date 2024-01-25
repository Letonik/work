import { Schema, model, models } from "mongoose";

const VacancySchema = new Schema(
	{
		name: { type: String, required: true },
		isActive: { type: Boolean, required: true },
		department: { type: String, required: true },
		city: { type: String, required: true },
		country: { type: Number, required: true },
		salary: {
			type: {
				min: { type: Number },
				max: { type: Number },
				currency: { type: String },
			},
		},
		address: { type: String, required: true },
		experience: String,
		descriptionJson: { type: Object, required: true },
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
		//  Schema.Types.Mixed
	},
	{ timestamps: true }
);

const Vacancy = models.Vacancies ?? model("Vacancies", VacancySchema);

export default Vacancy;
