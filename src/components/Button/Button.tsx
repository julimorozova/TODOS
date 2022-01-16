import React from "react";

type ButtonPropsType = {
    buttonName: string
    onClickHandler: () => void
}
export const Button: React.FC<ButtonPropsType> = ({
    buttonName,
    onClickHandler,
  }) => {
    return (
        <button onClick={onClickHandler}>{buttonName}</button>
    )
}
