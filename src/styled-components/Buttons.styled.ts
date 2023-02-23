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

const StyledWhiteButton = styled(StyledButton)`
  color: #635fc7;
  height: 40px;
`

export  {StyledButton, StyledWhiteButton};
