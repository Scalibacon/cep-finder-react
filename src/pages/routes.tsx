import { BrowserRouter, Route, Routes as Switch} from 'react-router-dom';
import Home from './Home';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' element={<Home/>}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
