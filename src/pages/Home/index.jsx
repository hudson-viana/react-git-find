import { useState } from "react";
import { Header } from "../../components/Header";
import ItemList from "../../components/ItemList";
import "./styles.css";

function App() {
  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();
    
    if(newUser.name) {
      const {avatar_url, name, bio, login} = newUser;
      setCurrentUser({avatar_url, name, bio, login});

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await reposData.json();

      if(newRepos.length) {
        setRepos(newRepos);
      }
    }
  }
  
  
  
  return (
    <div className="App">
      <Header />
      <div className="content">
        <img src="src/assets/background.png" className="background" alt="background image" />
        <div className="info">
          <div className="search-section">
            <input 
            type="text" 
            name="username" 
            placeholder="@username"
            value={user}
            onChange={event => setUser(event.target.value)} />
            <button onClick={handleGetData}>Search</button>
          </div>
            {currentUser?.name ? (
              <>
              <div className="profile-container">
                <div className="profile-image">
                  <img
                    src={currentUser.avatar_url}
                    alt="profile image"
                  />
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
            {repos.map(repo => (
              <ItemList title={repo.name} description={repo.description} />

            ))}
          </div>

        ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
