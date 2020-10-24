import React from 'react';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import { useStateValue } from './StateProvider';

function App() {
  const [{ user }, dispatch] = useStateValue();
  console.log(user);
  return (
    <div className="app">
      {
        !user ? <Login></Login>
          :
          <div className="app_body">
            <Router>
              <Sidebar></Sidebar>
              <Switch>
                <Route path="/rooms/:roomId">
                  <Chat></Chat>
                </Route>
              </Switch>
            </Router>
          </div>
      }
    </div>
  );
}

export default App;
