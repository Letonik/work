import { FiltersVacancyList } from "@/components/widgets/admin/vacancy/FiltersVacancyList";
import { VacancyListTable } from "@/components/widgets/admin/vacancy/VacancyListTable";

export default function ActiveVacancyList(): JSX.Element {
	return (
		<>
			<div className="mb-10">
				<FiltersVacancyList isActive />
			</div>
			<VacancyListTable isActive />
		</>
	);
}
