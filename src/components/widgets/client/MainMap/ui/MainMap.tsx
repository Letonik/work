import React from "react";
import WrapperMainBlocks from "@/components/shared/ui/WrapperMainBlocks/WrapperMainBlocks";
import MapImage from "./MapImage";

const MainMap = (): JSX.Element => {
	return (
		<WrapperMainBlocks>
			<>
				<h2 className="text-default900 text-[32px] mb-[60px] text-center ">
					LICHI сейчас это
				</h2>
				<div className="relative">
					<MapImage />
					<div className="w-[514px] absolute bottom-0 right-0">
						<div className="flex items-center justify-between mb-10">
							<div className="w-[50%] flex justify-start">
								<div className="text-center">
									<div className="font-[450] text-[64px]">60</div>
									<div className="text-h1Size">новых коллекций в год</div>
								</div>
							</div>
							<div className="border-r-2 h-[70px] mx-[20px]" />
							<div className="w-[50%] flex justify-end">
								<div className="text-center">
									<div className="font-[450] text-[64px]">2 млн</div>
									<div className="text-h1Size">подписчиков в instagram</div>
								</div>
							</div>
						</div>
						<div className="flex items-center justify-between mb-10">
							<div className="w-[50%] flex justify-start">
								<div className=" text-center">
									<div className="font-[450] text-[64px]">49</div>
									<div className="text-h1Size">
										фирменных <br /> офлайн-магазинов
									</div>
								</div>
							</div>
							<div className="border-r-2 h-[70px] mx-[20px]" />
							<div className="w-[50%] flex justify-end">
								<div className=" text-center">
									<div className="font-[450] text-[64px]">24 млн</div>
									<div className="text-h1Size">лайков в tiktok</div>
								</div>
							</div>
						</div>
						<div className="flex justify-between text-h1Size text-default500 mt-16">
							<span className="text-h1Size">#тэги</span>
							<span className="text-h1Size">#наши</span>
							<span className="text-h1Size">#ценности</span>
							<span className="text-h1Size">#очень</span>
							<span className="text-h1Size">#много</span>
							<span className="text-h1Size">#тегов</span>
						</div>
					</div>
				</div>
			</>
		</WrapperMainBlocks>
	);
};

export default MainMap;
