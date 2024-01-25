import { useState } from "react";
import { useSelector } from "react-redux";
import { getApplicantDataUser } from "@/components/entities/User";
import { ApplicantData } from "@/components/entities/User/model/types/UserSchema";

const reqFields: string[] = [
	"firstName",
	"lastName",
	"middleName",
	"phoneNumber",
	"email",
	"city",
	"birthDay",
	"vacancy",
	"status",
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

	const applicantData = useSelector(getApplicantDataUser);

	const checkErrors: CheckErrors = () => {
		const res: string[] = [];
		reqFields.forEach((item) => {
			if (!applicantData[item as keyof ApplicantData]) {
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
