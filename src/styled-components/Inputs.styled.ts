import styled from "styled-components";
import { arrowDown } from "../assets";

const TitleInput = styled.input`
  border: 1px solid rgba(130, 143, 163, 0.25);
  border-radius: 4px;
  background-color: transparent;
  font-weight: 500;
  font-size: 13px;
  line-height: 23px;
  padding: 8px 0px 9px 16px;
  
  &:focus {
    border-color: #635fc7;
    outline: none;
  }
`;

const SubTaskInput = styled(TitleInput)`
  width: 90%;
`;

const DescriptionInput = styled.textarea`
  border: 1px solid rgba(130, 143, 163, 0.25);
  border-radius: 4px;
  background-color: transparent;
  font-weight: 500;
  font-size: 13px;
  line-height: 23px;
  width: calc(100% - 20px);
  height: 71px;
  padding: 8px 10px 33px 10px;

  &:focus {
    border-color: #635fc7;
    outline: none;
  }
`;

const StyledLabel = styled.label`
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  mix-blend-mode: normal;
`;

const SelectInput = styled.select`
  margin-top: 8px;
  padding: 8px 16px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url(${arrowDown});
  background-repeat: no-repeat;
  background-position: right 15px center;
  border: 1px solid rgba(130, 143, 163, 0.25);
  border-radius: 4px;
  background-color: transparent;

  &:focus {
    border-color: #635fc7;
    outline: none;
  }
`;

export { TitleInput, DescriptionInput, SubTaskInput, StyledLabel, SelectInput };
