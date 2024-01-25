"use client";

import { FiltersList } from "../../../../components/widgets/admin/FiltersResumeOrReactions";
import { ReactionListTable } from "../../../../components/widgets/admin/ReactionListTable";

type Props = {
	params: {
		type: string;
	};
};
export default function ReactionPage({ params: { type } }: Props): JSX.Element {
	return (
		<>
			<div className="mb-10">
				<FiltersList paramsType={type} pageType="reaction" />
			</div>
			<ReactionListTable />
		</>
	);
}
