import styled from "styled-components"

const ProfileStyle = styled.div`
  .profile {
    display: flex;
    min-height: 90vh;
    margin: 20px 50px 40px 50px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    background-color: white;
    
    &_avatar {
      width: 25%;
     
      padding: 24px 16px;
      border-right: 1px solid #e5e7eb;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: #f9fafb;
      
      &_top {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-bottom: 1px solid #e5e7eb;
        margin-bottom: 20px;
        padding-bottom: 20px;
        width: 100%;
        
        &_image {
          border: 3px solid #469B74;
        }
        
        &_update {
          opacity: 0;
          transition: all 0.2s ease;
          font-weight: 500;
          font-size: 14px;
          
          &:hover {
            cursor: pointer;
            opacity: 1;
          }
        }
      }
      
      p {
        margin-top: 10px;
        font-weight: 600;
        font-size: 18px;
        color: #1f2937;
      }
      
      .menu-custom {
        .ant-menu-item-selected {
          background-color: rgba(70, 155, 116, 0.1);
          color: #469B74;
        }
        
        .ant-menu-item:hover {
          color: #469B74;
        }
        
        .ant-menu-submenu-title:hover {
          color: #469B74;
        }
        
        .ant-menu-submenu-selected > .ant-menu-submenu-title {
          color: #469B74;
        }
      }
    }
    
    &_information {
      display: flex;
      flex-direction: column;
      width: 75%;
      border-radius: 0;
      box-shadow: none;
      
      &_header {
        display: flex;
        color: white;
        padding: 16px 24px;
        background-color: #469B74;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        border-bottom: none;
        
        &_title {
          font-weight: 600;
          font-size: 20px;
          margin-bottom: 4px;
        }
        
        &_des {
          font-size: 14px;
          opacity: 0.8;
        }
      }
      
      &_content {
        height: 100%;
        padding: 24px 48px;
        
        .ant-form-item-label > label {
          color: #4b5563;
          font-weight: 500;
        }
      }
    }
    
    .ant-form-item-control-input {
      input,
      textarea {
        border-radius: 4px !important;
        transition: all 0.3s ease;
        
        &:hover, &:focus {
          border-color: #469B74;
        }
      }
      
      .ant-select-selector,
      .ant-picker {
        border-radius: 4px !important;
        height: auto;
        min-height: 38px;
        transition: all 0.3s ease;
        
        &:hover {
          border-color: #469B74;
        }
      }
      
      .ant-select-focused .ant-select-selector,
      .ant-picker-focused {
        border-color: #469B74 !important;
        box-shadow: 0 0 0 2px rgba(70, 155, 116, 0.2) !important;
      }
    }
    
    .ant-btn-primary {
      background-color: #FCB80B;
      border-color: #FCB80B;
      
      &:hover {
        background-color: #e0a50a;
        border-color: #e0a50a;
      }
    }
    
    .ant-tag-gold {
      color: #854d0e;
      background: #fef3c7;
      border-color: #fcd34d;
    }
    
    .ant-tag-green {
      color: #166534;
      background: #dcfce7;
      border-color: #86efac;
    }
    
    .ant-tag-purple {
      color: #4b5563;
      background: #dcfce7;
      border-color: #86efac;
    }
  }
`

export default ProfileStyle

