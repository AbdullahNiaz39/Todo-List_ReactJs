import React,{ useState } from "react";
import "./App.css";

function App() {


  //state -Hooks usestate
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);
  //update
  const [updateitem, setUpdateItem] = useState("");
  const [editShow, setShowEdit] = useState(-1);

  const handleChange = (e) => {
    const value = e.target.value;
    setNewItem(value);
  };

  //edit
  const edit=(id,newText)=>{
const current=items.filter((item)=>item.id===id);
const item={
id:current.id,
value:newText,
    }
deleteItem(id);

setItems((oldItem)=>[...oldItem,item]);
setUpdateItem("");
setShowEdit(-1);
  }

  //helper function
  const addset = () => {
    if (!newItem) {
      alert("Enter an Item.");
      return;
    }
    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem,
    };
    setItems((oldItem) => [...oldItem, item]);

    setNewItem("");
  };
  /// Enter key through submit 
  const keySubmit = (e) => {
    if (e.key === "Enter") {
      addset();
    }
  };


  ///Delete function
  const deleteItem = (id) => {
    const NewArray = items.filter((item) => item.id !== id);
    setItems(NewArray);
  };
  return (
    <div className="App">
      {/* Header */}
      <h1>Todo List App</h1>
      {/* Input Field */}
      <input
        type="text"
        name="name"
        id="txtfield"
        onKeyPress={keySubmit}
        onChange={handleChange}
        placeholder="Add an item.."
        value={newItem || ""}
      ></input>

      <button onClick={(e) => addset()}>Add</button>
      {/* Unordered List */}
      <ul>
        {
        items.map((item) => {
        return(  
            <div>
            <li key={item.id} >
            {item.value}
            <button className="btn-del" onClick={() => setShowEdit(item.id)}>
            📘
            </button>
            <button className="btn-del" onClick={() => deleteItem(item.id)}>
              ❌
            </button>
          </li>
          {editShow===item.id ?
      <div>
       <input type="text" 
       value={updateitem}
       onChange={(e)=>setUpdateItem(e.target.value)}
       
       ></input>
       <button onClick={() => edit(item.id, updateitem)}>
                    Update
                  </button> 
      </div>
      :null}
          </div>
        )})
        }
      </ul>
      
    </div>
  );
}

export default App;
