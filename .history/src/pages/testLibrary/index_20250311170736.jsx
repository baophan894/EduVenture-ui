import React from "react";

import { Col, Row } from "antd";

function TestLibraryScreen() {
  return (
    <div>
      {/* Courses Section */}
      <div
        id="courses-section"
        className={`mx-4 md:mx-8 lg:mx-16 mb-12 bg-white rounded-xl shadow-md relative p-6 transition-all duration-1000 ${
          animatedSections.courses
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
        style={{ borderLeft: `4px solid ${primaryGreen}` }}
      >
        <h3
          className={`font-shopee text-2xl font-bold mb-6 transition-all duration-700 ${
            animatedSections.courses
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-10"
          }`}
          style={{ color: primaryGreen }}
        >
          Learning
        </h3>
        <Row gutter={[24, 40]} className="pt-2">
          {courses?.slice(0, 4).map((course, index) => {
            return (
              <Col
                key={course.id}
                className={`gutter-row transition-all duration-700 ${
                  animatedSections.courses
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
                xs={24}
                sm={12}
                md={6}
              >
                <CourseCard
                  expert={findExpertById(course.expertId)}
                  course={course}
                />
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}

export default TestLibraryScreen;
