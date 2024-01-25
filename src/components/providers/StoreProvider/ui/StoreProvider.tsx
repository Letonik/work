import { ReactNode } from "react";
import { Provider } from "react-redux";

import { DeepPartial } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";
import { StateSchema, createReduxStore } from "..";

interface StoreProviderProps {
	children: ReactNode;
	// eslint-disable-next-line react/require-default-props
	initialState?: DeepPartial<StateSchema>;
}

export const StoreProvider = (props: StoreProviderProps): JSX.Element => {
	const { children, initialState } = props;

	const navigate = useRouter();

	const store = createReduxStore(navigate, initialState as StateSchema);

	return <Provider store={store}>{children}</Provider>;
};
