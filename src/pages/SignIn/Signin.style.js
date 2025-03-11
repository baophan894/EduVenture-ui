import styled from "styled-components"

const SigninStyle = styled.div`
  .signup {
    position: relative;
    min-height: 100vh;
    width: 100%;
    background: url("https://www.techsmith.com/blog/wp-content/uploads/2020/05/distance-learning.png");
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: flex-end;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
    }

    &_content {
      position: relative;
      width: 100%;
      max-width: 500px;
      min-height: 100vh;
      background: white;
      padding: 30px 40px;
      text-align: center;
      z-index: 1;

      &_title {
        display: block;
        margin: 10px 0;
        font-size: 40px;
        font-weight: 800;
        color: #469B74;
      }
    }

    .ant-form {
      width: 100% !important;
    }

    .ant-form-item {
      margin-bottom: 20px;
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

    .ant-form-item-explain-error {
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
        height: 50px;
        width: 100%;
        background-color: #469B74;
        color: #fff;
        font-size: 18px;
        border: none;
        border-radius: 5px;

        &:hover {
          background-color: #3a8963;
        }
      }
    }

    .social {
      margin: 30px 0;
      
      button {
        width: 100%;
        justify-content: center !important;
        font-size: 18px !important;
        height: 50px;
      }
    }
  }

  @media (max-width: 768px) {
    .signup {
      &_content {
        max-width: 100%;
      }
    }
  }
`

export default SigninStyle

