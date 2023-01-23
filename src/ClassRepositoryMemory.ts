import Classroom from "./Classroom";
import ClassroomRepository from "./ClassroomRepository";

export default class ClassroomRepositoryMemory implements ClassroomRepository {
	classrooms: any[];

	constructor () {
		this.classrooms = [
			new Classroom({
				level: "EM",
				module: "3",
				code: "A",
				capacity: 2,
				startDate: new Date("2023-01-14"),
				endDate: new Date("2023-07-29")
			}),
			new Classroom({
				level: "EM",
				module: "3",
				code: "B",
				capacity: 2,
				startDate: new Date("2022-01-01"),
				endDate: new Date("2022-01-30")
			}),
			new Classroom({
				level: "EM",
				module: "3",
				code: "C",
				capacity: 2,
				startDate: new Date("2023-01-01"),
				endDate: new Date("2023-02-20")
			})
		];
	}

	findByCode(code: string) {
		const classroom = this.classrooms.find(classroom => classroom.code === code);
		if (!classroom) throw new Error("Classroom not found");
		return classroom;
	}
}
