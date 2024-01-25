"use client";

import React, { forwardRef } from "react";

type PropsType = {
	children: JSX.Element;
};

const WrapperMainBlocks = forwardRef<HTMLDivElement, PropsType>(
	(props: PropsType, ref): JSX.Element => {
		const { children } = props;
		return (
			<div ref={ref} className="px-24 mx-auto my-24 max-w-[1528px]">
				{children}
			</div>
		);
	}
);

export default WrapperMainBlocks;
