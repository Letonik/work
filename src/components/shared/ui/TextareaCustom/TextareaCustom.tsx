import { extendVariants, Textarea } from "@nextui-org/react";

const TextareaCustom = extendVariants(Textarea, {
	variants: {
		color: {
			lichi: {
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
					"data-[hover=true]:text-default800",
					"data-[hover=true]:bg-white",
					"group-data-[focus=true]:border-default400",
					"group-data-[focus=true]:bg-white",
				],
				input: "placeholder:text-default300",
				errorMessage: "hidden",
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
				inputWrapper:
					"border-danger400 text-danger400 data-[hover=true]:border-danger400",
				errorMessage: "block",
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

export default TextareaCustom;
