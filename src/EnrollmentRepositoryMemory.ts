import EnrollmentRepository from "./EnrollmentRepository";
import Enrollment from "./Enrollment";

export default class EnrollmentRepositoryMemory
implements EnrollmentRepository
{
	enrollments: Enrollment[];

	constructor() {
		this.enrollments = [];
	}

	count(): number {
		return this.enrollments.length;
	}

	findAllByClass(level: string, module: string, clazz: string): any {
		return this.enrollments.filter(
			(enrollment) =>
				enrollment.level === level &&
				enrollment.module === module &&
				enrollment.clazz === clazz
		);
	}

	findByCpf(cpf: string): any {
		return this.enrollments.find(
			(enrollment) => enrollment.student.cpf.value === cpf
		);
	}

	save(enrollment: any): void {
		this.enrollments.push(enrollment);
	}
}
