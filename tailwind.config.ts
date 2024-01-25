/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable func-names */
import type { Config } from "tailwindcss";

import { nextui } from "@nextui-org/react";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			screens: {
				// minMobile: "425px",
				minMobile: "320px",
				minTablet: "768px",
				minPc: "1024px",
				maxMobile: { max: "424px" },
				maxTablet: { max: "767px" },
				maxPc: { max: "1023px" },
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
				arrow: "url('/public/arrow.svg')",
			},
			colors: {
				default50: "#fafafa",
				default100: "#f4f4f5",
				default200: "#e4e4e7",
				default300: "#d4d4d8",
				default400: "#a1a1aa",
				default500: "#71717a",
				default600: "#52525b",
				default650: "#474747",
				default700: "#3f3f46",
				default800: "#27272a",
				default900: "#18181b",

				primary50: "#e6f1fe",
				primary100: "#cce3fd",
				primary200: "#99c7fb",
				primary300: "#66AAF9",
				primary400: "#338ef7",
				primary500: "#006FEE",
				primary600: "#005bc4",
				primary700: "#004493",
				primary800: "#002e62",
				primary900: "#001731",

				secondary50: "#f2eafa",
				secondary100: "#e4d4f4",
				secondary200: "#c9a9e9",
				secondary300: "#ae7ede",
				secondary400: "#9353d3",
				secondary500: "#7828c8",
				secondary600: "#6020a0",
				secondary700: "#481878",
				secondary800: "#301050",
				secondary900: "#180828",

				success50: "#e8faf0",
				success100: "#d1f4e0",
				success200: "#a2e9c1",
				success300: "#74dfa2",
				success400: "#45d483",
				success500: "#17c964",
				success600: "#12a150",
				success700: "#0e793c",
				success800: "#095028",
				success900: "#052814",

				warning50: "#fefce8",
				warning100: "#fdedd3",
				warning200: "#fbdba7",
				warning300: "#f9c97c",
				warning400: "#f7b750",
				warning500: "#f5a524",
				warning600: "#c4841d",
				warning700: "#936316",
				warning800: "#62420e",
				warning900: "#312107",

				danger50: "#fee7ef",
				danger100: "#fdd0df",
				danger200: "#faa0bf",
				danger300: "#f871a0",
				danger400: "#f54180",
				danger500: "#f31260",
				danger600: "#c20e4d",
				danger700: "#920b3a",
				danger800: "#610726",
				danger900: "#310413",
			},
			top: {
				dv10: "10dvh",
			},
			fontSize: {
				xxs: "12px",
				xs: "13px",
				s: "14px",
				m: "15px",
				l: "16px",
				xl: "17px",
				xxl: "18px",
				h1Size: "20px",
				xSize: "24px",
			},
			width: {
				logo: "500px",
				dw: "100dvw",
			},
			height: {
				dv100: "100dvh",
				dv80: "80dvh",
				dv70: "70dvh",
				dv10: "10dvh",
			},
			minHeight: {
				"1/2": "50%",
				"1/3": "33%",
				"1/4": "25%",
				"1/5": "20%",
				"1/6": "16%",
				"1/10": "10%",
				"1/12": "8%",
				"1/20": "5%",
			},
			boxShadow: {
				lichiShadow:
					"0px 0px 1px 0px #00000033, 0px 2px 30px 0px #0000000F, 0px 0px 15px 0px #00000008",
				lichiWhiteShadowDown: "-10px 12px 19px -1px #ffffff",
			},
		},
		darkMode: "class",
	},

	darkMode: "class",
	plugins: [nextui()],
};
export default config;
