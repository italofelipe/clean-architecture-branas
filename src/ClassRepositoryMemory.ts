import ClassRepository from "./ClassRepository";

export default class ClassRepositoryMemory implements ClassRepository {
	classes: any[];

	constructor() {
		this.classes = [
			{
				level: "EM",
				module: "3",
				code: "A",
				capacity: 2
			}
		];
	}

	findByCode(code: string): any {
		const clazz = this.classes.find((clazz: any) => clazz.code === code);
		if (!clazz) throw new Error("Class not found");
		return clazz;
	}
}
