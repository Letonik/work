"use client";

import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "../const/tools";

export default function Editor({ data, onChange, holder }) {
	const ref = useRef();

	useEffect(() => {
		if (!ref.current) {
			const editor = new EditorJS({
				holder,
				tools: EDITOR_JS_TOOLS,
				data,
				async onChange(api) {
					const dataChange = await api.saver.save();
					onChange(dataChange);
				},
			});
			ref.current = editor;
		}

		return () => {
			ref.current?.destroy?.();
		};
	}, []);

	return <div id={holder} />;
}
