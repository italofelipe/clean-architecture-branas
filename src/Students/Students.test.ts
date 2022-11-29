import EnrollStudent from ".";

test("Should not enroll without a valid student name", () => {
	const enrollStudent = new EnrollStudent();
	const enrollmentRequest = {
		student: {
			name: "Ana"
		},
		level: "EM",
		module: "1",
		class: "A"
	};
	expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(
		new Error("Invalid name")
	);
});

test("Should not enroll without a valid CPF", function () {
	const enrollStudent = new EnrollStudent();
	const enrollmentRequest = {
		student: {
			name: "Ana Maria",
			cpf: "213.345.654-10"
		},
		level: "EM",
		module: "1",
		class: "A"
	};
	expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(
		new Error("Invalid CPF")
	);
});

test("Should not enroll duplicated student", function () {
	const enrollStudent = new EnrollStudent();
	const enrollmentRequest = {
		student: {
			name: "Ana Maria",
			cpf: "864.464.227-84"
		},
		level: "EM",
		module: "1",
		class: "A"
	};
	enrollStudent.execute(enrollmentRequest);
	expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(
		new Error("Enrollment with duplicated student not allowed")
	);
});

test("Should generate enrollment code", () => {
	const enrollStudent = new EnrollStudent();
	const enrollmentRequest = {
		student: {
			name: "Ana Maria",
			cpf: "864.464.227-84"
		},
		level: "EM",
		module: "1",
		class: "A"
	};
	const enrollment = enrollStudent.execute(enrollmentRequest);
	expect(enrollment.code).toBe("2022EM1A0001");
});

test("Should enroll student below minimum age", () => {
	const enrollStudent = new EnrollStudent();
	const enrollmentRequest = {
		student: {
			name: "Ana Maria",
			cpf: "864.464.227-84",
			birthDate: "2015-03-12"
		},
		level: "EM",
		module: "1",
		class: "A"
	};
	expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(
		new Error("Student below minimum age")
	);
});

test("Should not enroll student over class capacity", () => {
	const enrollStudent = new EnrollStudent();
	enrollStudent.execute({
		student: {
			name: "Ana Maria",
			cpf: "864.464.227-84"
		},
		level: "EM",
		module: "1",
		class: "A"
	});
	enrollStudent.execute({
		student: {
			name: "Zezim Araujo",
			cpf: "062.650.031-19"
		},
		level: "EM",
		module: "1",
		class: "A"
	});
	const enrollmentRequest = {
		student: {
			name: "Picapau Silva",
			cpf: "583.811.981-00"
		},
		level: "EM",
		module: "1",
		class: "A"
	};
	expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(
		new Error("Class is over capacity")
	);
});
