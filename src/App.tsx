import { BrowserRouter, Route } from 'react-router-dom'
import { AuthContextProviderProps } from './contexts/AuthContext';

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';


function App() {
  return (
    <BrowserRouter>
      <AuthContextProviderProps>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
      </AuthContextProviderProps>
    </BrowserRouter>
  );
}

export default App;

// exact -> Pra acessar essa rota o endereço precisa ser exatamente o que foi mostrado