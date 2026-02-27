import style from "./card.module.css";
import { useAuth } from "../../contexts/AuthProvider";

interface Props {
  name: string;
  age: number;
  fileName: string;
}

function Card({ name, age, fileName }: Props) {
  const { isAuthenticated } = useAuth();

  // Only render card if user is authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <div className={style.main}>
        <div className={style.textArea}>
          <p>{name}</p>
          <p>Age: {age}</p>
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
