import ModuleRepository from "./ModuleRepository";

export default class ModuleRepositoryMemory implements ModuleRepository {
	modules: any[];

	constructor() {
		this.modules = [
			{
				level: "EF1",
				code: "1",
				description: "1o ano",
				minimumAge: 6,
				price: 15000
			},
			{
				level: "EF1",
				code: "2",
				description: "2o ano",
				minimumAge: 7,
				price: 15000
			},
			{
				level: "EF1",
				code: "3",
				description: "3o ano",
				minimumAge: 8,
				price: 15000
			},
			{
				level: "EF1",
				code: "4",
				description: "4o ano",
				minimumAge: 9,
				price: 15000
			},
			{
				level: "EF1",
				code: "5",
				description: "5o ano",
				minimumAge: 10,
				price: 15000
			},
			{
				level: "EF2",
				code: "6",
				description: "6o ano",
				minimumAge: 11,
				price: 15000
			},
			{
				level: "EF2",
				code: "7",
				description: "7o ano",
				minimumAge: 12,
				price: 15000
			},
			{
				level: "EF2",
				code: "8",
				description: "8o ano",
				minimumAge: 13,
				price: 15000
			},
			{
				level: "EF2",
				code: "9",
				description: "9o ano",
				minimumAge: 14,
				price: 15000
			},
			{
				level: "EM",
				code: "1",
				description: "1o ano",
				minimumAge: 15,
				price: 17000
			},
			{
				level: "EM",
				code: "2",
				description: "2o ano",
				minimumAge: 16,
				price: 17000
			},
			{
				level: "EM",
				code: "3",
				description: "3o ano",
				minimumAge: 17,
				price: 17000
			}
		];
	}

	findByCode(level: string, code: string) {
		const module = this.modules.find(
			(module: any) => module.level === level && module.code === code
		);
		if (!module) throw new Error("Module not found");
		return module;
	}
}
