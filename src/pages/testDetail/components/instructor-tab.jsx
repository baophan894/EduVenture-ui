import PropTypes from "prop-types";

const InstructorTab = ({ test }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 font-shopee">
        About the Instructor
      </h2>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <img
            src={test.instructorAvatar}
            alt={`${test.instructorName}'s avatar`}
            className="w-32 h-32 rounded-full object-cover flex-shrink-0"
          />

          <div>
            <h3 className="text-xl font-semibold mb-2 font-shopee">
              {test.instructorName}
            </h3>
            <p className="text-[#469B74] mb-4 font-shopee">
              {test.instructorTitle}
            </p>

            <p className="mb-4 font-shopee">{test.instructorDescription}</p>

            <div className="mb-4">
              <h4 className="font-semibold mb-2 font-shopee">Experience:</h4>
              <p className="font-shopee">
                {test.instructorExperience} of teaching experience
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

InstructorTab.propTypes = {
  test: PropTypes.shape({
    instructorName: PropTypes.string.isRequired,
    instructorTitle: PropTypes.string.isRequired,
    instructorDescription: PropTypes.string.isRequired,
    instructorExperience: PropTypes.string.isRequired,
    instructorAvatar: PropTypes.string.isRequired,
  }).isRequired,
};

export default InstructorTab;
