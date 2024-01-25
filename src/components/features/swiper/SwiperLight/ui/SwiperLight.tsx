"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const SwiperLight = (): JSX.Element => {
	return (
		<div className="swiperLight">
			<Swiper
				autoplay={{
					delay: 3000,
					disableOnInteraction: false,
					pauseOnMouseEnter: true,
				}}
				pagination={{
					clickable: true,
				}}
				modules={[Autoplay, Pagination]}
				className="mySwiper"
			>
				<SwiperSlide>
					<img alt="img" src="/images/sl.webp" />
				</SwiperSlide>
				<SwiperSlide>
					<img alt="img" src="/images/sl.webp" />
				</SwiperSlide>
				<SwiperSlide>
					<img alt="img" src="/images/sl.webp" />
				</SwiperSlide>
			</Swiper>
		</div>
	);
};

export default SwiperLight;
