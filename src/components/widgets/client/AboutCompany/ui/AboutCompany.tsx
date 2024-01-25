import WrapperMainBlocks from "@/components/shared/ui/WrapperMainBlocks/WrapperMainBlocks";
import { SwiperLight } from "@/components/features/swiper/SwiperLight";
import cls from "./AboutCompany.module.scss";

const AboutCompany = (): JSX.Element => {
	return (
		<WrapperMainBlocks>
			<div className="grid gap-0 minPc:grid-cols-2 minTablet:grid-cols-1">
				<div className="minPc:pr-[55px]">
					<h2 className="text-default900 text-[32px] mb-10">О компании</h2>
					<div className="mb-10 text-h1Size">
						Основательница бренда – ХЕЛЕНА ХАЛЬФИНГЕР, возглавляет дизайн-бюро
						Lichi во Франкфуртена Майне в Германии.
					</div>
					<div className={cls.blockText}>
						Собственные фабрики и постоянные фабрики-партнеры расположены в
						Центральной и Южной Азии. Контроль качества продукции выполняется в
						Китае.
					</div>
					<div className={cls.blockText}>
						Распределенные команды: Санкт-Петербург и Казахстан – это отделы
						продаж, IT, бухгалтерия, отделы кадров, маркетинга и дизайна.
					</div>
					<div className={cls.blockText}>
						Самый крупный офис компании находится в Санкт-Петербурге. Здесь
						также располагается своя фотостудия, где производится весь
						визуальный контент. Поддержкой клиентов занимается колл-центр.
					</div>
				</div>
				<SwiperLight />
			</div>
		</WrapperMainBlocks>
	);
};

export default AboutCompany;
