import Student from "./Student";
import Level from "./Level";
import Module from "./Module";
import Classroom from "./Classroom";
import EnrollmentCode from "./EnrollmentCode";
import Invoice from "./Invoice";

export default class Enrollment {
	student: Student;
	level: Level;
	module: Module;
	classRoom: Classroom;
	code: EnrollmentCode;
	issueDate: Date;
	sequence: number;
	installments: number;
	invoices: Invoice[];

	constructor(
		student: Student,
		level: Level,
		module: Module,
		classRoom: Classroom,
		issueDate: Date,
		sequence: number,
		installments: number = 12
	) {
		if (student.getAge() < module.minimumAge)
			throw new Error("Student below minimum age");
		if (classRoom.isFinished(issueDate)) {
			throw new Error("Class is already finished");
		}
		if (classRoom.getProgress(issueDate) > 25) {
			throw new Error("Class is already started");
		}
		this.student = student;
		this.level = level;
		this.module = module;
		this.classRoom = classRoom;
		this.sequence = sequence;
		this.issueDate = issueDate;

		this.code = new EnrollmentCode(
			level.code,
			module.code,
			classRoom.code,
			issueDate,
			sequence
		);
		this.invoices = [];
		this.installments = installments;
		this.generateInvoices();
	}
	generateInvoices() {
		let installmentAmount =
			Math.trunc((this.module.price / this.installments) * 100) / 100;
		for (let i = 1; i <= this.installments; i++) {
			this.invoices.push(
				new Invoice(
					this.code.value,
					i,
					this.issueDate.getFullYear(),
					installmentAmount
				)
			);
		}
		const total = this.invoices.reduce((total, invoice) => {
			total += invoice.amount;
			return total;
		}, 0);

		const rest = Math.trunc((this.module.price - total) * 100) / 100;
		this.invoices[this.installments - 1].amount = installmentAmount + rest;
	}
}
