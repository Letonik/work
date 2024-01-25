import { Dispatch, SetStateAction } from "react";

type TypeHook = (
	arg: Dispatch<SetStateAction<string>>
) => (val: string) => void;
export const usePhoneNumberInput: TypeHook = (setPhoneNumber) => {
	const changePhoneNumber = (value: string) => {
		// Удаляем все нецифровые символы из введенного значения
		const cleaned = value.replace(/\D/g, "");

		// Форматируем номер телефона в виде +7 (XXX) XXX-XX-XX
		let formattedNumber = "";

		for (let i = 0; i < cleaned.length && i < 11; i += 1) {
			if (i === 0) {
				formattedNumber += `+${cleaned[i]}`;
			} else if (i === 1) {
				formattedNumber += ` (${cleaned[i]}`;
			} else if (i === 4) {
				formattedNumber += `) ${cleaned[i]}`;
			} else if (i === 7 || i === 9) {
				formattedNumber += `-${cleaned[i]}`;
			} else {
				formattedNumber += cleaned[i];
			}
		}

		setPhoneNumber(formattedNumber);
	};

	return changePhoneNumber;
};
