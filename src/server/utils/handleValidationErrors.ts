import { NextApiRequest, NextApiResponse } from "next";
import { validationResult, ValidationError } from "express-validator";

export const handleValidationErrors = (
	req: NextApiRequest,
	res: NextApiResponse,
	next: () => void
	// eslint-disable-next-line consistent-return
): void => {
	const errors: ValidationError[] = validationResult(req).array();
	console.log("vs ssd");
	if (errors.length > 0) {
		return res.status(400).json({ errors });
	}
	next();
};
