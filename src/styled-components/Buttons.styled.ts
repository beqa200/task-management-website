import styled from "styled-components";

const StyledButton = styled.button`
  height: 32px;
  background-color: #635fc7;
  border: none;
  border-radius: 24px;
  padding: 0px 18px;
  font-family: "Plus Jakarta Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 19px;
  color: #ffffff;
`;

const StyledWhiteButton = styled.div`
  background-color: #ffffff;
  border: none;
  border-radius: 24px;
  padding: 8px 18px;
  font-family: "Plus Jakarta Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  color: #635fc7;
  text-align: center;
  line-height: 23px;
`;

const StyledRedButton = styled(StyledButton)`
  background-color: #ea5555;
  display: block;
  width: 100%;
  height: 40px;

`;

export { StyledButton, StyledWhiteButton, StyledRedButton };
