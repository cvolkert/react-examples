import './App.css';
import PopulationsWrapper from "./pages/example/context/PopulationsWrapper";
import RocketLauncherWrapper from "./pages/example/synced/RocketLauncherWrapper";
import {useNavigationContext} from "./context/NavigationContext";
import NavBar from "./components/NavBar";
import Home from "./components/Home";

function App() {

    const {page} = useNavigationContext()

    function renderContent() {
        if (page === 'home'){
            return <Home />
        }
        if (page === 'synced') {
            return <RocketLauncherWrapper/>
        }
        if (page === 'observable-context') {
            return <PopulationsWrapper/>
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <NavBar/>
            </header>
            <div className={"content-wrapper"}>
                {renderContent()}
            </div>
        </div>
    );
}

export default App;
