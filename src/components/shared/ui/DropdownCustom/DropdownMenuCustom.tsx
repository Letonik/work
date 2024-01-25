import { extendVariants, DropdownMenu } from "@nextui-org/react";

const DropdownMenuCustom = extendVariants(DropdownMenu, {
	variants: {
		themeCustom: {
			lichi: {
				list: ["[&>li>span]:text-xxl font-normal [&>li>span]:my-1"],
			},
		},
	},
	defaultVariants: {
		themeCustom: "lichi",
	},
});

export default DropdownMenuCustom;
