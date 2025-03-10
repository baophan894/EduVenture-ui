import styled from "styled-components";

const PostStyle = styled.div`
  .post {
    background-color: #FFFFFF;
    padding: 20px ;
    border-radius: 5px;
    margin-bottom: 10px;
    &_info {
        display: flex;
        gap: 3px;
        justify-content: space-between;
        align-items: center;
        p{
            font-weight: 600;
        }
        div{
            line-height: 1;
            }
        span{
            font-size: 10px;
        }
    }
    &_content{
        margin-top: 5px;
        }
  }

`;
export default PostStyle;
