import { FaRegClock } from "react-icons/fa";

const ModulesTab = ({ test }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 font-shopee">Test Modules</h2>

      {/* Detailed modules */}
      {test.modules.map((module, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center mb-4">
            <div className="text-[#469B74] text-2xl mr-3">{module.icon}</div>
            <h3 className="text-xl font-semibold font-shopee">
              {module.name} Module
            </h3>
          </div>

          <div className="flex flex-wrap gap-4 mb-4">
            <div className="bg-gray-100 rounded-full px-4 py-1 text-sm flex items-center">
              <FaRegClock className="mr-2" />
              <span className="font-shopee">{module.duration} minutes</span>
            </div>
            {module.questions && (
              <div className="bg-gray-100 rounded-full px-4 py-1 text-sm font-shopee">
                {module.questions} questions
              </div>
            )}
            {module.tasks && (
              <div className="bg-gray-100 rounded-full px-4 py-1 text-sm font-shopee">
                {module.tasks} tasks
              </div>
            )}
            {module.parts && (
              <div className="bg-gray-100 rounded-full px-4 py-1 text-sm font-shopee">
                {module.parts} parts
              </div>
            )}
          </div>

          <p className="mb-4 font-shopee">{module.description}</p>

          {/* Module-specific content */}
          {module.name === "Listening" && (
            <div className="border-t border-gray-200 pt-4 mt-4">
              <h4 className="font-semibold mb-2 font-shopee">
                Section Breakdown:
              </h4>
              <ul className="space-y-2">
                <li className="font-shopee">
                  • Section 1: A conversation between two people in an everyday
                  social context
                </li>
                <li className="font-shopee">
                  • Section 2: A monologue in an everyday social context
                </li>
                <li className="font-shopee">
                  • Section 3: A conversation between up to four people in an
                  educational context
                </li>
                <li className="font-shopee">
                  • Section 4: A monologue on an academic subject
                </li>
              </ul>
            </div>
          )}

          {module.name === "Reading" && (
            <div className="border-t border-gray-200 pt-4 mt-4">
              <h4 className="font-semibold mb-2 font-shopee">
                Question Types:
              </h4>
              <ul className="space-y-2">
                <li className="font-shopee">• Multiple choice</li>
                <li className="font-shopee">
                  • Identifying information (True/False/Not Given)
                </li>
                <li className="font-shopee">
                  • Identifying writer's views/claims (Yes/No/Not Given)
                </li>
                <li className="font-shopee">
                  • Matching information/headings/features/sentence endings
                </li>
                <li className="font-shopee">
                  • Sentence completion, summary completion, note completion,
                  table completion, flow-chart completion, diagram label
                  completion
                </li>
                <li className="font-shopee">• Short-answer questions</li>
              </ul>
            </div>
          )}

          {module.name === "Writing" && (
            <div className="border-t border-gray-200 pt-4 mt-4">
              <h4 className="font-semibold mb-2 font-shopee">Task Details:</h4>
              <div className="space-y-4">
                <div>
                  <p className="font-medium font-shopee">Task 1 (20 minutes)</p>
                  <p className="font-shopee">
                    You will be presented with a graph, table, chart or diagram
                    and asked to describe, summarize or explain the information
                    in your own words. You may be asked to describe and explain
                    data, describe the stages of a process, how something works
                    or describe an object or event.
                  </p>
                </div>
                <div>
                  <p className="font-medium font-shopee">Task 2 (40 minutes)</p>
                  <p className="font-shopee">
                    You will be asked to write an essay in response to a point
                    of view, argument or problem. The issues raised are of
                    general interest to, suitable for and easily understood by
                    test takers entering undergraduate or postgraduate studies
                    or seeking professional registration.
                  </p>
                </div>
              </div>
            </div>
          )}

          {module.name === "Speaking" && (
            <div className="border-t border-gray-200 pt-4 mt-4">
              <h4 className="font-semibold mb-2 font-shopee">Part Details:</h4>
              <div className="space-y-4">
                <div>
                  <p className="font-medium font-shopee">
                    Part 1: Introduction and Interview (4-5 minutes)
                  </p>
                  <p className="font-shopee">
                    The examiner introduces themselves and asks you to introduce
                    yourself and confirm your identity. The examiner asks you
                    general questions on familiar topics, such as home, family,
                    work, studies and interests.
                  </p>
                </div>
                <div>
                  <p className="font-medium font-shopee">
                    Part 2: Individual Long Turn (3-4 minutes)
                  </p>
                  <p className="font-shopee">
                    The examiner gives you a task card which asks you to talk
                    about a particular topic and includes points you can cover
                    in your talk. You are given 1 minute to prepare and make
                    notes. You then talk for 1-2 minutes on the topic. The
                    examiner may ask one or two questions on the same topic.
                  </p>
                </div>
                <div>
                  <p className="font-medium font-shopee">
                    Part 3: Two-way Discussion (4-5 minutes)
                  </p>
                  <p className="font-shopee">
                    The examiner asks further questions which are connected to
                    the topic of Part 2. These questions give you an opportunity
                    to discuss more abstract issues and ideas.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ModulesTab;
