import { extendVariants, DropdownItem } from "@nextui-org/react";

const DropdownItemCustom = extendVariants(DropdownItem, {
	variants: {
		themeCustom: {
			lichi: {},
		},
	},
	defaultVariants: {
		themeCustom: "lichi",
	},
});

export default DropdownItemCustom;
