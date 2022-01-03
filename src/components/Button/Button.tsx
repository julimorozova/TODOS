import React from "react";

type ButtonProps = {
    buttonName: string
}
const Button = (props: ButtonProps) => {
    return (
        <button>{props.buttonName}</button>
    )
}
export default Button;