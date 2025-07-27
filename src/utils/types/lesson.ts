export type Lesson = {
	_id: string;
	date: string;
	courseId: string;
	name: string;
	students: Array<StudentAttendance>;
};

export type StudentAttendance = {
	attending: boolean;
	className: string;
	name: string;
	note: string;
	schoolName: string;
	studentId: string;
};
