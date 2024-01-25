import { AxiosInstance } from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { VacancySchema } from "@/components/entities/Vacancy";
import { ToasterSchema } from "@/components/shared/ui/Toaster";
import { UserSchema } from "@/components/entities/User";
import { ReactionSchema } from "@/components/entities/Reaction/model/types/ReactionSchema";
import { TranslateModalSchema } from "@/components/entities/TranslateModal";

export interface StateSchema {
	vacancy: VacancySchema;
	toaster: ToasterSchema;
	user: UserSchema;
	reaction: ReactionSchema;
	translateModal: TranslateModalSchema;
}

export interface ThunkExtraArg {
	api: AxiosInstance;
	navigate: AppRouterInstance;
}

export interface ThunkConfig<T> {
	rejectValue: T;
	extra: ThunkExtraArg;
	state: StateSchema;
}
