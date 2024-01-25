import { VacancyListCardsMain } from "@/components/widgets/client/VacancyListCardsMain";
import { AboutCompany } from "@/components/widgets/client/AboutCompany";
import { HiringProcess } from "@/components/widgets/client/HiringProcess";
import { OurTeams } from "@/components/widgets/client/OurTeams";
import { VideoFullScreen } from "@/components/widgets/client/VideoFullScreen";
import { MainMap } from "@/components/widgets/client/MainMap";
import WrapperMainBlocks from "@/components/shared/ui/WrapperMainBlocks/WrapperMainBlocks";
import React from "react";

export default function Main(): JSX.Element {
	return (
		<main>
			<VideoFullScreen />
			<VacancyListCardsMain />
			<AboutCompany />
			<MainMap />
			<OurTeams />
			<HiringProcess />
			<WrapperMainBlocks>
				<h2 className="text-default900 text-[32px] mb-[60px] text-center ">
					Миссия Lichi – сделать моду понятной, беззаботной и доступной.
				</h2>
			</WrapperMainBlocks>
		</main>
	);
}
