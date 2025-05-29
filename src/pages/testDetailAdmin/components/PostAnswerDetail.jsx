import PropTypes from "prop-types";

const PostAnswerDetail = ({
  question,
  part,
  isEditing,
  handleQuestionChange,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Post Answer Detail (Optional)
      </label>
      {isEditing ? (
        <textarea
          value={question.postAnswerDetail || ""}
          onChange={(e) =>
            handleQuestionChange(
              part.order - 1,
              question.order - 1,
              "postAnswerDetail",
              e.target.value
            )
          }
          rows="4"
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
          placeholder="Enter details to show after answering the question"
        />
      ) : (
        <div className="p-3 bg-gray-50 rounded-md border whitespace-pre-wrap">
          {question.postAnswerDetail || (
            <span className="text-gray-500 italic text-sm">
              No post-answer details provided
            </span>
          )}
        </div>
      )}
    </div>
  );
};

PostAnswerDetail.propTypes = {
  question: PropTypes.shape({
    postAnswerDetail: PropTypes.string,
    order: PropTypes.number.isRequired,
  }).isRequired,
  part: PropTypes.shape({
    order: PropTypes.number.isRequired,
  }).isRequired,
  isEditing: PropTypes.bool.isRequired,
  handleQuestionChange: PropTypes.func.isRequired,
};

export default PostAnswerDetail;
