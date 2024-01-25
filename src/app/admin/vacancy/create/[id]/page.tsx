"use client";

import VacancyForm from "@/components/widgets/admin/vacancy/VacancyForm/ui/VacancyForm";

type Props = {
	params: {
		id: string;
	};
};

export default function CreateVacancyCopy({
	params: { id },
}: Props): JSX.Element {
	return <VacancyForm isCopy paramsId={id} />;
}
