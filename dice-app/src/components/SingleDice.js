import React from "react";
import "../styles/DiceComponent.css"

export default function DiceComponent(props) {
    return (
        <div onClick={props.hold} className={props.isHeld ? "dice--box-held" : "dice--box"}>
            <h2 className="dice--number">{props.value}</h2>
        </div>
    )
}