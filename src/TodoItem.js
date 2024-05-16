import { useEffect, useRef, useState } from "react";

const TodoItem = (props = {}) => {
  const { deleteTodo, setStatus, todo = {}, updateTodoList, moveTodo, setDragItem } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editableTitle, setEditTitle] = useState(todo.title);
  const inputRef = useRef();
  const itemRef = useRef();

  const updateTodo = () => {
    if (isEditing) {
      if (!editableTitle.trim()) {
        alert("Title can not be empty");
      }
      if (todo.title !== editableTitle.trim() && editableTitle.trim()) {
        updateTodoList(todo.id, editableTitle.trim());
        setEditTitle(editableTitle.trim());
      }
      setEditTitle(todo.title);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const deleteT = (e) => {
    itemRef.current.classList.remove('animate-slide-up');
    itemRef.current.classList.add('animate-delete-up');
    setTimeout(() => {
        deleteTodo(todo.id)
    }, 150);
  }

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleDragStart = (e) => {
    setDragItem(todo);
    e.dataTransfer.setData('text/plain', todo.id.toString());
  };

  const handleDragEnd = () => {
    setDragItem(null);
  }

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = () => {
    moveTodo(todo);
  };

  const isTodoCompleted = todo?.status === "completed";

  return (
    <div
      key={todo.id}
      className={`p-3 h-fit border rounded-lg bg-white animate-slide-up transition-all ${isEditing && 'shadow-lg'}`}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnd={handleDragEnd}
      ref={itemRef}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={isTodoCompleted}
            onChange={() => setStatus(todo.id)}
            className="cursor-pointer"
          />
          {!isEditing ? (
            <div
              className={`${
                isTodoCompleted && "line-through"
              } w-full outline-none`}
            >
              {todo.title}
            </div>
          ) : (
            <input
              type="text"
              value={editableTitle}
              ref={inputRef}
              className="w-full outline-none"
              onChange={(e) => setEditTitle(e.target.value)}
              required
            />
          )}
        </div>
        <div className="flex gap-4 items-center">
          <button
            className={`border px-1 sm:px-2 w-fit rounded-lg hover:shadow ${isEditing ? 'hover:bg-lime-300' : 'hover:bg-amber-200'}`}
            onClick={() => updateTodo()}
          >
            {!isEditing ? "Edit" : "Save"}
          </button>
          <button
            className="border px-1 sm:px-2 w-fit rounded-lg hover:bg-red-400 hover:shadow"
            onClick={deleteT}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="flex items-center gap-4 justify-end mt-4">
          {todo.category && <div className="text-sm">Category: {todo.category}</div>}
          {todo.dueDate && <div className="text-sm">Due: {todo.dueDate}</div>}
          {todo?.tags?.length > 0 && <div className="text-sm overflow-hidden whitespace-nowrap text-ellipsis max-w-[10rem]" title={todo.tags.join(", ")}>Tags: {todo.tags.join(", ")}</div>}
      </div>
      
    </div>
  );
};

export default TodoItem;
