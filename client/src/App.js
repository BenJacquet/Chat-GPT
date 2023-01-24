import './normalize.css';
import './App.css';
import SideMenu from './components/layout/SideMenu/SideMenu';
import Chat from './components/layout/Chat/Chat';

function App() {


  return (
    <div className="App">
      <SideMenu />
      <Chat />
    </div>
  );
}

export default App;
