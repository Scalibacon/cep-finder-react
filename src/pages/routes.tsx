import { BrowserRouter, Route, Routes as Switch} from 'react-router-dom';
import FindAddressPage from './FindAddressPage';
import FindCepPage from './FindCepPage';
import Home from './Home';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/cep' element={<FindCepPage/>}></Route>
        <Route path='/address' element={<FindAddressPage/>}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
