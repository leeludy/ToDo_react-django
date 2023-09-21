import FormTodo from './Tasks/FormAddTask';
import ListTasks from './Tasks/ListTasks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  // desable retry on fail
  defaultOptions: { queries: { retry: false } },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen w-screen p-4 bg-stone-100">
        <h1>ToDo</h1>
        <section className="bg-white max-w-[500px] w-full m-auto rounded-md shadow-xl p-4 mb-8">
          <FormTodo />
        </section>
        <section className="bg-white max-w-[500px] w-full m-auto rounded-md shadow-xl p-4">
          <ListTasks />
        </section>
      </div>
    </QueryClientProvider>
  );
}

export default App;
