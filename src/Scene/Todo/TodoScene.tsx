import TodoContainer from "Container/Todo/TodoContainer";
import TodoPresentation from "Presentation/Todo";

const TodoScene = () => {
  return (
    <TodoContainer>
      <TodoPresentation />
    </TodoContainer>
  );
};

export default TodoScene;
