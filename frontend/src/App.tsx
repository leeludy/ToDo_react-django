import FormTodo from './Tasks/FormAddTask';
import ListTasks from './Tasks/ListTasks';

function App() {
  return (
    <>
      <div className="h-screen w-screen p-4 bg-stone-100">
        <h1>ToDo</h1>
        <section className="bg-white max-w-[500px] w-full m-auto rounded-md shadow-xl p-4 mb-8">
          <FormTodo />
        </section>
        <section className="bg-white max-w-[500px] w-full m-auto rounded-md shadow-xl p-4">
          <ListTasks />
        </section>
      </div>
    </>
  );
}

export default App;
