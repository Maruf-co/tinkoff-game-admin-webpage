import './styles/App.css';

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {useEffect} from "react";
// pages
import {Login} from "./Login";
import {NotFound} from "./NotFound";
import {MainPage} from "./MainPage";
import {MakePresetPage} from "./MakePresetPage";
import {MakeRoomPage} from "./MakeRoomPage";


export const SERVER_URL = "https://tinkoff-quest-test-server.herokuapp.com";

function App() {
    useEffect(() => {
        document.title = 'T-Battle | Admin'
    }, [])

    return (
      <div className="App">

          <Router>
              <Routes>
                  <Route path={`/`} element={<Login />} />
                  <Route path={`/main/:id`} element={<MainPage />} />
                  <Route path='/main/:id/create_preset' element={<MakePresetPage/>} />
                  <Route path='/main/:id/create_room' element={<MakeRoomPage/>} />
                  <Route path='*' element={<NotFound />} />
              </Routes>
          </Router>
      </div>
    );
}

export default App;
