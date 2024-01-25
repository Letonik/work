import React, { useMemo } from "react";
import { Institutes } from "@/components/entities/User/model/types/UserSchema";

type PropsType = {
	institutes: Institutes[] | null;
};

const Institutes = (props: PropsType): JSX.Element => {
	const { institutes } = props;

	return useMemo(() => {
		if (institutes?.length) {
			const setValue = (inst: string, spec: string, year: string) => {
				let val = "";
				if (inst) val += `${inst}, `;
				if (spec) val += `${spec}, `;
				if (year) val += `${year}`;
				return val;
			};
			return (
				<>
					{institutes.map((item) => (
						<div key={item._id} className="text-default900 font-medium">
							{setValue(
								item.educationInstitution,
								item.specialization,
								item.yearOfEnding
							)}
						</div>
					))}
				</>
			);
		}
		return <div className="text-default900 font-medium">Не указанно</div>;
	}, [institutes]);
};

export default Institutes;
