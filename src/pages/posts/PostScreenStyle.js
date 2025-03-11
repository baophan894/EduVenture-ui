import styled from "styled-components";

const PostScreenStyle = styled.div`
  .posts {
    min-height: 100vh;
    padding: 20px;
    background-color: #F1F2F5;

    &_heading {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 15px;
      border-radius: 10px;
      background-color: #FFFFFF;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;

      .ant-input {
        border-radius: 20px;
        border: 1px solid #E4E6EB;
        transition: all 0.3s ease;

        &:hover, &:focus {
          border-color: #469B74;
          box-shadow: 0 0 0 2px rgba(70, 155, 116, 0.2);
        }
      }
    }

    &_content {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  }

  .ant-modal-title {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .ant-btn-primary {
    background-color: #469B74;
    border-color: #469B74;

    &:hover, &:focus {
      background-color: #3a8963;
      border-color: #3a8963;
    }
  }

  @media (min-width: 768px) {
    .posts {
      padding: 20px 10%;
    }
  }

  @media (min-width: 1200px) {
    .posts {
      padding: 20px 20%;
    }
  }
`;

export default PostScreenStyle;
