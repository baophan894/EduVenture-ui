import styled from "styled-components";

const ProfileStyle = styled.div`
  .profile {
    display: flex;
    height: 90vh;
    margin: 20px 50px 40px 50px;
    border: 1px solid #d1d7db;
    &_avatar {
      &_top {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-bottom: 1px solid #d1d7db;
        margin-bottom: 20px;
        &_image {
          position: relative;
        }
        &_update {
          bottom: 72%;
          opacity: 0;
          border-radius: 10px;
          &:hover {
            cursor: pointer;
            text-decoration: underline;
            opacity: 0.8;
            font-weight: 900;
          }
          position: absolute;
          color: blue;
        }
      }
      width: 25%;
      height: 100%;
      padding: 20px 10px;
      border-right: 1px solid #d1d7db;
      display: flex;
      flex-direction: column;
      align-items: center;
      p {
        margin-top: 10px;
        font-weight: 700;
        font-size: 18px;
      }
    }
    &_information {
      display: flex;
      flex-direction: column;
      width: 100%;
      &_header {
        display: flex;
        color: #ffff;
        padding-top: 10px;
        background-color: #2c2f31;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 95px;
        border-bottom: 1px solid #d1d7db;
        &_title {
          font-weight: 700;
          font-size: 23px;
        }
        &_des {
          font-size: 15px;
        }
      }
      &_content {
        height: 100%;
        padding: 40px 160px;
      }
    }
    .ant-form-item-control-input {
      input,
      textarea,
      .ant-select-selector,
      .ant-picker {
        width: 100%;
        border-radius: 0 !important;
        height: 40px;
        border: 1px solid #2c2f31;
      }
    }
  }
`;
export default ProfileStyle;
