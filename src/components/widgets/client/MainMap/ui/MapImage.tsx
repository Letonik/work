import React from "react";
import Image from "next/image";
import PlaceMapIcon from "@/components/shared/icons/PlaceMapIcon";

const MapImage = (): JSX.Element => {
	return (
		<div className="relative w-[863px] h-[621px]">
			<Image src="/images/MainMap.svg" width="863" height="621" alt="Map" />
			<div className="absolute top-[168px] left-[32px] cursor-pointer">
				<PlaceMapIcon />
			</div>
			<div className="absolute top-[125px] left-[148px] cursor-pointer">
				<PlaceMapIcon />
			</div>
			<div className="absolute top-[214px] left-[173px] cursor-pointer">
				<PlaceMapIcon />
			</div>
			<div className="absolute top-[147px] left-[273px] cursor-pointer">
				<PlaceMapIcon width={31} height={30} />
			</div>
			<div className="absolute top-[185px] left-[536px] cursor-pointer">
				<PlaceMapIcon width={31} height={30} />
			</div>
			<div className="absolute top-[152px] left-[714px] cursor-pointer">
				<PlaceMapIcon width={31} height={30} />
			</div>
			<div className="absolute top-[206px] left-[357px] cursor-pointer">
				<PlaceMapIcon width={56} height={54} />
			</div>
			<div className="absolute top-[123px] left-[357px] cursor-pointer">
				<PlaceMapIcon width={56} height={54} />
			</div>
			<div className="absolute top-[87px] left-[635px] cursor-pointer">
				<PlaceMapIcon width={56} height={54} />
			</div>
		</div>
	);
};

export default MapImage;
