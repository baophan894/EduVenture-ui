import { Button, Modal, notification, Table } from "antd";
import formatDate from "../../../helpers/formatDate";
import useAllExpertRequest from "../../../hook/expertRequest/useAllExpertRequest";
import useAllUser from "../../../hook/user/useAllUser";
import Loading from "../../../components/loading";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/http";
import useToken from "../../../hook/user/useToken";

const ExpertRequest = () => {
  const queryClient = useQueryClient();
  const token = useToken();
  const [openAcceptModal, setOpenAcceptModal] = useState(false);
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const expertRequests = useAllExpertRequest();
  const users = useAllUser();
  const getEmailByUserId = (id) => {
    return users?.find((user) => user.id == id).email;
  };
  const [requestId, setRequestId] = useState();
  const acceptMutation = useMutation({
    mutationFn: (id) => {
      return api.put(
        `expert-request/accept/${id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (id) => {
      return api.put(
        `expert-request/reject/${id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
    },
  });
  const handleReject = () => {
    rejectMutation.mutate(requestId, {
      onSuccess() {
        notification.success({ message: "Successfully" });
        queryClient.invalidateQueries("expert_request");
      },
    });
    setOpenRejectModal(false);
  };

  const handleAccept = () => {
    acceptMutation.mutate(requestId, {
      onSuccess() {
        notification.success({ message: "Successfully" });
        queryClient.invalidateQueries("expert_request");
        setOpenAcceptModal(false);
      },
    });
  };
  const handleCancelReject = () => {
    setOpenRejectModal(false);
  };
  const handleCancelAccept = () => {
    setOpenAcceptModal(false);
  };
  const handleOpenModal = (type, id) => {
    setRequestId(id);
    if (type == "accept") {
      setOpenAcceptModal(true);
    } else {
      setOpenRejectModal(true);
    }
  };
  const columns = [
    {
      title: "Index",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "CV",
      dataIndex: "cv",
      key: "cv",
    },
    {
      title: "Time",
      dataIndex: "createdAt",
      key: "createdAt",
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
  const data = expertRequests?.map((expertRequest, index) => {
    return {
      index: index + 1,
      email: getEmailByUserId(expertRequest.userId),
      cv: <a href={expertRequest.cvUrl}>View cv</a>,
      createdAt: formatDate(new Date(expertRequest.createdAt)),
      state: expertRequest.state,
      action: expertRequest.state == "PENDING" && (
        <>
          <Button
            onClick={() => handleOpenModal("accept", expertRequest.id)}
            type="primary"
          >
            Accept
          </Button>
          <Button
            danger
            onClick={() => handleOpenModal("reject", expertRequest.id)}
            className="ml-2"
          >
            Reject
          </Button>
        </>
      ),
    };
  });
  return (
    <div className=" h-full w-full text-center px-5">
      {expertRequests ? (
        <>
          <h1 className="mt-12 mb-16 text-5xl font-bold">Expert requests</h1>
          <Table columns={columns} dataSource={data} />
        </>
      ) : (
        <Loading />
      )}
      <Modal
        title="Accept request"
        open={openAcceptModal}
        onOk={handleAccept}
        onCancel={handleCancelAccept}
        confirmLoading={acceptMutation.isPending}
      >
        <p>Are you sure to accept this request</p>
      </Modal>
      <Modal
        title="Accept request"
        open={openRejectModal}
        onOk={handleReject}
        onCancel={handleCancelReject}
        confirmLoading={rejectMutation.isPending}
      >
        <p>Are you sure to reject this request</p>
      </Modal>
    </div>
  );
};
export default ExpertRequest;
