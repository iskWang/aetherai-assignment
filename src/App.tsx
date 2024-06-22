import TodoScene from "Scene/Todo";
import styles from "./App.module.scss";

const App = () => {
  return (
    <>
      <div className={styles.container}>
        <TodoScene />
      </div>
    </>
  );
};

export default App;
