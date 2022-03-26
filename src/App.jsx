import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import ViewMessage from './pages/ViewMessage';
import AddWordPage from './pages/AddWordPage';
import AddGroupPage from './pages/AddGroupPage';
import { UpdateWordsContext } from "./UpdateWordsContext";
import { useState } from "react";
import GroupPage from './pages/GroupPage';
import WordPage from './pages/WordPage';
import SettingsPage from './pages/SettingsPage';
import AboutPage from './pages/AboutPage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App = () => {
  const [UpdateWords, setUpdateWords] = useState();
  const value = {
    UpdateWords,
    setUpdateWords,
  };

  return (

    <IonApp>
      <UpdateWordsContext.Provider value={value}>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path="/" exact={true}>
              <Redirect to="/home" />
            </Route>
            <Route path="/home" exact={true}>
              <Home />
            </Route>
            <Route path="/message/:id">
              <ViewMessage />
            </Route>

            <Route exact path="/additem/:id" component={AddWordPage} />
            <Route exact path="/addgroup/:id" component={AddGroupPage} />
            <Route exact path="/group/:id" component={GroupPage} />
            <Route exact path="/item/:id" component={WordPage} />
            <Route exact path="/settings/" component={SettingsPage} />
            <Route exact path="/about/" component={AboutPage} />
          </IonRouterOutlet>
        </IonReactRouter>
      </UpdateWordsContext.Provider>
    </IonApp>
  );
}

export default App;
