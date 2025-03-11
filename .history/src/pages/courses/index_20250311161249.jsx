import { Col, Pagination, Row } from "antd";
import CourseCard from "./components/courseCard";
import useAllTopic from "../../hook/topic/useAllTopic";
import Search from "../../components/search";
import { useEffect, useState } from "react";
import useAllPublicCourse from "../../hook/course/useAllUserCourse";
import useAllUser from "../../hook/user/useAllUser";
import Loading from "../../components/loading";
const ITEM_DISPLAY = 12;
const CourseScreen = () => {
  const [page, setPage] = useState(1);
  const onChangePage = (page) => {
    setPage(page);
  };
  const experts = useAllUser();
  const findExpertById = (id)=>{
    return experts?.find(expert => expert.id == id);
  }
  const {courses} = useAllPublicCourse();
  const topics = useAllTopic();
  const [topicFilter, setTopicFilter] = useState();
  const [search, setSearch] = useState("");
  const [displayCourses, setDisplayCourses] = useState([]);

  useEffect(() => {
    let filteredCourses = courses;
    if (topicFilter) {
      filteredCourses = courses.filter(
        (course) => course.topicId == topicFilter
      );
    }
    if (search) {
      filteredCourses = courses.filter((course) =>
        course.name.toLowerCase().trim().includes(search.toLowerCase().trim())
      );
    }
    const startIndex = (page - 1) * ITEM_DISPLAY;
    const endIndex = startIndex + ITEM_DISPLAY;
    setDisplayCourses(filteredCourses?.slice(startIndex, endIndex));
  }, [courses, page, topicFilter, search]);
  const isDataReady = experts && courses && topics;
  return !isDataReady ?  <Loading/> : (
    <div className="min-h-[100vh] px-[50px]  ">
      <div className="fixed z-20 border-1  inset-x-0 top-[59px] border-2  ">
        <div className="flex justify-between bg-white items-center border-b">
          <div className="flex overflow-x-auto">
            <span
              onClick={() => setTopicFilter("")}
              key="all"
              className="p-[16px] hover:bg-slate-200 whitespace-nowrap"
            >
              All
            </span>
            {topics?.map((topic) => (
              <span
                onClick={() => setTopicFilter(topic.id)}
                key={topic.id}
                className="p-[16px] hover:bg-slate-200 whitespace-nowrap"
              >
                {topic.name}
              </span>
            ))}
          </div>
          <Search setSearch={setSearch} />
        </div>
      </div>
      <Row gutter={[16, 40]} className="pt-[100px]">
        {displayCourses?.map((course) => {
          return (
            <Col key={course.id} className="gutter-row" xs={24} sm={12} md={6}>
              <CourseCard expert={findExpertById(course.expertId)} course={course} />
            </Col>
          );
        })}
      </Row>
      <Pagination
        style={{ textAlign: "center" }}
        defaultCurrent={1}
        total={courses?.length}
        onChange={onChangePage}
      />
    </div>
  );
};
export default CourseScreen;
