import { useState } from "react";
import { useSelector } from "react-redux";
import {
	getVacancyDataVacancy,
	VacancyDataType,
} from "@/components/entities/Vacancy";

const reqFields: string[] = [
	"name",
	"department",
	"city",
	"country",
	"address",
	"descriptionJson",
];

type CheckErrors = (entries: string[][]) => boolean;
type ResetErrorField = (key: string) => void;
type UseErrorHook = () => {
	checkErrors: CheckErrors;
	errors: string[];
	resetErrorField: ResetErrorField;
};

export const useErrorHook: UseErrorHook = () => {
	const [errors, setErrors] = useState<string[]>([]);

	const vacancyData = useSelector(getVacancyDataVacancy);

	const checkErrors: CheckErrors = () => {
		const res: string[] = [];
		reqFields.forEach((item) => {
			if (!vacancyData[item as keyof VacancyDataType]) {
				res.push(item);
			}
		});
		setErrors(res);
		return !!res.length;
	};

	const resetErrorField: ResetErrorField = (key) => {
		setErrors((prev) => prev.filter((item) => item !== key));
	};

	return { checkErrors, resetErrorField, errors };
};
