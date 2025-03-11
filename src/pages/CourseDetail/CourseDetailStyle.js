import styled from "styled-components";

const CourseDetailStyle = styled.div`
  .course-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 32px;
    background: white;
    font-family: "font-shopee";
  }

  .course-content {
    display: flex;
    gap: 32px;
  }
.disabled {
  pointer-events: none;
  opacity: 0.5;
  cursor: default;
}
  .course-sidebar {
    width: 300px;
    flex-shrink: 0;
    position: sticky;
    top: 100px; 
    max-height: calc(100vh - 20px); 
    overflow-y: auto; 
    border-right: 1px solid #e0e0e0;
    padding-right: 24px;
    background: white; 
    z-index: 10; 

    h2 {
      font-size: 20px;
      font-weight: 700;
      color: #469B74;
      margin-bottom: 16px;
    }

    .course-section {
      margin-bottom: 16px;

      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        padding: 8px 0;

        h3 {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin: 0;
        }
      }

      .section-lessons {
        list-style-type: none;
        padding-left: 16px;

        li {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          cursor: pointer;
          transition: all 0.3s ease;

          &:hover, &.active {
            color: #FCB80B;
          }

          span {
            font-size: 14px;
            color: #666;
          }
        }
      }
    }
}

  .main-content {
    flex-grow: 1;
  }

  .course-title {
    font-size: 32px;
    font-weight: 700;
    color: #469B74;
    margin-bottom: 16px;
  }

  .course-brief {
    font-size: 18px;
    color: #333;
    margin-bottom: 24px;
    line-height: 1.6;
  }

  .course-meta {
    display: flex;
    gap: 32px;
    margin-bottom: 32px;

    .meta-item {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #469B74;

      .icon {
        width: 20px;
        height: 20px;
      }
    }
  }

  .video-container {
    width: 100%;
    aspect-ratio: 16/9;
    margin-bottom: 40px;
    border-radius: 8px;
    overflow: hidden;
    border: 2px solid #FCB80B;

    .course-video {
      width: 100%;
      height: 100%;
    }
  }

  .content-section {
    margin-bottom: 40px;
    padding: 24px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    transition: all 0.3s ease;

    &:hover {
      border-color: #FCB80B;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    h2 {
      font-size: 24px;
      font-weight: 700;
      color: #469B74;
      margin-bottom: 24px;
    }

    h3 {
      font-size: 20px;
      font-weight: 600;
      color: #469B74;
      margin: 24px 0 16px;
    }
  }

  .learning-points {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 16px;

    .learning-point {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 12px;
      border-radius: 4px;
      transition: all 0.3s ease;

      &:hover {
        background-color: #f5f5f5;
      }

      .check-icon {
        width: 20px;
        height: 20px;
        color: #FCB80B;
        flex-shrink: 0;
      }

      span {
        font-size: 16px;
        line-height: 1.5;
      }
    }
  }
  .learner {

    gap: 12px;
    padding: 12px;
    border-radius: 4px;
    transition: all 0.3s ease;

    &:hover {
      background-color: #f5f5f5;
    }

    span {
      font-size: 16px;
      line-height: 1.5;
    }
  }

  ul {
    list-style-type: none;
    padding-left: 0;

    li {
      position: relative;
      padding-left: 24px;
      margin-bottom: 12px;
      line-height: 1.6;

      &:before {
        
        position: absolute;
        
        color: #FCB80B;
      }
    }
  }

  .instructor-section {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: 40px;
    padding: 24px;
    border-radius: 8px;
    background-color: #f5f5f5;

    .instructor-info {
      h3 {
        font-size: 20px;
        font-weight: 600;
        color: #469B74;
        margin: 0 0 4px;
      }

      p {
        color: #666;
        margin: 0;
      }
    }
  }
`;

export default CourseDetailStyle;
