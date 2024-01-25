import { extendVariants, Input } from "@nextui-org/react";

const InputCustom = extendVariants(Input, {
	variants: {
		color: {
			lichi: {
				base: "data-[has-helper=true]:mb-0 relative",
				inputWrapper: [
					"bg-white",
					"border",
					"shadowLichi",
					"rounded-lg",
					"transition-colors",
					"border-[2px]",
					"border-default200",
					"focus-within:bg-primary700",
					"data-[hover=true]:border-default400",
					"data-[hover=true]:bg-white",
					"group-data-[focus=true]:border-default400",
					"group-data-[focus=true]:bg-white",
				],
				input: "placeholder:text-default300",
				helperWrapper: "hidden",
				label: "text-default900 text-[13px] font-medium",
			},
		},
		textSize: {
			base: {
				input: "text-base",
			},
		},
		isError: {
			true: {
				inputWrapper: "border-danger400 text-danger400",
				helperWrapper: "block",
				base: "data-[has-helper=true]:mb-5",
			},
			false: {},
		},
		removeLabel: {
			true: {
				label: "hidden",
				inputWrapper: ["h-[42px]"],
			},
			false: {
				inputWrapper: "h-[56px]",
			},
		},
	},
	defaultVariants: {
		color: "lichi",
		textSize: "base",
		removeLabel: true,
	},
});

export default InputCustom;
