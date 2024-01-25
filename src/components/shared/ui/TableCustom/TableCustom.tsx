import { extendVariants, Table } from "@nextui-org/react";

const TableCustom = extendVariants(Table, {
	variants: {
		themeLichi: {
			true: {
				base: [
					"shadowLichi",
					"rounded-lg",
					"[&>div]:p-0",
					"[&>div]:pb-4",
					"[&>div]:min-h-[626.5px]",
				],
				thead: ["[&>tr:nth-child(2)]:hidden", "h-[48px]"],
				th: [
					"bg-default100",
					"first:rounded-none",
					"last:rounded-none",
					"text-[15px]",
					"font-normal",
					"first:pl-9",
					"last:pr-9",
				],
				tbody: ["[&>tr]:border-b-[1px]", "[&>tr]:border-default100"],
				tr: ["last:border-none"],
				td: ["first:pl-9", "last:pr-9", "min-h-[54px]", "py-4"],
			},
		},
	},
	defaultVariants: {
		themeLichi: true,
	},
});

export default TableCustom;
