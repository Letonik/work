import {
	getDidChangeTM,
	translateModalActions,
} from "@/components/entities/TranslateModal";
import { getReactionListAction } from "@/components/entities/Reaction";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/components/shared/hooks/useAppDispatch";
import { getUserListAction } from "@/components/entities/User";
import { getVacancyListAction } from "@/components/entities/Vacancy";
import { usePathname } from "next/navigation";

type HookType = () => () => void;

export const useCloseModalInfoCards: HookType = () => {
	const didChanged = useSelector(getDidChangeTM);
	const pathname = usePathname();
	const match = pathname.match(/\/(\w+)/g);
	const desiredPart = match ? match[1].substring(1) : null;

	const dispatch = useAppDispatch();

	const closeModalInfoCards = () => {
		dispatch(translateModalActions.clearTM());
		if (typeof window !== "undefined" && didChanged) {
			const searchParams = new URLSearchParams(window.location.search);
			const queryParams = Object.fromEntries(searchParams.entries());
			const valuesClose: any = {
				resume: {
					action: getUserListAction,
					query: queryParams,
				},
				reaction: {
					action: getReactionListAction,
					query: queryParams,
				},
				vacancy: {
					action: getVacancyListAction,
					query: queryParams,
				},
			};

			if (desiredPart) {
				dispatch(
					valuesClose[desiredPart].action(valuesClose[desiredPart].query)
				);
			}
		}
	};
	return closeModalInfoCards;
};
