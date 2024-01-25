import { useState } from "react";

type ReturnType = {
	nextStep: () => void;
	prevStep: () => void;
	step: number;
	direction: number;
};

export const useTranslateModal = (): ReturnType => {
	const [[step, direction], setStep] = useState<[number, number]>([0, 0]);

	const paginate = (newDirection: number) => {
		setStep([step + newDirection, newDirection]);
	};

	const nextStep = () => paginate(1);
	const prevStep = () => paginate(-1);

	return {
		nextStep,
		prevStep,
		step,
		direction,
	};
};
