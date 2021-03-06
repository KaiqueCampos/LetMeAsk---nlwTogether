import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AuthContextProviderProps } from './contexts/AuthContext';
import { AdminRoom } from './pages/AdminRoom';
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room';
import { ToastContainer } from 'react-toastify';
import { ThemeContextProvider } from './contexts/ThemeContext';


function App() {
  return (
    <BrowserRouter>
      <ThemeContextProvider>
        <AuthContextProviderProps>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/rooms/new" component={NewRoom} />
            <Route path="/rooms/:id" component={Room} />
            <Route path="/admin/rooms/:id" component={AdminRoom} />
          </Switch>
          <ToastContainer />
        </AuthContextProviderProps>
      </ThemeContextProvider>
    </BrowserRouter>
  );
}

export default App;

// exact -> To access this route, the address must be exactly as shown.
// Switch -> don't let two routes be called at the same time