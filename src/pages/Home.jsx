import MessageListItem from '../components/MessageListItem';
import { useState } from 'react';
import { Message, getMessages } from '../data/messages';
import AddWordFab from '../components/AddWordFab'
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonFabButton,
  IonIcon,
  useIonViewWillEnter
} from '@ionic/react';
import './Home.css';
import { addOutline } from "ionicons/icons";
import MainWordsList from '../components/MainWordsList';

const Home = () => {

  const items = JSON.parse(localStorage.getItem("dictionary"))
    ? JSON.parse(localStorage.getItem("dictionary"))
    : [{}];
  return (
    <IonPage id="home-page">
      <AddWordFab />
      <IonHeader>
        <IonToolbar>
          <IonSearchbar></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              Inbox
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <MainWordsList items={items} />

      </IonContent>
    </IonPage>
  );
};

export default Home;
