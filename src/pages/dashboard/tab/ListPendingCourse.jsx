import { Avatar, Button, Card, Modal, Table, Tag, notification } from "antd";
import { useEffect, useState } from "react";
import useAllTopic from "../../../hook/topic/useAllTopic";
import VideoPlayer from "../../expert/conponents/Video";
import useAllPendingCourse from "../../../hook/course/useAllPendingCourse";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/http";
import useToken from "../../../hook/user/useToken";
import useAllUser from "../../../hook/user/useAllUser";
const ListCourseTab = () => {
  const queryClient = useQueryClient();
  const token = useToken();
  let courses = useAllPendingCourse();
  const [course, setCourse] = useState();
  const [activeId, setActiveId] = useState();
  const [isShowActiveModal, setIsShowActiveModal] = useState(false);
  const users = useAllUser();
  const findUserEmailById = (userId) => {
    return users?.find((user) => user.id == userId)?.email;
  };
  const handleCancel = () => {
    setIsShowActiveModal(false);
    setActiveId(undefined);
  };
  useEffect(() => {
    const newCourse = courses?.find((i) => i.id == course?.id);
    setCourse(newCourse);
  }, [courses, course?.id]);
  const topics = useAllTopic();
  const getTopicName = (id) => {
    return topics.find((i) => i.id == id)?.name;
  };
  const activeMutation = useMutation({
    mutationFn: (id) => {
      return api.put(
        `/course/active/${id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
    },
  });
  const handleActiveCourse = () => {
    activeMutation.mutate(activeId, {
      onSuccess() {
        setIsShowActiveModal(false);
        setActiveId(undefined);
        notification.success({ message: "Successfully" });
        queryClient.invalidateQueries("PENDING_COURSE");
        queryClient.invalidateQueries("PUBLIC_COURSE");
      },
    });
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Expert",
      dataIndex: "expert",
      key: "expert",
    },
    {
      title: "Price (USD)",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Banner",
      dataIndex: "banner",
      key: "banner",
    },
    {
      title: "Topic",
      dataIndex: "topic",
      key: "topic",
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];
  const handleOpenActiveModal = (courseId) => {
    setIsShowActiveModal(true);
    setActiveId(courseId);
  };
  const data = courses?.map((course) => {
    return {
      key: course.id,
      id: course.id,
      expert: findUserEmailById(course.expertId),
      price: course.price,
      name: course.name,
      banner: <Avatar shape="square" size={100} src={course.bannerUrl} />,
      topic: getTopicName(course.topicId),
      state: (
        <Tag color={course.state === "pending" ? "gold" : "green"}>
          {course.state}
        </Tag>
      ),
      action: (
        <>
          <Button onClick={() => setCourse(course)} style={{ color: "blue" }}>
            Detail
          </Button>
          <Button
            onClick={() => handleOpenActiveModal(course.id)}
            loading={activeMutation.isPending}
            style={{ color: "blue" }}
          >
            Active
          </Button>
        </>
      ),
    };
  });
  const gridStyle = {
    width: "33.333%",
    textAlign: "center",
  };

  const renderCourseDetail = () => {
    return (
      <div className="flex flex-col">
        <div className="flex justify-between w-full items-center">
          <Button
            onClick={() => setCourse(null)}
            className="w-[150px] mt-4 mb-3  text-white bg-[#7F00FF]"
          >
            &larr; Back
          </Button>
        </div>

        <Card
          className="text-left"
          title={
            <div className="flex items-center justify-between">
              <span className="text-[25px]">{course.name}</span>{" "}
            </div>
          }
        >
          {course.lessons.map((lesson) => (
            <Card.Grid key={lesson.id} style={gridStyle}>
              <VideoPlayer key={lesson.id} lesson={lesson} />
              <Card type="inner" title=""></Card>
            </Card.Grid>
          ))}
        </Card>
      </div>
    );
  };

  return (
    <div className=" h-full w-full text-center px-5">
      {course ? (
        renderCourseDetail()
      ) : (
        <>
          <h1 className="mt-12 mb-16 text-5xl font-bold">List course</h1>
          <Table columns={columns} dataSource={data} />
        </>
      )}
      <Modal
        title="Active course"
        open={isShowActiveModal}
        onCancel={handleCancel}
        onOk={handleActiveCourse}
      >
        <p>Are you sure to active this course?</p>
      </Modal>
    </div>
  );
};
export default ListCourseTab;
