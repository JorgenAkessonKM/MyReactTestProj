import "./App.css";

import Header from "./Components/Header/Header";
import Content from "./Components/Content/Content";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import {store} from "./app/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Header />
          <Content />
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
