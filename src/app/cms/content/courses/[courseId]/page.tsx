import CourseLessons from "components/Cms/CourseLessons/CourseLessons";

export default async function CourseLessonsPage({ params }: { params: Promise<{ courseId: string }> }) {
	const { courseId } = await params;

	return <CourseLessons courseId={courseId} />;
}
