"use client";

import React from "react";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import WrapperMainBlocks from "@/components/shared/ui/WrapperMainBlocks/WrapperMainBlocks";
import ChevronDownIcon from "@/components/shared/icons/ChevronDown";
import VacancyCard from "./VacancyCard";
import Filters from "./Filters";

const VacancyListCardsMain = (): JSX.Element => {
	const [refInView, inView] = useInView({ threshold: 0.1 });

	return (
		<WrapperMainBlocks>
			<div ref={refInView} className="pt-[200px] relative">
				<Filters inView={inView} />
				<h2 className="text-default900 text-[32px] mb-[72px]">
					Вакансии в LICHI
				</h2>
				<div className="grid gap-4 minPc:grid-cols-3 minMobile:grid-cols-1 minTablet:grid-cols-2">
					<VacancyCard />
					<VacancyCard />
					<VacancyCard />
					<VacancyCard />
					<VacancyCard />
					<VacancyCard />
				</div>
				<div className="flex justify-center mt-10">
					<Link href="/admin/resume/all" className="mx-auto flex items-center">
						<span className="mr-3 text-h1Size font-normal text-default650">
							Смотреть все
						</span>{" "}
						<ChevronDownIcon />
					</Link>
				</div>
			</div>
		</WrapperMainBlocks>
	);
};

export default VacancyListCardsMain;
