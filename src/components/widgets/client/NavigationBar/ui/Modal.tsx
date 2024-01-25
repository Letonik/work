"use client";

import { useLocalStorage } from "@/components/shared/hooks/useLocal";
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from "@nextui-org/react";

import { useEffect, useState } from "react";

export const ModalItem = (props: {
	open: boolean;
	setIsOpen: (e: boolean) => void;
}): JSX.Element => {
	const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

	const permission = useLocalStorage("permissions");

	const [permissions, setPermisions] = useState<any>();

	const { open, setIsOpen } = props;

	useEffect(() => {
		setPermisions(permission);
		// if (permission) console.log(permission);
	}, [permission]);

	useEffect(() => {
		if (open) {
			onOpen();
		} else {
			onClose();
		}
	}, [open]);

	useEffect(() => {
		if (isOpen) {
			setIsOpen(true);
		} else {
			setIsOpen(false);
		}
	}, [isOpen]);

	return (
		<Modal
			onOpenChange={onOpenChange}
			size="full"
			isOpen={isOpen}
			onClose={onClose}
		>
			<ModalContent>
				{(onCloseModal: any) => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							Окно личного кабинета
						</ModalHeader>
						<ModalBody>
							<p>Информация о всех доступах для аккаунта. Языках и тд</p>
							{/* <div>
								ЛОГИСТИКА:
								{[permissions?.logistic?.list].map((item, key) => {
									return (
										<div key={key}>
											{Object.keys(item).map((itemKey) => (
												<div key={itemKey}>
													{itemKey} :{" "}
													{permissions?.logistic?.list[itemKey].view
														? "Просмотр"
														: "Без доступа"}
												</div>
											))}
										</div>
									);
								})}
							</div>
							<div>
								Склад:
								{[permissions?.warehouse?.list].map((item, key) => {
									return (
										<div key={key}>
											{Object.keys(item).map((itemKey) => (
												<div key={itemKey}>
													{itemKey} :{" "}
													{permissions?.warehouse?.list[itemKey].view
														? "Просмотр"
														: "Без доступа"}
												</div>
											))}
										</div>
									);
								})}
							</div>
							<div>
								Отчеты:
								{[permissions?.reports?.list].map((item, key) => {
									return (
										<div key={key}>
											{Object.keys(item).map((itemKey) => (
												<div key={itemKey}>
													{itemKey} :{" "}
													{permissions?.reports?.list.view
														? "Просмотр"
														: "Без доступа"}
												</div>
											))}
										</div>
									);
								})}
							</div> */}
							<div>Язык: RU</div>
						</ModalBody>
						<ModalFooter>
							<Button color="danger" variant="light" onPress={onCloseModal}>
								Закрыть
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};
