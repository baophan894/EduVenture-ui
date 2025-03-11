import styled from "styled-components"

const PostStyle = styled.div`
  .post {
    background-color: #FFFFFF;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }

    &_info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;

      .author-info {
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;

        p {
          font-weight: 600;
          color: #469B74;
          margin: 0;
        }

        span {
          font-size: 12px;
          color: #65676B;
        }
      }

      .post-actions {
        display: flex;
        gap: 10px;
      }
    }

    &_content {
      margin-bottom: 15px;

      p {
        font-size: 16px;
        line-height: 1.5;
        color: #1C1E21;
        margin-bottom: 10px;
      }

      .ant-image {
        border-radius: 8px;
        overflow: hidden;
      }
    }

    &_interactions {
      display: flex;
      gap: 20px;

      span {
        display: flex;
        align-items: center;
        gap: 5px;
        cursor: pointer;
        
        .anticon {
          font-size: 20px;
        }

        .liked {
          color: #469B74;
        }

        .not-liked:hover {
          color: #469B74;
        }
      }
    }
  }

  .ant-btn {
    border-radius: 5px;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
    }
  }
`

export default PostStyle

