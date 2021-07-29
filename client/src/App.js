import logo from './logo.svg';
import './App.css';
import Form from './components/Form'
import {Router} from '@reach/router'
function App() {
  return (
    <div className="App">
    <Router>
      <Form path="/register"/>
    </Router>
    </div>
  );
}

export default App;
