import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import Filters from "./Filters";

const Body = () => {
  const [todos, setTodo] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({});
  const [dragItem, setDragItem] = useState(null);

  useEffect(() => {
    const allTodos = localStorage.getItem("todos") || [];
    const allCategories = [...categories];
    if (allTodos.length) {
      JSON.parse(allTodos).forEach((todo) => {
        if (todo?.category && !allCategories.includes(todo.category)) {
          allCategories.push(todo.category);
        }
      });
      setCategories(allCategories);
      setTodo(JSON.parse(allTodos));
    }
  }, []);

  const onclickSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dataTodo = Object.fromEntries(formData);

    if (!dataTodo.title || dataTodo.title.length() < 3) {
      return;
    }

    const newTodo = {
        "title": dataTodo.title.trim(),
        "id": Date.now().toString(16),
        "status": "pending",
        "dueDate": dataTodo.dueDate,
        "category": dataTodo?.category.trim(),
        "tags": []
    }
    if (dataTodo.tags) {
      const tags = dataTodo.tags.split(" ");
      newTodo.tags = tags.filter((tag) => tag.length).map((tag) => tag.trim());
    }

    localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
    setTodo([...todos, newTodo]);

    if (newTodo?.category && !categories.includes(newTodo.category)) {
      setCategories([...categories, newTodo.category]);
    }

    e.target.reset();
  };

  const setStatus = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        if (todo.status === "pending") {
          todo.status = "completed";
        } else {
          todo.status = "pending";
        }
      }
      return todo;
    });
    setTodo(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const deleteTodo = (id) => {
    const origTodos = JSON.parse(localStorage.getItem("todos"));
    const updatedTodos = origTodos.filter((todo) => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    if (!Object.keys(filters).length) {
      setTodo(updatedTodos);
    } else {
      applyFilters();
    }
    const newCategories = [];
    updatedTodos.forEach(todo => todo.category && !newCategories.includes(todo.category) && newCategories.push(todo.category));
    setCategories(newCategories);
    
  };

  const updateTodoList = (id, title) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.title = title;
      }
      return todo;
    });
    setTodo(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const renderInput = () => {
    return (
      <div className="w-[20rem] sm:w-[27rem] pr-4 pt-4 mx-auto lg:border-r-[1px] flex-none animate-slide-in transition-all">
        <h1 className="text-3xl font-extrabold mb-16">What's on your mind?</h1>
        <form
          className="p-2 border rounded-lg flex flex-col gap-3 shadow"
          onSubmit={onclickSubmit}
        >
          <input
            type="text"
            name="title"
            className="w-full pl-4 h-11 border border-solid rounded-lg outline-none focus:shadow-lg"
            placeholder="Add Todo..."
            required
            // value={inputTask}
            // onChange={(e) => setInputTask(e.target.value)}

          />
          <input
            type="text"
            name="category"
            className="w-full pl-4 h-11 border border-solid rounded-lg outline-none focus:shadow-lg"
            placeholder="Add category"
          />
          <input
            type="date"
            name="dueDate"
            className="w-full px-4 h-11 border border-solid rounded-lg outline-none focus:shadow-lg"
          />
          <input
            type="text"
            name="tags"
            className="w-full px-4 h-11 border border-solid rounded-lg outline-none focus:shadow-lg"
            placeholder="Tags (space separated)"
          />
          <button
            type="submit"
            className="p-2 border rounded hover:bg-cyan-400"
          >
            Add
          </button>
        </form>
      </div>
    );
  };

  const applyFilters = () => {
    let allTodos = localStorage.getItem("todos") || [];
    let todoCopy = [...JSON.parse(allTodos)];
    
    Object.keys(filters).forEach((key) => {
      todoCopy = todoCopy.filter(todo => todo[key] === filters[key]);
    })
    setTodo(todoCopy);
  };

  const setSelectedFilter = (type, value) => {
    const newFilter = { ...filters };
    if (value === "all") {
      delete newFilter[type];
    } else {
      newFilter[type] = value;
    }
    setFilters(newFilter);
  };

  const handleMoveTodo = (todo) => {
    const newTodos = [...todos];
    if (!dragItem) return;

    const currentIndex = newTodos.indexOf(dragItem); 
    const targetIndex = newTodos.indexOf(todo);

    if (currentIndex !== -1 && targetIndex !== -1) {
        newTodos.splice(currentIndex, 1); 
        newTodos.splice(targetIndex, 0, dragItem); 
        setTodo(newTodos);
    } 
  }

  return (
    <div className="mx-[7%] my-16 flex flex-col lg:flex-row gap-6">
      {renderInput()}
      <div className="w-full flex flex-col flex-1 pt-4">
        <Filters
          categories={categories}
          applyFilters={applyFilters}
          setSelectedFilter={setSelectedFilter}
        />
        <div className="flex flex-col gap-5 w-full transition-all">
          {todos.map((todo) => {
            return (
              <TodoItem
                key={todo.id}
                setStatus={setStatus}
                deleteTodo={deleteTodo}
                todo={todo}
                updateTodoList={updateTodoList}
                moveTodo={handleMoveTodo}
                setDragItem={setDragItem}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Body;
