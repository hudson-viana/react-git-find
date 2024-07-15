import { useState } from "react";
import { Header } from "../../components/Header";
import ItemList from "../../components/ItemList";
import "./styles.css";
import background from "../../assets/background.png";

function App() {
  const [user, setUser] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();

    if (newUser.name) {
      const { avatar_url, name, bio, login } = newUser;
      setCurrentUser({ avatar_url, name, bio, login });

      const reposData = await fetch(
        `https://api.github.com/users/${user}/repos`
      );
      const newRepos = await reposData.json();

      if (newRepos.length) {
        setRepos(newRepos);
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleGetData();
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="content">
        <img src={background} className="background" alt="background image" />
        <div className="info">
          <div className="search-section">
            <input
              type="text"
              name="username"
              placeholder="@username"
              value={user}
              onKeyDown={handleKeyDown}
              onChange={(event) => setUser(event.target.value)}
            />
            <button onClick={handleGetData}>Search</button>
          </div>
          {currentUser?.name ? (
            <>
              <div className="profile-container">
                <div className="profile-image">
                  <img src={currentUser.avatar_url} alt="profile image" />
                </div>
                <div className="profile-text">
                  <h3>{currentUser.name}</h3>
                  <span>@{currentUser.login}</span>
                  <p>{currentUser.bio}</p>
                </div>
              </div>
              <hr />
            </>
          ) : null}
          {repos?.length ? (
            <div className="repositories">
              <h4>Repositories</h4>
              {repos.map((repo, index) => (
                <ItemList
                  key={index}
                  title={repo.name}
                  description={repo.description}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
