import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import ViewMessage from './pages/ViewMessage';
import AddWordPage from './pages/AddWordPage';
import { UpdateWordsContext } from "./UpdateWordsContext";
import { useState } from "react";

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
  const [UpdateItems, setUpdateItems] = useState();
  const value = {
    UpdateItems,
    setUpdateItems,
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
          </IonRouterOutlet>
        </IonReactRouter>
      </UpdateWordsContext.Provider>
    </IonApp>
  );
}

export default App;
