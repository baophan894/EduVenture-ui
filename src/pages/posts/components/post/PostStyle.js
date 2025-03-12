import styled from "styled-components"

const PostStyle = styled.div`
  .post {
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 16px;
    margin-bottom: 16px;
  }

  .post_header {
    display: flex;
    align-items: flex-start;
    margin-bottom: 12px;
  }

  .post_avatar {
    margin-right: 12px;
  }

  .post_user_info {
    flex: 1;
    
    .username {
      font-weight: 600;
      color: #469B74;
      margin: 0;
      font-size: 16px;
    }
    
    .post_time {
      font-size: 12px;
      color: #888;
      margin-top: 2px;
    }
  }

  .post_actions {
    display: flex;
    gap: 8px;
  }

  .post_content {
    margin-left: 52px;
    margin-bottom: 16px;
    
    p {
      color: #333;
      margin-bottom: 12px;
      font-size: 15px;
      line-height: 1.4;
    }

    .post_image {
      border-radius: 12px;
      overflow: hidden;
      margin-top: 8px;
    }
  }

  .post_interactions {
    margin-left: 52px;
    display: flex;
    align-items: center;
    gap: 20px;
    padding-top: 8px;
    border-top: 1px solid #f0f0f0;
  }

  .interaction_item {
    display: flex;
    align-items: center;
    gap: 4px;
    color: #555;
    
    .count {
      font-size: 14px;
    }
    
    .icon {
      font-size: 20px;
      color: #469B74;
      
      &.active {
        color: #FCB80B;
      }
      
      &:hover {
        color: #FCB80B;
      }
    }
  }

  .comments_section {
    margin-left: 52px;
    margin-top: 16px;
  }

  .action_button {
    background-color: #FCB80B;
    border-color: #FCB80B;
    color: white;
    
    &:hover {
      background-color: #e9a908;
      border-color: #e9a908;
    }
    
    &.danger {
      background-color: #ff4d4f;
      border-color: #ff4d4f;
    }
  }

  .more_button {
    color: #888;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    font-size: 20px;
    
    &:hover {
      color: #469B74;
    }
  }
`

export default PostStyle

