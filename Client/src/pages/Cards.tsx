import Card from "../Components/Card/Card";
import getData from "../Services/persons";
import "./Cards.css";

function Cards() {
  return (
    <>
      <div className="cards-page">
        <h1>Cards page</h1>
        <div id="div1">
          <ul>
            {getData().map((person) => (
              <Card
                key={person.name}
                name={person.name}
                age={person.age}
                fileName={person.fileName}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Cards;
