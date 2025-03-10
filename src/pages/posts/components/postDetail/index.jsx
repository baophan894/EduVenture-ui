import { useNavigate, useParams } from "react-router-dom";
import Post from "../post";
import useAllPost from "../../../../hook/posts/useAllPost";
import useAllUser from "../../../../hook/user/useAllUser";
import { Button } from "antd";

const PostDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const allUsers = useAllUser();
  const posts = useAllPost();
  const getAuthorByUserId = (userId) => {
    return allUsers?.find((user) => user.id == userId);
  };
  const activePost = posts?.find((post) => post.id == id);
  const handleBackToForum = () => {
    navigate("/forum");
  };
  return (
    <>
      <Button onClick={handleBackToForum} className="mt-3 ml-3">
        {" "}
        Back
      </Button>
      <Post post={activePost} author={getAuthorByUserId(activePost?.userId)} />
    </>
  );
};
export default PostDetail;
