import { BrowserRouter, Route, Switch } from "react-router-dom";
// Usar o Switch Pelo fato de ter colocado o ( exact no /room/new e não ter funfado)
// Switch não deixa nunca cair 2 paginas na mesma
// Se alguma sala for satisfeita ou encontrada, ele não deixa renderizar outra
import { NewRoom } from "./pages/NewRoom";
import { Home } from "./pages/Home";

import { AuthContextProvider} from './context/AuthContext'
import { Room } from "./pages/Room";
import { AdminRoom } from "./pages/AdminRoom";

function App() {

  return (
    <BrowserRouter> 
    <AuthContextProvider>
      <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/rooms/new" component={NewRoom} />
      <Route path="/rooms/:id" component={Room} />

      <Route path="/admin/rooms/:id" component={AdminRoom} />
    </Switch>
    </AuthContextProvider>
    </BrowserRouter>  
  );
}

export default App;
