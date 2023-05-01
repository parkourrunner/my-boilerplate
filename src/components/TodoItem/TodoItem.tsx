import React, { useEffect, useState } from "react";
import { Item } from "../../types/Item";

interface Props {
  item: Item;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onSave: (id: number, newTitle: string) => void;
}

function TodoItem({ item, onDelete, onToggle, onSave }: Props) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [itemTitle, setItemTitle] = useState<string>("");

  useEffect(() => {
    setItemTitle(item.title);
  }, []);

  function handleDelete() {
    onDelete(item.id);
  }
  function handleChange() {
    onToggle(item.id);
  }
  function handleSaveChange() {
    setEditMode(!editMode);
    onSave(item.id, itemTitle);
  }

  return (
    <li className="list-group-item d-flex justify-content-between my-2">
      {editMode ? (
        <div className="input-group">
          <input
            className="form-control"
            placeholder="Edit Todo"
            type="text"
            value={itemTitle}
            onChange={(e) => setItemTitle(e.target.value)}
          />
        </div>
      ) : (
        <h6
          className={`mt-1 mb-0 align-middle ${
            item.done ? "completed-task" : ""
          }`}
        >
          {item.title}
        </h6>
      )}

      <div>
        <span
          className={`mx-2 ${item.done ? "text-success" : "text-secondary"}`}
          onClick={handleChange}
          style={{ cursor: "pointer" }}
        >
          <i
            className={`${item.done ? "far fa-check-square" : "far fa-square"}`}
          />
        </span>
        <span
          className={"mx-2 text-warning"}
          style={{ cursor: "pointer" }}
          onClick={() =>
            editMode ? handleSaveChange() : setEditMode(!editMode)
          }
        >
          <i className={`fas ${editMode ? "fa-check" : "fa-pen"}`} />
        </span>
        <span
          className={`mx-2 text-danger `}
          style={{ cursor: "pointer" }}
          onClick={handleDelete}
        >
          <i className={"fas fa-trash"} />
        </span>
      </div>
    </li>
  );
}

export default TodoItem;
