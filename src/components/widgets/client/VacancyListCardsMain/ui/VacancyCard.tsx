import React from "react";
import FireIcon from "@/components/shared/icons/FireIcon";

const VacancyCard = (): JSX.Element => {
	const icon = true;
	return (
		<div className="p-7 border-1 border-default300 cursor-pointer rounded-sm relative overflow-hidden group transition-transform transform flex flex-col gap-5 hover:scale-105">
			<div className="text-l font-normal text-default500">
				Россия, Санкт-Петербург, 11.10.21
			</div>
			<div className="text-default900 text-h1Size font-[450] flex items-center gap-4">
				{icon && <FireIcon />}
				Директор по маркетингу и PR (CMO)
			</div>
			<div className="text-xxl font-normal text-default400">з/п не указана</div>
		</div>
	);
};

export default VacancyCard;
