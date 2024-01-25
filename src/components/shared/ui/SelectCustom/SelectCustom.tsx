import { extendVariants, Select } from "@nextui-org/react";

const SelectCustom = extendVariants(Select, {
	variants: {
		color: {
			lichi: {
				trigger: [
					"border",
					"rounded-lg",
					"border-[2px]",
					"text-default400",
					"bg-white",
					"shadowLichi",
					"transition-colors",
					"border-default200",
					"data-[hover=true]:border-default400",
					"data-[hover=true]:bg-white",
					"data-[hover=true]:text-default600",
				],
				errorMessage: "hidden",
				value: "text‑inherit text-default300",
				selectorIcon: "text‑inherit",
				popoverContent: [
					"bg-white",
					"rounded-lg",
					"border-none",
					"transition-colors",
					"shadowLichi",
					"",
				],
				label: "text-default900 text-[13px] font-medium",
			},
			lichiClient: {
				innerWrapper: "[&>span]:text-default900",
				trigger: [
					"border-[1px]",
					"text-default900",
					"data-[hover=true]:text-default600",
					"rounded",
					"bg-white",
					"border",
					"shadowLichi",
					"transition-colors",
					"border-default300",
					"data-[hover=true]:border-default400",
					"data-[hover=true]:bg-white",
				],
				errorMessage: "hidden",
				value: "text‑inherit text-default300",
				selectorIcon: "text‑inherit",
				popoverContent: [
					"bg-white",
					"rounded-lg",
					"border-none",
					"transition-colors",
					"shadowLichi",
					"",
				],
				label: "text-default900 text-[13px] font-medium",
			},
		},
		textSize: {
			base: {
				value: "text-medium text-[14px]",
			},
		},
		removeLabel: {
			true: {
				label: "hidden",
				trigger: "h-[42px]",
				innerWrapper: "pt-0",
			},
			false: {
				trigger: "h-[56px]",
			},
		},
		isError: {
			true: {
				trigger:
					"border-danger400 text-danger400 data-[hover=true]:text-default600",
				errorMessage: "block",
				value: "text‑inherit",
				selectorIcon: "text‑inherit",
			},
			false: {},
		},
	},
	defaultVariants: {
		color: "lichi",
		textSize: "base",
		removeLabel: true,
	},
});

export default SelectCustom;
