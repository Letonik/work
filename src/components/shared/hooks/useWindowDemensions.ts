import { useEffect, useState } from "react";

type ReturnData = {
	width: number | null;
	height: number | null;
};

export const useWindowDimensions = (): ReturnData => {
	const hasWindow = typeof window !== "undefined";
	const getWindowDimensions = () => {
		const width = hasWindow ? window.innerWidth : null;
		const height = hasWindow ? window.innerHeight : null;
		return {
			width,
			height,
		};
	};
	const [windowDimensions, setWindowDimensions] = useState(
		getWindowDimensions()
	);

	useEffect(() => {
		const handleResize = () => {
			setWindowDimensions(getWindowDimensions);
		};
		if (hasWindow) {
			window.addEventListener("resize", handleResize);
		}

		return () => window.removeEventListener("resize", handleResize);
	}, [hasWindow]);

	return windowDimensions;
};
