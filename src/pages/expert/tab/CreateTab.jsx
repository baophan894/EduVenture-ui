import { Button, Form, Input, Select, notification } from "antd";
import { useState } from "react";
import useAllTopic from "../../../hook/topic/useAllTopic";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/http";
const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024;
const CreateTab = () => {
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();
  const createCourse = useMutation({
    mutationFn: (formData) => {
      return api.post("/expert/course", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
    },
  });

  const topics = useAllTopic();
  const topicOptions = () => {
    return topics?.map((topic) => ({
      value: topic.id,
      label: <span>{topic.name}</span>,
    }));
  };

  const [bannerFileList, setBannerFileList] = useState();
  const [lessonList, setLessonList] = useState();
  const isDisableCreate = bannerFileList && lessonList;
  const handleChangeLessons = (info) => {
    const regex = /^\d+-[^.]+\.mp4$/;
    const list = info.files;
    for (let i = 0; i < list.length; i++) {
      if (!list[i].type.includes("video")) {
        notification.error({ message: "Lesson must be an mp4 video" });
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
  const handleChangeBanner = (info) => {
    const file = info.files[0];
    if (!file.type.includes("image")) {
      notification.error({ message: "Banner must be an image" });
      setBannerFileList(null);
    } else {
      setBannerFileList(info.files);
    }
  };
  const onFinish = (values) => {
    let formData = new FormData();
    formData.append("banner", bannerFileList[0]);
    for (let i = 0; i < lessonList.length; i++) {
      formData.append("files", lessonList[i]);
    }

    formData.append("topic_id", values.topic);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("name", values.name);
    createCourse.mutate(formData, {
      onSuccess() {
        queryClient.invalidateQueries("EXPERT_COURSE");
        notification.success({ message: "Created successfully" });
      },
      onError(data) {
        notification.success({ message: data.response.data.message });
      },
    });
  };
  return (
    <div className="content">
      <div>
        <h1 className="my-4">Create course</h1>
      </div>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="topic" label="Topic" rules={[{ required: true }]}>
          <Select placeholder="Select topic" options={topicOptions()} />
        </Form.Item>
        <Form.Item label="Banner image" rules={[{ required: true }]}>
          <input
            onChange={(e) => handleChangeBanner(e.target)}
            type="file"
            title="Choose course banner"
          />
        </Form.Item>
        <Form.Item label="Lesson videos  (Change your file name platform format <order>-<filename.mp4> , Ex: 1-Lesson1.mp4 | Maximum: 20MB size) ">
          <input
            multiple
            onChange={(e) => handleChangeLessons(e.target)}
            type="file"
            title="Choose lesson video"
          />
        </Form.Item>
        <Form.Item name="price" label="Price(USD)" rules={[{ required: true }]}>
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
          {createCourse.isPending ? (
            <Button loading type="primary">
              Please wait for upload your course
            </Button>
          ) : (
            <Button
              disabled={!isDisableCreate}
              type="primary"
              htmlType="submit"
            >
              Create
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};
export default CreateTab;
