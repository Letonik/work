// tools.js
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import LinkTool from "@editorjs/link";
import Image from "@editorjs/image";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import SimpleImage from "@editorjs/simple-image";

export const EDITOR_JS_TOOLS = {
	header: {
		class: Header,
		config: {
			placeholder: "Enter a Header",
			levels: [2, 3, 4],
			defaultLevel: 2,
		},
	},
	embed: Embed,
	table: Table,
	list: List,
	linkTool: LinkTool,
	image: Image,
	quote: Quote,
	marker: Marker,
	inlineCode: InlineCode,
	simpleImage: SimpleImage,
};
