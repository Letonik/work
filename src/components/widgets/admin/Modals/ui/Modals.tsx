import React from "react";
import { TranslateModalAdminCards } from "@/components/features/TranslateModalPages";
import ModalCustom from "@/components/shared/ui/ModalCustom/ModalCustom";
import { useSelector } from "react-redux";
import { getIsOpenModalTM } from "@/components/entities/TranslateModal";
import { useCloseModalInfoCards } from "@/components/widgets/admin/Modals/lib/useCloseModalInfoCards";

const Modals = (): JSX.Element => {
	const isOpenTM = useSelector(getIsOpenModalTM);
	const closeModalInfoCards = useCloseModalInfoCards();
	return (
		<ModalCustom
			isOpen={isOpenTM}
			handleClose={closeModalInfoCards}
			isBottom={false}
		>
			<TranslateModalAdminCards />
		</ModalCustom>
	);
};

export default Modals;
