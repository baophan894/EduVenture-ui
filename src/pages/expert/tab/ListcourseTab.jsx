import useAllExpertCourse from "../../../hook/course/useAllExpertCourse";
import {
  Avatar,
  Button,
  Card,
  Form,
  Input,
  Modal,
  Select,
  Table,
  Tag,
  notification,
} from "antd";
import useAllTopic from "../../../hook/topic/useAllTopic";
import { useEffect, useState } from "react";
import VideoPlayer from "../conponents/Video";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/http";
import useAllStudent from "../../../hook/course/useAllStudent";
import formatDate from "../../../helpers/formatDate";
import { PlusCircleOutlined } from "@ant-design/icons";
const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024;
const ListCourseTab = () => {
  const queryClient = useQueryClient();
  const [isViewLessonModal, setIsViewLessonModal] = useState(false);
  let courses = useAllExpertCourse();
  const [course, setCourse] = useState();
  const [courseUpdate, setCourseUpdate] = useState();
  const [form] = Form.useForm();
  const { data: studentsData, isLoading } = useAllStudent(course?.id);
  useEffect(() => {
    const newCourse = courses?.find((i) => i.id == course?.id);
    setCourse(newCourse);
  }, [courses]);
  const topics = useAllTopic();
  const topicOptions = () => {
    return topics?.map((topic) => ({
      value: topic.id.toString(),
      label: <span>{topic.name}</span>,
    }));
  };
  const [bannerFileList, setBannerFileList] = useState();
  const [lessonList, setLessonList] = useState();
  const updateCourseMutation = useMutation({
    mutationFn: ({ formData, id }) => {
      return api.put(`/expert/course/${id}`, formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
    },
  });

  const addLessonMutation = useMutation({
    mutationFn: ({ formData, id }) => {
      return api.post(`/expert/add/lesson/${id}`, formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
    },
  });

  const onFinishAddLesson = () => {
    let formData = new FormData();
    for (let i = 0; i < lessonList.length; i++) {
      formData.append("files", lessonList[i]);
    }
    addLessonMutation.mutate(
      { formData, id: course?.id },
      {
        onSuccess() {
          queryClient.invalidateQueries("EXPERT_COURSE");
          notification.success({ message: "update successfully" });
          setIsViewLessonModal(false);
        },
        onError(data) {
          notification.success({ message: data.response.data.message });
        },
      }
    );
  };
  const handleChangeBanner = (info) => {
    const file = info.files[0];
    if (!file.type.includes("image")) {
      notification.error({ message: "Banner must be an mp4 video" });
      setBannerFileList(null);
    } else {
      setBannerFileList(info.files);
    }
  };

  const handleChangeLessons = (info) => {
    const regex = /^\d+-[^.]+\.mp4$/;
    const list = info.files;
    for (let i = 0; i < list.length; i++) {
      if (!list[i].type.includes("video")) {
        notification.error({ message: "Lesson must be an image" });
        setLessonList(null);
        return;
      }
      if (!regex.test(list[i].name)) {
        notification.error({
          message: "Please follow platform format <order>-<filename.mp4> ",
        });
        setLessonList(null);
        return;
      }
      if (list[i].size > MAX_FILE_SIZE_BYTES) {
        notification.error({
          message: "Maximum is 20MB ",
        });
        setLessonList(null);
        return;
      }
    }
    setLessonList(list);
  };
  const [idUpdate, setIdUpdate] = useState();
  const token = localStorage.getItem("token");
  const [isModalAboutOpen, setIsModalAboutOpen] = useState(false);
  const handleAboutCancel = () => {
    form.resetFields();
    setIsModalAboutOpen(false);
  };
  const updateLesson = useMutation({
    mutationFn: (formData) => {
      return api.put(`/expert/lesson/${idUpdate}`, formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
    },
  });
  const getTopicName = (id) => {
    return topics.find((i) => i.id == id)?.name;
  };
  const handleUpdateButton = (value) => {
    setCourseUpdate(value);
    setIsModalAboutOpen(true);
  };
  useEffect(() => {
    if (courseUpdate) {
      form.setFieldsValue(courseUpdate);
    }
  }, [courseUpdate, form]);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
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

  const data = courses?.map((course) => {
    return {
      id: course.id,
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
          <Button
            className="mr-2"
            onClick={() => handleUpdateButton(course)}
            style={{ color: "blue" }}
          >
            Update information
          </Button>
          <Button onClick={() => setCourse(course)} style={{ color: "blue" }}>
            Detail
          </Button>
        </>
      ),
    };
  });
  const gridStyle = {
    width: "33.333%",
    textAlign: "center",
  };
  const handleChangeLesson = (info) => {
    const file = info.files[0];
    const regex = /^\d+-[^.]+\.mp4$/;
    if (!file.type.includes("video")) {
      notification.error({ message: "Lesson must be an image" });
      return;
    }
    if (!regex.test(file.name)) {
      notification.error({
        message: "Please follow platform format <order>-<filename.mp4> ",
      });

      return;
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      notification.error({
        message: "Maximum is 20MB ",
      });

      return;
    }
    let formData = new FormData();
    formData.append("video", file);
    updateLesson.mutate(formData, {
      onSuccess() {
        queryClient.invalidateQueries("EXPERT_COURSE");

        notification.success({ message: "Successfully" });
      },
      onError(data) {
        notification.success({ message: data.response.data.message });
      },
    });
  };
  const renderCourseDetail = () => {
    const columns = [
      {
        title: "Student",
        dataIndex: "student",
      },
      {
        title: "Join At",
        dataIndex: "jointAt",
      },
    ];
    const dataSource = studentsData?.data?.map((student) => ({
      student: (
        <div>
          <Avatar src={student.avatarUrl} />
          <span className="ml-2">{student.fullName}</span>
        </div>
      ),
      jointAt: formatDate(new Date(student.joinAt)),
    }));
    return (
      <div className="flex flex-col">
        <div className="flex justify-between w-full items-center">
          <Button
            onClick={() => setCourse(null)}
            className="w-[150px] mt-4 mb-3  text-white bg-[#7F00FF]"
          >
            &larr; Back
          </Button>
          <button
            onClick={() => setIsViewLessonModal(true)}
            className="mr-5 p-2 rounded hover:bg-[#7F00FF] hover:text-[white]"
          >
            {" "}
            <span className="mr-[3px]">Add Lesson</span> <PlusCircleOutlined />
          </button>
        </div>

        <Card
          className="text-left"
          title={
            <div className="flex items-center justify-between">
              <span className="text-[25px]">{course.name}</span>{" "}
              <div>
                {" "}
                <Tag color={"green"}>{course?.totalUserBuy} Student</Tag>
                <Tag color={"gold"}>Make {course?.income} USD</Tag>
              </div>
            </div>
          }
        >
          {course.lessons.map((lesson) => (
            <Card.Grid key={lesson.id} style={gridStyle}>
              <VideoPlayer key={lesson.id} lesson={lesson} />
              <Card type="inner" title="Update new lesson">
                <span>
                  {" "}
                  Example file name: {lesson.lessonOrder}-filename.mp4 (Maximum:
                  20MB size)
                </span>
                {updateLesson.isPending ? (
                  <Button loading>Wait for upload video</Button>
                ) : (
                  <input
                    onChange={(e) => handleChangeLesson(e.target)}
                    onClick={() => setIdUpdate(lesson.id)}
                    type="file"
                    id="file"
                    name="file"
                  />
                )}
              </Card>
            </Card.Grid>
          ))}
        </Card>
        <Table
          title={() => <span className="text-xl font-bold">Student List</span>}
          loading={isLoading}
          columns={columns}
          dataSource={dataSource}
          bordered
        />
      </div>
    );
  };
  const updateCourse = (values) => {
    let formData = new FormData();
    if (bannerFileList) formData.append("banner", bannerFileList[0]);

    formData.append("topicId", values.topicId);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("name", values.name);
    updateCourseMutation.mutate(
      { formData, id: courseUpdate?.id },
      {
        onSuccess() {
          notification.success({ message: "Update successfully" });
          queryClient.invalidateQueries("EXPERT_COURSE");
          setIsModalAboutOpen(false);
        },
        onError(data) {
          notification.success({ message: data.response.data.message });
        },
      }
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
        footer=""
        title="Edit About"
        open={isModalAboutOpen}
        onCancel={handleAboutCancel}
      >
        <Form
          form={form}
          onFinish={updateCourse}
          initialValues={courseUpdate}
          layout="vertical"
        >
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="topicId" label="Topic" rules={[{ required: true }]}>
            <Select placeholder="Select topic" options={topicOptions()} />
          </Form.Item>
          <Form.Item label="Banner image" rules={[{ required: true }]}>
            <input
              onChange={(e) => handleChangeBanner(e.target)}
              type="file"
              title="Choose course banner"
            />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price(USD)"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            {updateCourseMutation.isPending ? (
              <Button loading>Update</Button>
            ) : (
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            )}
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        footer=""
        title={`Add a lesson`}
        open={isViewLessonModal}
        onCancel={() => setIsViewLessonModal(false)}
      >
        <Form onFinish={onFinishAddLesson} layout="vertical">
          <Form.Item label="Document file" rules={[{ required: true }]}>
            <input
              multiple
              onChange={(e) => handleChangeLessons(e.target)}
              type="file"
            />
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Button
              loading={addLessonMutation.isPending}
              type="primary"
              htmlType="submit"
            >
              Upload
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default ListCourseTab;
