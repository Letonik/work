import React, { useMemo } from "react";
import { PlacesOfWork } from "@/components/entities/User";

type PropsType = {
	placesOfWork: PlacesOfWork[] | null;
};

const PlacesOfWork = (props: PropsType): JSX.Element => {
	const { placesOfWork } = props;

	return useMemo(() => {
		if (placesOfWork?.length) {
			return (
				<>
					{placesOfWork.map((item) => (
						<div key={item._id} className="mb-7">
							<div className="text-default900 font-medium">
								{item.companyName}, {item.position}
							</div>
							<div className="text-xs text-default400">
								c {item.yearStart} г. по{" "}
								{item.yearEnd ? `${item.yearEnd} г.` : "настоящее время"}
							</div>
							<div className="mt-2 text-default800">{item.description}</div>
						</div>
					))}
				</>
			);
		}
		return (
			<div className="text-default400 font-medium">
				Нет Информации о компаниях
			</div>
		);
	}, [placesOfWork]);
};

export default PlacesOfWork;
