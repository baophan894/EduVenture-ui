import Loading from "../../../../components/loading";
import useAllBoughtCourse from "../../../../hook/course/useAllBoughtCourse";
import useAllExpert from "../../../../hook/user/useAllUser";
import CourseCard from "./CourseCard";
import MyLearningStyle from "./MylearningStyle";

const MyLearning = () => {
  const courses = useAllBoughtCourse();
  const experts = useAllExpert();
  const findExpertById = (id) => {
    return experts?.find((expert) => expert.id == id);
  };
  const numOfCourseBought = courses?.length;
  return (
    !!numOfCourseBought &&
    (courses ? (
      <MyLearningStyle>
        <div className="my-learning">
          <div className="my-learning_heading">
            <p className="my-learning_heading__title">My learning</p>
          </div>
          <div className="my-learning_courses">
            {courses?.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                expert={findExpertById(course.id)}
              />
            ))}
          </div>
        </div>
      </MyLearningStyle>
    ) : (
      <Loading />
    ))
  );
};
export default MyLearning;
