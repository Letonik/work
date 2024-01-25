import type { ToasterSchema } from "./model/types/ToasterSchema";
import { toasterActions, toasterReducer } from "./model/slice/vacancySlice";
import ToasterMessage from "./ui/Toaster";

export {
	toasterActions,
	toasterReducer,

	// types
	ToasterSchema,

	// ui
	ToasterMessage,
};
