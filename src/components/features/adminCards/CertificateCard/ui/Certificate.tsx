import React, { useMemo } from "react";
import Link from "next/link";

type PropsType = {
	certificate: {
		links: string[];
		fileLinks: string[];
		_id: string;
	} | null;
};

const Certificate = (props: PropsType): JSX.Element => {
	const { certificate } = props;

	return useMemo(() => {
		const values = {
			// eslint-disable-next-line react/jsx-no-useless-fragment
			links: <></>,
			// eslint-disable-next-line react/jsx-no-useless-fragment
			fileLinks: <></>,
		};
		if (certificate?.fileLinks.length) {
			values.fileLinks = (
				<div className="mb-7">
					<div className="mb-1">Прикрепленные файлы</div>
					{/* eslint-disable-next-line no-warning-comments */}
					{/* todo: Сделать файлы */}
				</div>
			);
		}
		if (certificate?.links.length) {
			values.links = (
				<div className="mb-7">
					<div className="mb-1">Ссылки на портфолио</div>
					{certificate.links.map((item, key) => (
						<div key={key} className="text-primary500 font-medium">
							<Link href={item}>{item}</Link>
						</div>
					))}
				</div>
			);
		}
		return (
			<>
				{values.links} {values.fileLinks}
			</>
		);
	}, [certificate]);
};

export default Certificate;
