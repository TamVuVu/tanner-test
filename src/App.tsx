import ToDoList from "./Components/ToDoList";

function App() {
  return (
    <div className="App">
      <ToDoList enableNotifications={true} hide={false} />
    </div>
  );
}

export default App;
