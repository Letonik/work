"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import cls from "./VideoFullScreen.module.scss";
/*import Player from "react-player";*/

const Player = dynamic(() => import("react-player"), {
	loading: () => (
		<img
			src="/images/swImage.png"
			alt="здесь должно быть видео"
			style={{
				width: "100%",
				height: "100vh",
				objectFit: "cover",
			}}
		/>
	),
});

const VideoFullScreen = (props) => {
	/*
	const { src, poster, autoplay, component, mainId, isActivePage } = props;

*/

	const setActiveOrLinkTo = (event) => {};

	return (
		<section className={cls.player}>
			<div className={cls.upperLayer}>
				<div className="w-[1000px]">
					<h1 className="text-[40px] max-w-[420px] mb-10 leading-10">
						Ждем Вас <br /> в команде Lichi
					</h1>
					<p className="text-h1Size max-w-[440px]">
						Lichi — это модный бренд женской одежды, обуви и аксессуаров,
						основанный в Германии в 2012 году. В течение следующих лет компания
						стремительно развивалась, и на сегодняшний день торговая сеть Lichi
						насчитывает более 50 фирменных магазинов в России и зарубежом.
					</p>
				</div>
			</div>
			<Player
				url="https://player.vimeo.com/progressive_redirect/playback/732365807/rendition/1080p/file.mp4?loc=external&signature=7cfecca5db8086cb6e8f13fc97dd7b504f0ac73ba819a24293c3233a21df8a25"
				loop
				playsinline
				controls={false}
				muted
				playing
				autoPlay
				width="100%"
				height="100%"
				style={{
					objectFit: "cover",
					position: "relative",
					padding: "0",
					marginBottom: "-5px",
				}}
			/>
		</section>
	);
};

export default VideoFullScreen;
