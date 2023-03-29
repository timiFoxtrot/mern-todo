import axios from "axios";
import "./App.css";
import { useState, useEffect } from "react";
import Form from "./components/Form"

function App() {
  // eslint-disable-next-line
  const [itemText, setItemText] = useState("");
  const [listItems, setListItems] = useState([]);
  const [updateItemText, setUpdateItemText] = useState("");
  const [isUpdating, setIsUpdating] = useState("");

  const handleStateChange = (newState) => {
    setItemText(newState)
  }

  //Add item
  const addItem = async (e, iText) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://mern-todo-api-pr0a.onrender.com/api/v1/item", {
        item: iText,
      });
      console.log(res);
      setListItems((prevItems) => [res.data.item, ...prevItems]);
      setItemText("");
    } catch (error) {
      console.log(error);
    }
  };

  //Fetch all items
  useEffect(() => {
    const getItemList = async () => {
      try {
        const res = await axios.get("https://mern-todo-api-pr0a.onrender.com/api/v1/items");
        setListItems(res.data.items);
      } catch (error) {
        console.log(error);
      }
    };
    getItemList();
  }, []);

  //Delete Item
  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`https://mern-todo-api-pr0a.onrender.com/api/v1/item/${id}`);
      console.log(res.data);
      const newListItems = listItems.filter((item) => item._id !== id);
      setListItems(newListItems);
    } catch (error) {
      console.log(error);
    }
  };

  //Edit item
  const updateItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `https://mern-todo-api-pr0a.onrender.com/api/v1/item/${isUpdating}`,
        {
          item: updateItemText,
        }
      );
      setUpdateItemText("");
      setIsUpdating("");
      console.log(res.data);
      const updatedItemIndex = listItems.findIndex(
        (item) => item._id === isUpdating
      );
      //eslint-disable-next-line
      const updatedItem = (listItems[updatedItemIndex].item = updateItemText);
    } catch (error) {
      console.log(error);
    }
  };

  //before updating item, we need to show input field where we will create the updated item
  const renderUpdateForm = () => {
    return (
      <form
        className="update-form"
        onSubmit={(e) => {
          updateItem(e);
        }}
      >
        <input
          type="text"
          className="update-new-input"
          placeholder="New Item"
          value={updateItemText}
          onChange={(e) => {
            setUpdateItemText(e.target.value);
          }}
        />
        <button className="update-new-btn" type="submit">
          Update
        </button>
      </form>
    );
  };
console.log(listItems);
  return (
    <div className="App">
      <h1>Todo List</h1>
      <Form addItem={addItem} handleStateChange={handleStateChange}/>
      <div className="todo-listItems">
        {listItems.map((item) => (
          <div className="todo-item" key={item._id}>
            {isUpdating === item._id ? (
              renderUpdateForm()
            ) : (
              <>
                <p className="item-content">{item.item}</p>
                <button
                  className="update-item"
                  onClick={() => {
                    setUpdateItemText(item.item);

                    setIsUpdating(item._id);
                  }}
                >
                  Update
                </button>
                <button
                  className="delete-item"
                  onClick={() => {
                    deleteItem(item._id);
                  }}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
