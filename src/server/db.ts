import mongoose, { ConnectOptions } from "mongoose";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const dbConnect = async () => {
	try {
		await mongoose.connect(
			process.env.DB_URL as string,
			{
				useNewUrlParser: true,
			} as ConnectOptions
		);
	} catch (e) {
		// eslint-disable-next-line no-console
		console.log(e);
	}
};
