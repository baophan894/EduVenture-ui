const InstructorTab = ({ test }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 font-shopee">
        About the Instructor
      </h2>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="w-32 h-32 bg-gray-200 rounded-full flex-shrink-0"></div>

          <div>
            <h3 className="text-xl font-semibold mb-2 font-shopee">
              {test.instructor.name}
            </h3>
            <p className="text-[#469B74] mb-4 font-shopee">
              {test.instructor.title}
            </p>

            <p className="mb-4 font-shopee">
              Dr. Sarah Johnson is a certified IELTS examiner with over 15 years
              of experience in language assessment and teaching. She has helped
              thousands of students achieve their target IELTS scores for
              academic, immigration, and professional purposes.
            </p>

            <div className="mb-4">
              <h4 className="font-semibold mb-2 font-shopee">Experience:</h4>
              <p className="font-shopee">
                {test.instructor.experience} of IELTS examination and training
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2 font-shopee">
                Certifications:
              </h4>
              <div className="flex flex-wrap gap-2">
                {test.instructor.certifications.map((cert, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 rounded-full px-3 py-1 text-sm font-shopee"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorTab;
