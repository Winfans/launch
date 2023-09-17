import { useRoutes } from 'react-router-dom';
import { routes } from './config';
import './App.less';
import 'normalize.css';

function App() {
  const elementRoute = useRoutes(routes);
  return <div>{elementRoute}</div>;
}

export default App;
