import { extendVariants, Autocomplete } from "@nextui-org/react";

const SelectAutocompleteCustom = extendVariants(Autocomplete, {
	variants: {
		color: {
			lichi: {
				base: [
					"shadowLichi",
					"focus-within:bg-primary700",
					"data-[hover=true]:border-default400",
					"data-[hover=true]:bg-white",
					"group-data-[focus=true]:border-default400",
					"group-data-[focus=true]:bg-white",
					"[&>div>div]:bg-white",
					"[&>div>div]:border-[2px]",
					"[&>div>div]:border-default200",
					"[&>div>div]:rounded-lg",
					"[&>div>div]:transition-colors",
					"[&>div>div]:focus-within:bg-[#ffffff]",
					"[&>div[data-[hover=true]]]:bg-red-300",
					"[&>div>div>div:last-child]:hidden",
					"[&>div]:!mb-0",
				],
				helperWrapper: "hidden",
				endContentWrapper: "text‑red-500",
				///
				popoverContent: [
					"bg-white",
					"rounded-lg",
					"border-none",
					"transition-colors",
					"shadowLichi",
					"",
				],
			},
		},
		removeLabel: {
			true: {
				base: ["[&>div>div]:h-[42px]", "[&>div>div>div]:rounded-lg"],
			},
			false: {
				base: ["[&>div>div]:h-[56px]"],
			},
		},
		isError: {
			true: {
				base: [
					"[&>div]:!mb-4",
					"[&>div>div]:border-danger400",
					"[&>div>div>div:last-child]:block",
					"[&>div>div>div>div>div>button>svg]:text-danger400",
					"data-[has-helper=true]:mb-4",
				],
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

export default SelectAutocompleteCustom;
