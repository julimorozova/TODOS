import React from "react";

type ButtonProps = {
    buttonName: string
}
export const Button = (props: ButtonProps) => {
    return (
        <button>{props.buttonName}</button>
    )
}
