import type { ReactNode } from "react";
import style from "./card.module.css";

interface Props {
  name: string;
  age: number;
  fileName: string;
}

function Card({ name, age, fileName }: Props) {
  return (
    <>
      <div className={style.main}>
        <div className={style.textArea}>
          {name} {age}
        </div>
        <img
          src={"/images/" + fileName}
          alt="image not found"
          className={style.photo}
        />
      </div>
    </>
  );
}

export default Card;
