import { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useLocalStorage = (key: string) => {
	const [boot, setBoot] = useState<any>([]);

	useEffect(() => {
		const storedBoot = localStorage.getItem(`${key}`);
		if (storedBoot !== null) {
			setBoot(JSON.parse(storedBoot));
		}
	}, []);

	return boot;
};
