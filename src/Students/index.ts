import Student from "./Student";

export default class EnrollStudent {
	enrollments: any[];
	levels: any[];
	modules: any[];
	classes: any[];

	constructor() {
		this.enrollments = [];
		this.levels = [
			{
				code: "EF1",
				description: "Ensino Fundamental I"
			},
			{
				code: "EF2",
				description: "Ensino Fundamental II"
			},
			{
				code: "EM",
				description: "Ensino Médio"
			}
		];
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

		this.classes = [
			{
				level: "EM",
				module: "3",
				code: "A",
				capacity: 2
			}
		];
	}

	execute(enrollmentRequest: any) {
		const student = new Student(
			enrollmentRequest.student.name,
			enrollmentRequest.student.cpf
		);
		const level = this.levels.find(
			(level) => level.code === enrollmentRequest.level
		);
		if (!level) throw new Error("Level not found");
		const module = this.modules.find(
			(module) =>
				module.level === enrollmentRequest.level &&
				module.code === enrollmentRequest.module
		);
		if (!module) throw new Error("Module not found");

		const clazz = this.classes.find(
			(clazz) => clazz.code === enrollmentRequest.class
		);
		if (!clazz) throw new Error("Class not found");
		const age =
			new Date().getFullYear() -
			new Date(enrollmentRequest.student.birthDate).getFullYear();

		if (age < module.minimumAge) throw new Error("Student below minimum age");

		const studentsEnrolledInClass = this.enrollments.filter(
			(enrollment) =>
				enrollment.level === enrollmentRequest.level &&
				enrollment.module === enrollmentRequest.module &&
				enrollment.class === enrollmentRequest.class
		);
		if (studentsEnrolledInClass.length === clazz.capacity)
			throw new Error("Class is over capacity");
		const existingEnrollment = this.enrollments.find(
			(enrollment) =>
				enrollment.student.cpf.value === enrollmentRequest.student.cpf
		);
		if (existingEnrollment)
			throw new Error("Enrollment with duplicated student not allowed");
		const enrollmentDate = new Date();
		const sequence = String(this.enrollments.length + 1).padStart(4, "0");
		enrollmentDate.getFullYear();
		const code = `${enrollmentDate.getFullYear()}${level.code}${module.code}${
			clazz.code
		}${sequence}`;
		const enrollment = {
			student,
			code,
			level: level.code,
			module: module.code,
			class: clazz.code
		};
		this.enrollments.push(enrollment);
		return enrollment;
	}
}