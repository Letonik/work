import { StateSchema } from "@/components/providers/StoreProvider";

export const getSuccessToaster = (state: StateSchema): any =>
	state.toaster.success;
export const getErrorToaster = (state: StateSchema): any => state.toaster.error;
