"use client";

import VacancyForm from "@/components/widgets/admin/vacancy/VacancyForm/ui/VacancyForm";

type Props = {
	params: {
		id: string;
	};
};

export default function CreateVacancy({ params: { id } }: Props): JSX.Element {
	return <VacancyForm isEdit paramsId={id} />;
}
