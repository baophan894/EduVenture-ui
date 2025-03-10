import styled from "styled-components";
const DashboardStyle = styled.div`
  .dashboard {
    min-height: 95vh;
    min-width: 100vw;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    &_menu {
      grid-column: span 1;
      .ant-menu{
        min-height: 100%;
      }
    }
    &_tab {
      .content {
        h1{
            font-size: 50px;
            font-weight: 700;
        }
        height: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .ant-form {
          width: 100%;
          padding: 50px 100px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .ant-form-item {
            input {
              width: 100% !important;
            }
          }
        }
      }

      display: flex;
      align-items: center;
      justify-content: center;
      grid-column: span 5;
    }
    .ant-menu-item {
      height: 62px !important;
    }
  }
`;
export default DashboardStyle;
