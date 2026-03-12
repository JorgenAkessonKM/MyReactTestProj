import "./Home.css";
import DynamicComponent from "../Components/components";
import { Button } from "react-bootstrap";
import { useState } from "react";

// const data = {
//   content: {
//     body: [
//       {
//         component: "one",
//         id: "111",
//         name: "Dynamic component of type One",
//       },
//       {
//         component: "two",
//         id: "222",
//         name: "Dynamic component of type Two",
//       },
//     ],
//   },
// };

class BodyItem {
  public component: string;
  public id: number;
  public name: string;

  constructor(component: string, id: number, name: string) {
    this.component = component;
    this.id = id;
    this.name = name;
  }
}

class Content {
  public body: BodyItem[];

  constructor(body: BodyItem[] = []) {
    this.body = body;
  }
}

class PageData {
  public content: Content;

  constructor(content: Content = new Content()) {
    this.content = content;
  }
}

function Home() {
  const [data, setData] = useState<PageData>(new PageData());

  function AddComponentHandler(): void {
    const myData = new PageData(
      new Content([
        new BodyItem("one", Math.random(), "Dynamic component of type One"),
        new BodyItem("two", Math.random(), "Dynamic component of type Two"),
      ]),
    );

    setData(
      (prev) =>
        new PageData(
          new Content([...prev.content.body, ...myData.content.body]),
        ),
    );
  }

  return (
    <div className="home-container">
      <h1>Home Page</h1>
      <Button onClick={AddComponentHandler}>Add comnponents</Button>
      {data.content.body.map((b) => {
        return <DynamicComponent key={b.id} block={{ ...b, Name: b.name }} />;
      })}
    </div>
  );
}

export default Home;
