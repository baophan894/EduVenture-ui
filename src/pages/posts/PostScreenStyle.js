import styled from "styled-components";

const PostScreenStyle = styled.div`

.posts{
    min-height: 100vh;
    padding: 10px 300px;
    background-color: #F1F2F5;
    &_heading{
        gap: 10px;
        display: flex;;
        padding: 5px;
        border-radius: 5px;
        background-color: #FFFFFF;
    }
    &_content{
        border-radius: 5px;
    }
    .ant-modal-title{
        text-align: center !important;;
    }
}

`
export default PostScreenStyle;