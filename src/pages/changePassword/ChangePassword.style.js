import styled from "styled-components";
const ChangePasswordStyle = styled.div`
  .change-password {
    .image {
      background-image: url("https://www.techsmith.com/blog/wp-content/uploads/2020/05/distance-learning.png");
      background-size: contain;
    }
    min-height: 100vh;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    ant-form {
      width: 100% !important;
    }
    &_content {
      padding-left: 20px;
      min-height: 100vh;
      padding-right: 10px;
      padding-top: 30px;
      text-align: center;
      &_title {
        display: block;
        margin: 10px 0;
        font-size: 50px;
        font-weight: 800;
      }
    }
    .ant-form-item.left {
      .ant-form-item-control-input-content {
        text-align: left !important;
      }
    }
    .ant-form-item.right {
      .ant-form-item-control-input-content {
        text-align: right !important;
      }
    }
    .ant-form-item-explain-error{
      text-align: left;
    }
    .ant-form-item-control-input-content {
      text-align: center !important;
      input {
        padding: 14px;
        width: 100%;
      }
      button {
        display: block;
        height: 60px;
        width: 100%;
        background-color: blue;
        color: #fff;
        font-size: 20px;
      }
    }
    .social {
      margin-bottom: 30px;
      button {
        width: 100%;
        padding: 5px 0 !important;
        justify-content: center !important;
        font-size: 20px !important;
      }
    }
  }
`;
export default ChangePasswordStyle;
