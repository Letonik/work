import React, { useEffect, useState } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import EditorJSParser from "editorjs-parser";

type PropsType = {
	data: any;
};

const EditorParserComponent = (props: PropsType): JSX.Element => {
	const { data } = props;
	const [parsedData, setParsedData] = useState(null);

	useEffect(() => {
		if (data) {
			const parser = new EditorJSParser(); // Создаем экземпляр парсера
			const parsed = parser.parse(data); // Парсим данные от Editor.js

			setParsedData(parsed); // Устанавливаем спарсенные данные в состояние
		}
	}, [data]);

	return (
		<div>
			{parsedData ? (
				<div
					className="editor"
					dangerouslySetInnerHTML={{ __html: parsedData }}
				/>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default EditorParserComponent;
