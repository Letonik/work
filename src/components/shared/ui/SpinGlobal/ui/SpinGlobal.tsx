import React from "react";
import { Spinner } from "@nextui-org/react";

const SpinGlobal: React.FC = () => {
	return (
		<div className="absolute right-0 top-0 h-[100%] w-[100%] backdrop-blur-[2px] z-10 flex justify-center items-center rounded-[15px]">
			<Spinner size="lg" />
		</div>
	);
};

export default SpinGlobal;
