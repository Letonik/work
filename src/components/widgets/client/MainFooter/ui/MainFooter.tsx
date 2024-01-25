"use client";

import React, { memo } from "react";
import Link from "next/link";

const MainFooter: React.FC = memo(() => {
	return (
		<div className="h-[300px] px-[100px] py-[40px] flex gap-10 border-t-2 mt-30">
			<div>
				<h3 className="underline text-m text-default900 mb-[30px]">Компания</h3>
				<Link href="#" className="text-m text-default700 mb-4 block">
					Вакансии
				</Link>
				<Link href="#" className="text-m text-default700 mb-4 block">
					Команда
				</Link>
				<Link href="#" className="text-m text-default700 mb-4 block">
					Жизнь в LICHI
				</Link>
				<Link href="#" className="text-m text-default700 mb-4 block">
					Процесс найма
				</Link>
			</div>
			<div>
				<h3 className="underline text-m text-default900 mb-[30px]">
					Мы в сети
				</h3>
				<Link href="#" className="text-m text-default700 mb-4 block">
					Instagram
				</Link>
				<Link href="#" className="text-m text-default700 mb-4 block">
					TikTok
				</Link>
				<Link href="#" className="text-m text-default700 mb-4 block">
					Pinterest
				</Link>
				<Link href="#" className="text-m text-default700 mb-4 block">
					YouTube
				</Link>
				<Link href="#" className="text-m text-default700 mb-4 block">
					Vk
				</Link>
			</div>
		</div>
	);
});

export default MainFooter;
