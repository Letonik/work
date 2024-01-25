import { extendVariants, Dropdown } from "@nextui-org/react";

const DropdownCustom = extendVariants(Dropdown, {
	variants: {
		themeCustom: {
			lichi: {
				content: "rounded min-w-[100px] text-xxl font-normal",
			},
		},
	},
	defaultVariants: {
		themeCustom: "lichi",
	},
});

export default DropdownCustom;
