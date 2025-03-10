import Loading from "../../../../components/loading";
import useAllDocuments from "../../../../hook/documents/useAllDocument";
import useUserInfo from "../../../../hook/user/useUserInfo";
import DocumentCard from "../../../documents/components/DocumentCard";
import MyLearningStyle from "../myLearning/MylearningStyle";

const MyDocument = () => {
  const user = useUserInfo();
  const documents = useAllDocuments()?.filter(
    (document) => document.userId == user?.id
  );
  const numOfDocument = documents?.length;
  return (
    !!numOfDocument &&
    (documents ? (
      <MyLearningStyle>
        <div className="my-learning">
          <div className="my-learning_heading">
            <p className="my-learning_heading__title">My Documents</p>
          </div>
          <div className="my-learning_courses">
            {documents?.map((document) => (
              <DocumentCard key={document} document={document} />
            ))}
          </div>
        </div>
      </MyLearningStyle>
    ) : (
      <Loading />
    ))
  );
};
export default MyDocument;
