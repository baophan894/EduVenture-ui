import Loading from "../../../../components/loading";
import useMyPost from "../../../../hook/posts/useMyPost";
import useAllUser from "../../../../hook/user/useAllUser";
import PostScreenStyle from "../../../posts/PostScreenStyle";
import Post from "../../../posts/components/post";
import MyLearningStyle from "../myLearning/MylearningStyle";

const MyPost = () => {
  const allUsers = useAllUser();
  const getAuthorByUserId = (userId) => {
    return allUsers?.find((user) => user.id == userId);
  };
  const posts = useMyPost();
  const numOfPost = posts?.length;

  return (
    !!numOfPost &&
    (posts ? (
      <MyLearningStyle>
        <div className="my-learning">
          <div className="my-learning_heading">
            <p className="my-learning_heading__title">My Post</p>
          </div>
          <PostScreenStyle>
            <div className="posts">
              <div className="posts_content mt-10">
                {posts?.map((post) => (
                  <Post
                    key={post.id}
                    post={post}
                    author={getAuthorByUserId(post.userId)}
                    modifyAble={true}
                  />
                ))}
              </div>
            </div>
          </PostScreenStyle>
        </div>
      </MyLearningStyle>
    ) : (
      <Loading />
    ))
  );
};
export default MyPost;
