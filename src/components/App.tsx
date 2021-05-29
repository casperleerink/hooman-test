// import Main from "./Main/Main";
import Side from "./Side/Side";
import style from "./App.module.scss";
import Form from "./Form/Form";
function App() {
  return (
    <div className={style.container}>
      <Side />
      <Form />
    </div>
  );
}

export default App;
