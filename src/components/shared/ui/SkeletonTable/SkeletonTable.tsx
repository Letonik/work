import React from "react";
import { SpinGlobal } from "@/components/shared/ui/SpinGlobal";

const SkeletonTable = (): JSX.Element => {
	return (
		<div className="w-full px-8 h-full">
			<SpinGlobal />
		</div>
	);
};

export default SkeletonTable;
