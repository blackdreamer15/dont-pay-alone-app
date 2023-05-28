import { useState } from "react";

// const initialFriends = [
//   {
//     id: 118836,
//     name: "Clark",
//     image: "https://i.pravatar.cc/48?u=118836",
//     balance: -7,
//   },
//   {
//     id: 933372,
//     name: "Sarah",
//     image: "https://i.pravatar.cc/48?u=933372",
//     balance: 20,
//   },
//   {
//     id: 499476,
//     name: "Anthony",
//     image: "https://i.pravatar.cc/48?u=499476",
//     balance: 0,
//   },
// ];


function Button({ onClick, children }) {
  return (
    <button className="button" onClick={onClick}>{children}</button>
  );
}


export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friendList, setFriendList] = useState([]);

  function handleClicking() {
    setShowAddFriend(showAddFriend => !showAddFriend);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList />

        {showAddFriend &&
          <AddFriendForm
            friendList={friendList}
            onSetFriendList={setFriendList}
          />
        }

        <Button onClick={handleClicking}>
          {
            showAddFriend ?
              "Close" : "Add Friend"
          }
        </Button>
      </div>

      <SplitBillForm />
    </div>
  );
}


function FriendList() {

  return (
    <ul>
      {
        friendList.map(friend => (
          <Friend key={friend.id}
            name={friend.name}
            image={friend.image}
            balance={friend.balance}
          />
        ))
      }
    </ul>
  )
}

function Friend({ name, image, balance }) {
  return (
    <li>
      <img src={image} alt={name} />
      <h3>{name}</h3>

      {balance > 0 ?
        <p className="green">
          {name} owes you {balance}€
        </p>
        :
        ((balance < 0) ?
          <p className="red">
            You owe {name} you {balance}€
          </p>
          : (
            <p>
              You and {name} are even
            </p>
          )
        )}
      <Button>Select</Button>
    </li>
  );
}


function AddFriendForm({ friendList, onSetFriendList }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  function handleSubmitForm(e) {
    e.preventDefault();

    const newFriend = {
      name: name,
      image: image
    };
    console.log(newFriend);
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmitForm}>
      <label>👫 Friend name</label>
      <input type="text" value={name}
        onChange={e => setName(e.target.value)}
      />

      <label>🎇 Image URL</label>
      <input type="text" value={image} onChange={e => setImage(e.target.value)} />

      <Button>Add</Button>
    </form>
  );
}

function SplitBillForm() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>

      <label>💰 BIll value</label>
      <input type="text" />

      <label>🧍 Your expense</label>
      <input type="text" />

      <label>👫 X's expense</label>
      <input type="text" disabled />

      <label></label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}