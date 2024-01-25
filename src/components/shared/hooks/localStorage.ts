import { useEffect, useState } from "react";
import { encryptedLocalStorage } from "../utils/encryptedLocalStorage";

const decode = (value: string) => {
	return JSON.stringify(value);
};

const encode = (value: string) => {
	return JSON.parse(value);
};

// useLocalStorage hook
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useLocalStorage = (key: string, defaultState: string | null) => {
	const [value, setValue] = useState(
		encode(localStorage.getItem(key) || defaultState || "")
	);

	useEffect(() => {
		localStorage.setItem(key, decode(value));
	}, [value]);

	return [value, setValue];
};

// New encrypted localStorage
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useSecureLocalStorage = (key: string, defaultState: string | null) => {
	const [value, setValue] = useState(
		encode(encryptedLocalStorage.getItem(key) || defaultState || "")
	);

	useEffect(() => {
		encryptedLocalStorage.setItem(key, decode(value));
	}, [value]);

	return [value, setValue];
};

export { useLocalStorage, useSecureLocalStorage };
