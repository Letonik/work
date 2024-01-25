"use client";

import React, { RefObject, useEffect, useRef, useState } from "react";
import WrapperMainBlocks from "@/components/shared/ui/WrapperMainBlocks/WrapperMainBlocks";
import cls from "./HiringProcess.module.scss";
import { useWindowDimensions } from "@/components/shared/hooks/useWindowDemensions";
import { log } from "util";

type PropsMarker = {
	contentNumber: number;
	isActive: boolean;
};

const Marker = (props: PropsMarker): JSX.Element => {
	const { contentNumber, isActive } = props;
	return (
		<div
			className={`w-[50px] min-w-[50px] h-[50px] rounded-full flex justify-center items-center text-xSize ${
				isActive ? "bg-[#C61A1A] text-white" : "bg-default100 text-default900"
			}`}
		>
			{contentNumber}
		</div>
	);
};

const HiringProcess = (): JSX.Element => {
	const refWrapper: RefObject<HTMLDivElement> = useRef(null);
	const refScroll: RefObject<HTMLDivElement> = useRef(null);
	const screenSize = useWindowDimensions();
	const [activeNumber, setActiveOrder] = useState(1);

	useEffect(() => {
		const updateHeight = () => {
			const rectWrapper = refWrapper.current?.getBoundingClientRect();
			const rectScroll = refScroll.current?.getBoundingClientRect();
			const heightScrollSlice = (2000 - (rectScroll?.height || 600)) / 6;
			const arrayPoints = [];
			for (let i = 1; i < 7; i += 1) {
				arrayPoints.push(heightScrollSlice * i);
			}
			const findIndex = (targetNumber: number, array: number[]): number => {
				let closestIndex = 0;
				let closestDifference = Math.abs(targetNumber - array[0]);
				// eslint-disable-next-line no-plusplus
				for (let i = 1; i < array.length; i++) {
					const currentDifference = Math.abs(targetNumber - array[i]);
					if (currentDifference < closestDifference) {
						closestIndex = i;
						closestDifference = currentDifference;
					}
				}
				return closestIndex + 1;
			};

			if (rectWrapper && rectScroll) {
				const indent = Math.abs(rectWrapper.top - rectScroll.top);
				setActiveOrder(findIndex(indent, arrayPoints));
			}

			if (refScroll.current && screenSize.width && screenSize?.width >= 1250) {
				if (rectWrapper && rectWrapper.top < 70) {
					refScroll.current.style.position = "sticky";
					refScroll.current.style.top = "70px";
				} else {
					refScroll.current.style.position = "absolute";
					refScroll.current.style.top = "0px";
				}
			} else if (refScroll.current && screenSize?.width) {
				refScroll.current.style.position = "relative";
			}
		};
		updateHeight();
		window.addEventListener("scroll", updateHeight);
		return () => {
			window.removeEventListener("scroll", updateHeight);
		};
	}, [screenSize?.width]);

	return (
		<WrapperMainBlocks ref={refWrapper}>
			<div className="h-[2000px] relative">
				<div ref={refScroll}>
					<h2 className="text-default900 text-[32px] mb-[60px]">
						Процесс найма
					</h2>
					<div className="grid gap-0 minPc:grid-cols-2 minTablet:grid-cols-1">
						<div className="minPc:pr-[127px]">
							<div className="mb-10 text-h1Size">
								В рекрутинге есть несколько этапов. Финальное количество зависит
								от роли, на которую вы претендуете; на HR-интервью обязательно
								расскажем все детали. Но в целом так:
							</div>
						</div>
						<div>
							<div className={cls.blockStep}>
								<Marker contentNumber={1} isActive={activeNumber === 1} />
								<div className={cls.blockStepText}>Вы присылаете резюме</div>
							</div>
							<div className={cls.blockStep}>
								<Marker contentNumber={2} isActive={activeNumber === 2} />
								<div className={cls.blockStepText}>
									Приглашаем вас на интервью с рекрутером: здесь мы спрашиваем о
									ваших целях, опыте, уточняем детали резюме.
								</div>
							</div>
							<div className={cls.blockStep}>
								<Marker contentNumber={3} isActive={activeNumber === 3} />
								<div className={cls.blockStepText}>
									Приглашаем на интервью с будущим руководителем: здесь говорим
									о задачах и приоритетах, из первых рук узнаете о том, как
									устроен ваш будущий рабочий процесс.
								</div>
							</div>
							<div className={cls.blockStep}>
								<Marker contentNumber={4} isActive={activeNumber === 4} />
								<div className={cls.blockStepText}>
									Приглашаем на интервью с амбассадором найма: смотрим,
									насколько мы сходимся по ценностям - да, это очень важно.
								</div>
							</div>
							<div className={cls.blockStep}>
								<Marker contentNumber={5} isActive={activeNumber === 5} />
								<div className={cls.blockStepText}>
									Собираем рекомендации от ваших предыдущих работодателей
								</div>
							</div>
							<div className={cls.blockStep}>
								<Marker contentNumber={6} isActive={activeNumber === 6} />
								<div className={cls.blockStepText}>Оффер!</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</WrapperMainBlocks>
	);
};

export default HiringProcess;
