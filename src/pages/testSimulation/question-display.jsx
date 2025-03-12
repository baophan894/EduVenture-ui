"use client";

import { TEST_TYPES } from "./test-types";
import AudioPlayer from "./audio-player";

const QuestionDisplay = ({ test, question, onAudioEnd }) => {
  return (
    <div>
      <div className="mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 font-shopee mb-2">
            {question?.title}
          </h2>
          <p className="text-sm text-gray-600 font-shopee">
            {question?.instructions}
          </p>
        </div>
      </div>

      {/* Audio player for listening questions */}
      {test.type === TEST_TYPES.LISTENING && question.audioUrl && (
        <div className="mb-4">
          <AudioPlayer audioUrl={question.audioUrl} onAudioEnd={onAudioEnd} />
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
  );
};

export default QuestionDisplay;
