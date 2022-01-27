import React from "react";

type ButtonPropsType = {
    buttonName: string
    onClickHandler: () => void
    className: string
}
export const Button: React.FC<ButtonPropsType> = ({
    buttonName,
    onClickHandler,
    className
  }) => {
    return (
        <button className={className}
                onClick = { onClickHandler }>{ buttonName }</button>
    )
}
