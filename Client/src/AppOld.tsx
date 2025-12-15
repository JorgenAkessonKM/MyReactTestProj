import { useState } from "react";
import "./App.css";
//import Message from "./Components/Message";
import ListGroup from "./Components/ListGroup";
import Alert from "./Components/Alert";
import Button from "./Components/Button";
import Header from "./Components/Header/Header";
import Content from "./Components/Content/Content";
import Footer from "./Components/Footer/Footer";

function AppOld() {
  const [count, setCount] = useState(0);
  let items = ["New York", "Paris", "Varberg", "Malmö"];
  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  return (
    <>
      <div>
        <Header />
        <Content />
        <Footer />
      </div>
      <hr />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <ListGroup
        items={items}
        heading="List Group"
        onSelectItem={handleSelectItem}
      ></ListGroup>
      <Alert text="Jörgen">
        <h1>Hello world Alert!</h1>
      </Alert>
      <Button children="<hi>TestButton</h1>"></Button>
    </>
  );
}

export default AppOld;
