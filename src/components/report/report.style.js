import styled from "styled-components";
const ReportStyle = styled.div`
  .btn-container {
    display: flex;
    justify-content: end;
  }
  button:hover {
    // background-color: red !important;
    border-color: red !important;
    color: red !important;
  }
  button {
    margin-right: 10px;
    width: 5px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    border-color: red !important;
  }

  .input-item {
    height: 100px !important;
  }
  .ant-modal {
    height: 100px !important;
  }
`;
export default ReportStyle;
