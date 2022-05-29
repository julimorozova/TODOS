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
        // Чисто для бонуса можно линтер настроить. Это не сильно сложно, но будет приятнее даже самой код писать в репозитории
        <button className={className}
                onClick = { onClickHandler }>{ buttonName }</button>
    )
}
