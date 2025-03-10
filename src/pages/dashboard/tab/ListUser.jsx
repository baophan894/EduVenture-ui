import useAllUser from "../../../hook/user/useAllUser";
import {
  Button,
  Card,
  Col,
  Input,
  Modal,
  Row,
  Table,
  notification,
} from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/http";
import Statistic from "antd/es/statistic/Statistic";
import CountUp from "react-countup";
import { useEffect, useState } from "react";
import useToken from "../../../hook/user/useToken";
const { Search } = Input;

const ListUser = () => {
  //common//
  const token = useToken();
  const queryClient = useQueryClient();
  //common//
  //get data//
  const statistics = useQuery({
    queryKey: ["statistics"],
    queryFn: () =>
      api.get("admin/statistics", {
        headers: {
          Authorization: token,
        },
      }),
  })?.data?.data;
  const Users = useAllUser();
  //get data//

  //state//
  const [displayUsers, setDisplayUsers] = useState(Users);
  const [isShowUpdateUserState, setIsShowUpdateUserState] = useState(false);
  const [userUpdate, setUserUpdate] = useState();
  //state//

  //function//
  const handleCancel = () => {
    setIsShowUpdateUserState(false);
    setUserUpdate(undefined);
  };
  const handleUpdateUserState = () => {
    updateStateMutation.mutate(
      {
        id: userUpdate.id,
        state: userUpdate.state == -1 ? 1 : -1,
      },
      {
        onSuccess() {
          notification.success({ message: "User updated" });
          setIsShowUpdateUserState(false);
          setUserUpdate(undefined);
          queryClient.invalidateQueries("PUBLIC_USER");
        },
      }
    );
    setIsShowUpdateUserState(false);
    setUserUpdate(undefined);
  };
  const handleOpenModal = (user) => {
    setUserUpdate(user);
    setIsShowUpdateUserState(true);
  };
  const onSearch = (value) => {
    setDisplayUsers(Users.filter((user) => user.email.includes(value.trim())));
  };
  const getStateText = (state) => {
    return state == -1 ? "Unban" : "Ban";
  };
  //function//

  //effect//
  useEffect(() => {
    setDisplayUsers(Users);
  }, [Users]);
  //effect//

  //mutation//
  const updateStateMutation = useMutation({
    mutationFn: ({ id, state }) => {
      return api.put(`user/state/${id}`, state, {
        headers: {
          Authorization: token,
        },
      });
    },
  });

  //mutation//

  const dataSource = displayUsers?.map((user, index) => {
    return {
      index: index + 1,
      userName: user.fullName,
      email: user.email,
      role: user.role,
      action: (
        <Button
          className="mr-2"
          style={{ color: "red" }}
          onClick={() => handleOpenModal(user)}
        >
          {getStateText(user.state)}
        </Button>
      ),
    };
  });

  const columns = [
    {
      title: "Index",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Full Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];
  const formatter = (value) => <CountUp end={value} separator="," />;
  return (
    <div className=" h-full w-full text-center px-5">
      <Row gutter={16} className="mt-5">
        <Col span={12}>
          <Card hoverable>
            <Statistic
              title="Platform user"
              value={statistics?.totalUser}
              formatter={formatter}
              suffix="User"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card hoverable>
            <Statistic
              title="Platform expert"
              value={statistics?.expert}
              precision={2}
              suffix="Expert"
              formatter={formatter}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} className="mt-5">
        <Col span={12}>
          <Card hoverable>
            <Statistic
              title="Platform income"
              value={statistics?.totalIncome}
              formatter={formatter}
              suffix="USD"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card hoverable>
            <Statistic
              title="Resource"
              value={statistics?.totalDocument + statistics?.totalFlashcard}
              formatter={formatter}
              suffix="Resource"
            />
          </Card>
        </Col>
      </Row>
      <div className="mt-4">
        <div className="flex justify-end mb-2">
          <Search
            className="w-[30%]"
            placeholder="input email to search"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
        </div>

        <Table dataSource={dataSource} columns={columns} />
      </div>
      <Modal
        title="Update user state"
        open={isShowUpdateUserState}
        onCancel={handleCancel}
        onOk={handleUpdateUserState}
        confirmLoading={updateStateMutation.isPending}
      >
        <p>Are you sure to {getStateText(userUpdate?.state)} this user?</p>
      </Modal>
    </div>
  );
};
export default ListUser;
