"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper";
import {
	Autoplay,
	EffectFade,
	FreeMode,
	Navigation,
	Thumbs,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { SLIDE_DATA_LIST_MAIN } from "@/components/features/swiper/SwiperImageButtons/const/slideData";
import SwiperSlideMain from "@/components/features/swiper/SwiperImageButtons/ui/SwiperSlideMain";

const SwiperImageButtons = (): JSX.Element => {
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

	const sliderRef = useRef(null);

	const handlePrev = () => {
		if (!sliderRef.current) return;
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		sliderRef.current.swiper.slidePrev();
	};

	const handleNext = () => {
		if (!sliderRef.current) return;
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		sliderRef.current.swiper.slideNext();
	};

	return (
		<div className="swiperImageButtons">
			<Swiper
				ref={sliderRef}
				loop
				effect="fade"
				spaceBetween={10}
				thumbs={{ swiper: thumbsSwiper }}
				modules={[Autoplay, FreeMode, Navigation, Thumbs, EffectFade]}
				className="swiperMain"
				autoplay={{
					delay: 3000,
					disableOnInteraction: false,
					pauseOnMouseEnter: true,
				}}
			>
				{SLIDE_DATA_LIST_MAIN.map((item, key) => (
					<SwiperSlide key={key}>
						<SwiperSlideMain
							data={item}
							handlePrev={handlePrev}
							handleNext={handleNext}
						/>
					</SwiperSlide>
				))}
			</Swiper>
			<Swiper
				onSwiper={setThumbsSwiper}
				loop
				spaceBetween={32}
				slidesPerView={5}
				freeMode
				watchSlidesProgress
				modules={[FreeMode, Navigation, Thumbs]}
				className="swiperPaginate"
			>
				{SLIDE_DATA_LIST_MAIN.map((item, key) => (
					<SwiperSlide key={key}>
						<img src={item.img} alt="img" />
						<div className="name">{item.name}</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default SwiperImageButtons;
