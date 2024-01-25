"use client";

import React, { useEffect } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import {
	getErrorToaster,
	getSuccessToaster,
} from "@/components/shared/ui/Toaster/model/selectors/toasterSelectors";

const ToasterMessage = (): JSX.Element => {
	const error = useSelector(getErrorToaster);
	const success = useSelector(getSuccessToaster);

	useEffect(() => {
		if (error.length) {
			error.forEach((str: string) => {
				toast.error(str);
			});
		}
	}, [error]);

	useEffect(() => {
		if (success.length) {
			success.forEach((str: string) => {
				toast.success(str);
			});
		}
	}, [success]);

	return <Toaster />;
};

export default ToasterMessage;
