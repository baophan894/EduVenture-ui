import styled from "styled-components";

const CourseDetailStyle = styled.div`
  .course-detail {
    min-height: 100vh;

    &_banner {
      padding: 20px 40px;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-column: span 2;
      background-color: #2c2f31;
      min-height: 270px;
      &__info {
        grid-column: span 2;
        &___title {
          font-size: 32px;
          font-weight: 900;
          color: #ccc;
        }
      }
    }
    &_content {
      padding: 20px 100px;
      margin-top: 16px;
      &__lessons {
        border: 1px solid #ccc;
        &__item {
          border-bottom: 1px solid #ccc;
          padding: 10px 0;
        }
      }
      &_description {
        margin-top: 40px;
        h1 {
          font-size: 30px;
          font-weight: 700;
        }
        p {
          font-size: 14px;
        }
      }
    }
    .ant-modal{
      width: 90vw !important;
    }
  }
`;
export default CourseDetailStyle;
