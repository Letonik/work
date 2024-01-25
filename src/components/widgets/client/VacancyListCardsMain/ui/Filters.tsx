import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SelectCustom from "@/components/shared/ui/SelectCustom/SelectCustom";
import { cities } from "@/components/shared/const/cities";
import { Button, SelectItem } from "@nextui-org/react";
import ButtonOutline from "@/components/shared/ui/ButtonOutline/ButtonOutline";

const variants = {
	enter: () => {
		return {
			y: 50,
			opacity: 0,
		};
	},
	center: {
		zIndex: 1,
		y: -450,
		opacity: 1,
	},
	exit: () => {
		return {
			zIndex: 0,
			y: 50,
			opacity: 0,
		};
	},
};

type PropsType = {
	inView: boolean;
};

const Filters = (props: PropsType): JSX.Element => {
	const { inView } = props;

	const [city, setCity] = useState("");

	const changeValue = (val: string) => {
		setCity(val);
	};

	return (
		<AnimatePresence initial={false}>
			{inView && (
				<motion.div
					key="filters"
					variants={variants}
					initial="enter"
					animate="center"
					exit="exit"
					transition={{
						y: { type: "spring", stiffness: 300, damping: 30 },
						opacity: { duration: 0.3 },
					}}
					className="absolute w-full shadow-lichiShadow bg-white rounded-md p-[60px]"
				>
					<h3 className="text-[32px] text-center mb-[60px] leading-3">
						Найдите работу мечты
					</h3>
					<div className="grid grid-cols-4 gap-2">
						<SelectCustom
							placeholder="Выберите город"
							aria-label="Выберите город"
							color="lichiClient"
							selectedKeys={city ? [city] : []}
							onChange={(val) => changeValue(val.target.value)}
						>
							{Object.values(cities).map((opt) => (
								<SelectItem
									className="rounded-lg"
									key={opt.value}
									value={opt.value}
								>
									{opt.name}
								</SelectItem>
							))}
						</SelectCustom>
						<SelectCustom
							placeholder="Выберите город"
							aria-label="Выберите город"
							color="lichiClient"
							selectedKeys={city ? [city] : []}
							onChange={(val) => changeValue(val.target.value)}
						>
							{Object.values(cities).map((opt) => (
								<SelectItem
									className="rounded-lg"
									key={opt.value}
									value={opt.value}
								>
									{opt.name}
								</SelectItem>
							))}
						</SelectCustom>
						<SelectCustom
							placeholder="Выберите город"
							aria-label="Выберите город"
							color="lichiClient"
							selectedKeys={city ? [city] : []}
							onChange={(val) => changeValue(val.target.value)}
						>
							{Object.values(cities).map((opt) => (
								<SelectItem
									className="rounded-lg"
									key={opt.value}
									value={opt.value}
								>
									{opt.name}
								</SelectItem>
							))}
						</SelectCustom>
						<SelectCustom
							placeholder="Выберите город"
							aria-label="Выберите город"
							color="lichiClient"
							selectedKeys={city ? [city] : []}
							onChange={(val) => changeValue(val.target.value)}
						>
							{Object.values(cities).map((opt) => (
								<SelectItem
									className="rounded-lg"
									key={opt.value}
									value={opt.value}
								>
									{opt.name}
								</SelectItem>
							))}
						</SelectCustom>
					</div>
					<div className="flex justify-center mt-[50px]">
						<ButtonOutline value="Поиск" classes="px-[120px]" />
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Filters;
