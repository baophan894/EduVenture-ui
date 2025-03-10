import styled from "styled-components";
const CourseCardStyle = styled.div`
.course_name{
  display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 2; /* Number of lines to show */
    text-overflow: ellipsis;
    color: rgba(0, 0, 0, 0.88);
    font-weight: 600;
    font-size: 16px;
}
  .ant-card-body {
    padding: 5px;
  }
  .no-radius-card {
    border-radius: 0 !important;
  }
  img {
    border: 1px solid #ccc;
  }
  .ant-card .ant-card-cover img{
    border-radius: 0 !important;
  }

`;
export default CourseCardStyle;
