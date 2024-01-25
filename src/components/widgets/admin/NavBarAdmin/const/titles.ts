export const titles: Record<string, string> = {
	"/admin/vacancy/create": "создать вакансию",
	"/admin/vacancy/edit": "редактировать вакансию",
	"/admin/vacancy/active": "вакансии/ активные",
	"/admin/vacancy/archive": "вакансии/ архив",
	"/admin/resume/all": "резюме/ все",
	"/admin/resume/like": "резюме/ избранное",
	"/admin/resume/bl": "резюме/ черный список",
	"/admin/resume/add_user": "добавить соискателя",
	"/admin/reaction/all": "отклики/ все",
	"/admin/reaction/application": "отклики/ заявки",
	"/admin/reaction/consideration": "отклики/ на рассмотрении",
	"/admin/reaction/interview": "отклики/ собеседование",
	"/admin/reaction/employee": "отклики/ сотрудники",
};

export const getTitle = (path: string): string => {
	let res = "";
	Object.keys(titles).forEach((key) => {
		if (path.includes(key)) res = titles[key];
	});
	return res;
};
