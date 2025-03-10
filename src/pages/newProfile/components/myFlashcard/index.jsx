import { Col, Row } from "antd";
import Loading from "../../../../components/loading";
import useAllFlashCard from "../../../../hook/flashcard/useAllFlashCard";
import useUserInfo from "../../../../hook/user/useUserInfo";
import FlashCard from "../../../flashcard/components/FlashCard";
import MyLearningStyle from "../myLearning/MylearningStyle";

const MyFlashCard = () => {
  const user = useUserInfo();
  const flashcards = useAllFlashCard()?.filter(
    (flashcard) => flashcard.userId == user?.id
  );
  const numOfFlashcard = flashcards?.length;
  return (
    !!numOfFlashcard &&
    (flashcards ? (
      <MyLearningStyle>
        <div className="my-learning">
          <div className="my-learning_heading">
            <p className="my-learning_heading__title">My Flashcards</p>
          </div>

          <Row gutter={[16, 40]} className="px-[40px] py-[20px]">
            {flashcards?.map((flashcard) => (
              <Col
                key={document.id}
                className="gutter-row"
                xs={24}
                sm={12}
                md={6}
              >
                <FlashCard flashcard={flashcard} />
              </Col>
            ))}
          </Row>
        </div>
      </MyLearningStyle>
    ) : (
      <Loading />
    ))
  );
};
export default MyFlashCard;
