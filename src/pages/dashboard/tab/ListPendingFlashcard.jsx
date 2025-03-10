import useAllFlashCard from "../../../hook/flashcard/useAllFlashCard";
import { Button, Table, notification } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/http";
import { useNavigate } from "react-router-dom";

const ListPendingFlashcard = () => {
  const queryClient = useQueryClient();
  const flashcards = useAllFlashCard();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const activeMutation = useMutation({
    mutationFn: ({ formData }) => {
      return api.put(`/flashcard/acitve`, formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
    },
  });

  const handleActive = (flashcardId) => {
    const formData = new FormData();
    formData.append("flashcardId", flashcardId + "");
    activeMutation.mutate(
      { formData },
      {
        onSuccess() {
          notification.success({ message: "Successfully" });
          queryClient.invalidateQueries("documents");
        },
      }
    );
  };
  const pendingFlashCards = flashcards?.filter(
    (flashcard) => flashcard.state === "pending"
  );

  const dataSource = pendingFlashCards?.map((flashcard) => {
    return {
      flashcardName: flashcard.name,
      flashcardId: flashcard.id,
      topic: flashcard.topicId,
      descriptions: flashcard.description,
      action: (
        <>
          <Button
            className="mr-2"
            style={{ color: "blue" }}
            onClick={() => handleActive(flashcard.id)}
          >
            Active
          </Button>
          <Button onClick={() => navigate(`/flashcard/detail/${flashcard.id}`)}>
            Detail
          </Button>
        </>
      ),
    };
  });

  const columns = [
    {
      title: "FlashcardName",
      dataIndex: "flashcardName",
      key: "flashcardName",
    },
    {
      title: "FlashcardId",
      dataIndex: "flashcardId",
      key: "flashcardId",
    },
    {
      title: "Topic",
      dataIndex: "topic",
      key: "topic",
    },
    {
      title: "Descriptions",
      dataIndex: "descriptions",
      key: "descriptions",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];
  return (
    <div className=" h-full w-full text-center px-5">
      <h1 className="mt-12 mb-16 text-5xl font-bold">
        List Pending Flashcards
      </h1>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};
export default ListPendingFlashcard;
