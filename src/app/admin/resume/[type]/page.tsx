"use client";

import { UserListTable } from "../../../../components/widgets/admin/UserListTable";
import { FiltersList } from "../../../../components/widgets/admin/FiltersResumeOrReactions";

type Props = {
	params: {
		type: string;
	};
};
export default function ResumePage({ params: { type } }: Props): JSX.Element {
	return (
		<>
			<div className="mb-10">
				<FiltersList paramsType={type} pageType="resume" />
			</div>
			<UserListTable />
		</>
	);
}
