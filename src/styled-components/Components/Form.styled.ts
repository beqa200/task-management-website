import styled from "styled-components";
import { ThemeType } from "../../vite-env";

const FormWrapper = styled.div<{
  isDark: Boolean | undefined;
  theme: ThemeType;
}>`
  position: fixed;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) =>
    props.isDark == true ? props.theme.dark.darkGrey : props.theme.light.white};
  width: calc(90% - 48px);
  max-width: 432px;
  padding: 24px 24px 32px 24px;
  border-radius: 6px;

  h1 {
    font-weight: 700;
    font-size: 18px;
    line-height: 23px;
    width: 95%;
    color: ${(props) =>
      props.isDark == true ? props.theme.dark.white : props.theme.light.black};
  }

  input,
  textarea {
    color: ${(props) =>
      props.isDark == true ? props.theme.light.white : props.theme.light.black};
    margin-top: 8px;
  }

  .input-div {
    display: flex;
    flex-direction: column;
    margin-top: 24px;
    position: relative;
    label {
      color: ${(props) =>
        props.isDark == true
          ? props.theme.light.white
          : props.theme.light.black};
    }

    .item {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      align-items: center;
      position: relative;
      img {
        object-fit: none;
        margin-top: 8px;
        &:hover {
          @media (min-width: 1440px) {
            cursor: pointer;
            filter: brightness(0) saturate(100%) invert(45%) sepia(40%)
              saturate(987%) hue-rotate(315deg) brightness(98%) contrast(87%);
          }
        }
      }
    }

    select {
      color: ${(props) =>
        props.isDark == true
          ? props.theme.light.white
          : props.theme.light.black};
      option {
        background-color: ${(props) =>
          props.isDark == true
            ? props.theme.dark.veryDarkGrey
            : props.theme.light.lightGrey};
        color: ${(props) =>
          props.isDark == true
            ? props.theme.light.white
            : props.theme.light.black};
      }
    }

    p {
      position: absolute;
      font-weight: 500;
      font-size: 13px;
      line-height: 23px;
      color: #ea5555;
      left: 50%;
      bottom: 9px;

      @media (min-width: 768px) {
        left: 65%;
      }
    }
  }

  .addButton {
    background-color: ${(props) =>
      props.isDark == true
        ? props.theme.light.white
        : "rgba(99, 95, 199, 0.1)"};
  }
`;

export default FormWrapper;
