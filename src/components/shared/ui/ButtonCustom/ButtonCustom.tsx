import { extendVariants, Button } from "@nextui-org/react";

const ButtonCustom = extendVariants(Button, {
	variants: {
		colorTheme: {
			primary: "bg-primary500 text-default50",
			secondary: "bg-default100",
			link: "bg-transparent",
			black: "bg-default900 text-default50",
		},
		size: {
			xl: "text-[15px] font-normal px-5 h-[32px]",
			xxl: "text-[15px] font-normal px-8 h-[32px]",
		},
		border: {
			base: "rounded-lg",
			rounded: "rounded",
		},
		text: {
			normalUppercase: "uppercase font-light text-[15px]",
		},
		defaultVariants: {
			// <- modify/add default variants
			colorTheme: "primary",
			size: "xl",
			border: "base",
		},
	},
});

export default ButtonCustom;
