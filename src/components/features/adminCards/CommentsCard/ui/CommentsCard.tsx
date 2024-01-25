import React, { useState } from "react";
import { Comments } from "@/components/entities/User";
import { convertDateFormat } from "@/components/shared/utils/convertDateFormatDb";
import { AnimatePresence, motion } from "framer-motion";
import TextareaCustom from "@/components/shared/ui/TextareaCustom/TextareaCustom";
import ButtonCustom from "@/components/shared/ui/ButtonCustom/ButtonCustom";

type PropsType = {
	comments: Comments[];
	addNewComment: (val: string) => void;
	isLoadingBtn: boolean;
};

const CommentsCard = (props: PropsType): JSX.Element => {
	const { comments, addNewComment, isLoadingBtn } = props;

	const [isOpenComments, setOpenComments] = useState(false);
	const [valueTA, setValueTA] = useState("");
	const [isErrorTA, setErrorTA] = useState(false);

	const hideTextarea = () => {
		setOpenComments(false);
		setValueTA("");
		setErrorTA(false);
	};

	const changeValueTA = (val: string) => {
		if (val) setErrorTA(false);
		setValueTA(val);
	};

	const sendComments = async () => {
		if (valueTA) {
			await addNewComment(valueTA);
			hideTextarea();
		} else {
			setErrorTA(true);
		}
	};

	return (
		<div className="mb-7 p-6 bg-default100 rounded-xl">
			<div className="mb-6 font-medium text-[#000000 text-xxl">Комментарии</div>
			<div className="overflow-hidden min-h-[21px]">
				<AnimatePresence mode="wait" initial={false}>
					{!isOpenComments ? (
						<motion.div
							key={0}
							className="text-default500 font-medium text-s cursor-pointer hover:text-default400"
							initial={{ y: -30 }}
							animate={{ y: 0 }}
							exit={{ y: -30 }}
							transition={{ y: { duration: 0.2 } }}
							onClick={() => setOpenComments(true)}
						>
							Добавить комментарий
						</motion.div>
					) : (
						<motion.div
							key={1}
							className="text-default500 font-medium text-s cursor-pointer hover:text-default400 overflow-hidden"
							initial={{ height: 0 }}
							animate={{ height: "auto" }}
							exit={{ height: 0 }}
							transition={{ height: { duration: 0.2 } }}
						>
							<TextareaCustom
								onValueChange={changeValueTA}
								value={valueTA}
								isError={isErrorTA}
								errorMessage="Комментарий не может быть пустым"
							/>
							<div className="flex justify-end items-center gap-2 mt-3">
								<ButtonCustom
									colorTheme="link"
									size="xl"
									className="rounded-lg"
									onClick={hideTextarea}
								>
									Отмена
								</ButtonCustom>
								<ButtonCustom
									colorTheme="primary"
									size="xl"
									className="rounded-lg"
									onClick={sendComments}
									isLoading={isLoadingBtn}
								>
									Добавить
								</ButtonCustom>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
			{Boolean(comments.length) &&
				comments.map((item) => (
					<div key={item._id} className="mt-7">
						<div className="mb-0 text-xs text-default400">
							{item.author}, {convertDateFormat(item.date, true)}
						</div>
						<div className="text-default800">{item.comment}</div>
					</div>
				))}
			{Boolean(!comments.length) && (
				<div className="my-7">Нет комментариев</div>
			)}
		</div>
	);
};

export default CommentsCard;
