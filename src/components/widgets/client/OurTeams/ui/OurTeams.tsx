import React from "react";
import WrapperMainBlocks from "@/components/shared/ui/WrapperMainBlocks/WrapperMainBlocks";
import { SwiperImageButtons } from "@/components/features/swiper/SwiperImageButtons";

const OurTeams = (): JSX.Element => {
	return (
		<WrapperMainBlocks>
			<>
				<h2 className="text-default900 text-[32px] mb-[60px] text-center ">
					Наши команды
				</h2>
				<SwiperImageButtons />
			</>
		</WrapperMainBlocks>
	);
};

export default OurTeams;
