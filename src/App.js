import React from 'react';
import { Switch, Route } from 'react-router-dom';
import login from './pages/Login';
import wallet from './pages/Wallet';

function App() {
  return (
    <>
      <div>Hello, TrybeWallet!</div>
      <Switch>
        <Route exact path="/" component={ login } />
        <Route exact path="/carteira" component={ wallet } />
      </Switch>
    </>
  );
}

export default App;
