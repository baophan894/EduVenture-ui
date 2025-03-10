import { Table } from "antd";
import MyLearningStyle from "../myLearning/MylearningStyle";


import useExpertRequestByUserId from "../../../../hook/expertRequest/userExpertRequestByUserId";
import formatDate from "../../../../helpers/formatDate";
import useAllUser from "../../../../hook/user/useAllUser";
const MyRequest = () => {
    const users = useAllUser();
    const getEmailByUserId = (id) => {
        return users?.find((user) => user.id == id).email;
    };
    const expertRequests = useExpertRequestByUserId();
    console.log(expertRequests)
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

    ];
    const data = expertRequests?.map((expertRequest, index) => {
        return {
            index: index + 1,
            email: getEmailByUserId(expertRequest.userId),
            cv: <a href={expertRequest.cvUrl}>View cv</a>,
            createdAt: formatDate(new Date(expertRequest.createdAt)),
            state: expertRequest.state,
        };
    });
    return (
        <MyLearningStyle>
            <div className="my-learning">
                <div className="my-learning_heading">
                    <p className="my-learning_heading__title">My Requests</p>
                </div>
                <Table columns={columns} dataSource={data} />
            </div>
        </MyLearningStyle>
    );
};

export default MyRequest;
