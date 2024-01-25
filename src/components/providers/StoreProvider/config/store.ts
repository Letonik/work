import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { $api } from "@/components/shared/api/api";
import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import { vacancyReducer } from "@/components/entities/Vacancy";
import { userReducer } from "@/components/entities/User";
import { reactionReducer } from "@/components/entities/Reaction";
import { toasterReducer } from "@/components/shared/ui/Toaster";
import { translateModalReducer } from "@/components/entities/TranslateModal";
import { StateSchema, ThunkExtraArg } from "./StateSchema";

export function createReduxStore(
	navigate: AppRouterInstance,
	initialState?: StateSchema
): any {
	const rootReducers: ReducersMapObject<StateSchema> = {
		vacancy: vacancyReducer,
		toaster: toasterReducer,
		user: userReducer,
		reaction: reactionReducer,
		translateModal: translateModalReducer,
	};

	const extraArg: ThunkExtraArg = {
		api: $api,
		navigate,
	};

	return configureStore({
		reducer: rootReducers,
		devTools: true,
		preloadedState: initialState,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				thunk: {
					extraArgument: extraArg,
				},
			}),
	});
}

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
