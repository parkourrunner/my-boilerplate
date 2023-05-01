import React, { useEffect, useState } from "react";
import TodoItem from "../../components/TodoItem/TodoItem";
import { Item } from "../../types/Item";
import { Button } from "react-bootstrap";

function Todo() {
  const [items, setItems] = useState<Item[]>([
    {
      title: "test",
      id: 0,
      done: false,
    },
  ]);
  const [currentViewItems, setCurrentViewItems] = useState<Item[]>([]);

  const [newTitle, setNewTitle] = useState<string>("");

  function handleAddNewTask() {
    setItems([
      ...items,
      {
        title: newTitle,
        done: false,
        id: new Date().valueOf(),
      },
    ]);
    setCurrentViewItems([
      ...items,
      {
        title: newTitle,
        done: false,
        id: new Date().valueOf(),
      },
    ]);
    setNewTitle("");
  }

  function onDeleteItem(id: number) {
    let newItemList = [...items];
    const index = newItemList.findIndex((obj) => obj.id === id);
    newItemList.splice(index, 1);
    setItems(newItemList);
    setCurrentViewItems(newItemList);
  }

  function onToggle(id: number) {
    let newItemList = [...items];
    const index = newItemList.findIndex((obj) => obj.id === id);
    newItemList[index].done = !newItemList[index].done;
    setItems(newItemList);
  }

  function onSave(id: number, newTitle: string) {
    let newItemList = [...items];
    const index = newItemList.findIndex((obj) => obj.id === id);
    newItemList[index].title = newTitle;
    setItems(newItemList);
  }

  function deleteAll() {
    setItems([]);
  }

  function deleteDone() {
    const newItemList = items.filter((obj) => !obj.done);
    setItems(newItemList);
  }

  function showAll() {
    setCurrentViewItems(items);
  }

  function showDone() {
    const newItemList = items.filter((obj) => obj.done);
    setCurrentViewItems(newItemList);
  }

  function showTodo() {
    const newItemList = items.filter((obj) => !obj.done);
    setCurrentViewItems(newItemList);
  }

  useEffect(() => {
    setCurrentViewItems(items);
  }, [items]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-10 col-md-8 mx-auto mt-4">
          <h3 className="text-capitalize text-center">TodoInput</h3>
          <div className="card card-body my-3">
            <form>
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text bg-info text-white">
                    <i className="fas fa-book" />
                  </div>
                </div>
                <input
                  className="form-control"
                  placeholder="New Todo"
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>

              <button
                onClick={handleAddNewTask}
                type="button"
                className={"btn btn-block mt-3 w-100 btn-info"}
              >
                Add new task
              </button>
            </form>
          </div>
          <h3 className="text-capitalize text-center">TodoList</h3>
          <div className="row my-3">
            <div className="col-md-4">
              <Button
                type="button"
                className="btn btn-info btn-block mt-1 w-100"
                onClick={showAll}
              >
                All
              </Button>
            </div>
            <div className="col-md-4">
              <Button
                type="button"
                className="btn btn-info btn-block mt-1 w-100"
                onClick={showDone}
              >
                Done
              </Button>
            </div>
            <div className="col-md-4">
              <Button
                type="button"
                className="btn btn-info btn-block mt-1 w-100"
                onClick={showTodo}
              >
                Todo
              </Button>
            </div>
          </div>
          {currentViewItems.length === 0 ? (
            ""
          ) : (
            <ul className="list-group my-5">
              {currentViewItems.map(
                (item, index) =>
                  item && (
                    <TodoItem
                      key={index}
                      item={item}
                      onDelete={onDeleteItem}
                      onToggle={onToggle}
                      onSave={onSave}
                    />
                  )
              )}
            </ul>
          )}
          {items.length > 0 && (
            <div className="d-flex justify-content-between gap-3">
              <Button
                type="button"
                className="btn btn-danger btn-block mt-1 w-100"
                onClick={deleteDone}
              >
                Delete done tasks
              </Button>
              <Button
                type="button"
                className="btn btn-danger btn-block mt-1 w-100"
                onClick={deleteAll}
              >
                Delete all tasks
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Todo;
