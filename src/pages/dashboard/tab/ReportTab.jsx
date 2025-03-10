import useAllReport from "../../../hook/reports/useAllReport";
import { Button, Table, notification } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/http";
import { useNavigate } from "react-router-dom";
import useAllUser from "../../../hook/user/useAllUser";

const ReportTab = () => {
  //common
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();
  //common
  //get data
  let reports = useAllReport();
  const users = useAllUser();
  //get data

  //mutation
  const handleReportMutation = useMutation({
    mutationFn: (id) => {
      return api.put(`report-handle/${id}`, {
        headers: {
          Authorization: token,
        },
      });
    },
  });
  //mutation
  //handle function
  const getUserEmailById = (userId) => {
    return users?.find((user) => user.id == userId)?.email;
  };

  //handle function
  //call api
  const handleReport = (id) => {
    handleReportMutation.mutate(id, {
      onSuccess() {
        notification.success({ message: "Successfully" });
        queryClient.invalidateQueries("reports");
        queryClient.invalidateQueries("documents");
        queryClient.invalidateQueries("flashcards");
        queryClient.invalidateQueries("PUBLIC_COURSE");
      },
    });
  };
  //call api
  const dataSource = reports?.map((report) => {
    return {
      resourceType: report.resourceType,
      reporter: getUserEmailById(report.userId),
      reason: report.reason,
      action: (
        <>
          <Button
            className="mr-2"
            style={{ color: "blue" }}
            onClick={() => handleReport(report.id)}
          >
            {report.resourceType == "post" ? "Delete" : "Unactive"}
          </Button>
          <Button
            onClick={() =>
              navigate(`/${report.resourceType}/detail/${report.resourceId}`)
            }
          >
            Resource Detail
          </Button>
        </>
      ),
    };
  });

  const columns = [
    {
      title: "ResourceType",
      dataIndex: "resourceType",
      key: "resourceType",
    },
    {
      title: "Reporter",
      dataIndex: "reporter",
      key: "reporter",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];
  return (
    <div className=" h-full w-full text-center px-5">
      <h1 className="mt-12 mb-16 text-5xl font-bold">List Report</h1>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};
export default ReportTab;
