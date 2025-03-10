import styled from "styled-components";

const MyLearningStyle = styled.div`
  .my-learning {
    margin: 0 50px;
    min-height: 400px;
    border: 1px solid #d1d7db;
    &_heading{
        min-height: 166px;
        background-color: #2C2F31;
        &__title{
            font-size: 40px;
            color: #ffff;
            font-weight: 700;
            padding: 48px 64px;
        }
    }
    &_courses{
        padding: 20px 40px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        gap: 20px;
    }
  }
`;
export default MyLearningStyle;
