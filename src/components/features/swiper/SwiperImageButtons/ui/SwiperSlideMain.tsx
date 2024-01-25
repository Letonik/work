import React from "react";
import ButtonOutline from "@/components/shared/ui/ButtonOutline/ButtonOutline";
import ChevronRightIcon from "@/components/shared/icons/ChevronRight";
import ChevronLeftIcon from "@/components/shared/icons/ChevronLeft";
import { Button } from "@nextui-org/react";

type PropsData = {
	data: {
		img: string;
		name: string;
		paragraph: string;
		buttonText: string;
	};
	handleNext: () => void;
	handlePrev: () => void;
};

const SwiperSlideMain = (props: PropsData): JSX.Element => {
	const { data, handlePrev, handleNext } = props;

	return (
		<div className="flex bg-[#ffffff]">
			<img alt="img" src={data.img} className="w-[42%]" />
			<div className="w-[58%] px-10 flex flex-col justify-between">
				<div>
					<h3 className="text-xSize mb-10">{data.name}</h3>
					<p className="text-xl max-w-[645px] mb-10">{data.paragraph}</p>
					<ButtonOutline value={data.buttonText} />
				</div>
				<div className="flex gap-20">
					<Button
						isIconOnly
						className="bg-default-900 rounded-full h-[48px] w-[48px]"
						aria-label="prev-slide"
						onClick={handlePrev}
					>
						<ChevronLeftIcon />
					</Button>
					<Button
						isIconOnly
						className="bg-default-900 rounded-full h-[48px] w-[48px]"
						aria-label="next-slide"
						onClick={handleNext}
					>
						<ChevronRightIcon />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default SwiperSlideMain;
