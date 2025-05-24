"use client";

import AudioPlayer from "./audio-player";
import PropTypes from "prop-types";

const QuestionDisplay = ({ test, question, onAudioEnd, showResultsModal }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div>
        <div className="mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 font-shopee mb-2">
              {question?.title}
            </h2>
            <p className="text-sm text-gray-600 font-shopee">
              {question?.questionInstruction}
            </p>
          </div>
        </div>

        {/* Audio player for listening questions */}
        {test.typeName === "LISTENING" && question.audioUrl && (
          <div className="mb-4">
            <AudioPlayer
              audioUrl={question.audioUrl}
              onAudioEnd={onAudioEnd}
              showResultsModal={showResultsModal}
            />
          </div>
        )}

        {/* Question image if available */}
        {question.imageUrl && (
          <div className="mb-4">
            <img
              src={question.imageUrl || "/placeholder.svg"}
              alt="Question visual"
              className="max-w-full rounded-lg border border-gray-200"
            />
          </div>
        )}

        {question.readingPassage && (
          <div className="bg-gray-50 p-4 rounded-lg mb-4 font-shopee">
            {question.readingPassage.split("\n").map((line, index) => (
              <p key={index} className="mb-2 last:mb-0 font-shopee">
                {line}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

QuestionDisplay.propTypes = {
  test: PropTypes.shape({
    typeName: PropTypes.string.isRequired,
  }).isRequired,
  question: PropTypes.shape({
    title: PropTypes.string,
    questionInstruction: PropTypes.string,
    audioUrl: PropTypes.string,
    imageUrl: PropTypes.string,
    readingPassage: PropTypes.string,
  }).isRequired,
  onAudioEnd: PropTypes.func.isRequired,
  showResultsModal: PropTypes.bool.isRequired,
};

export default QuestionDisplay;
