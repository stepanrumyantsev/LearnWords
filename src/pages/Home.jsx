import MessageListItem from '../components/MessageListItem';
import { useState, useContext, useEffect } from 'react';
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
import { UpdateWordsContext } from '../UpdateWordsContext'

const Home = () => {
  let initialWordsState = JSON.parse(localStorage.getItem("dictionary"));
  const UpdateWords = useContext(UpdateWordsContext);
  const setUpdateWords = useContext(UpdateWordsContext);
  const [filteredWords, setFilteredWords] = useState(initialWordsState);
  const [searchText, setSearchText] = useState("");

  const showGrouped = () => {
    let items = JSON.parse(localStorage.getItem("dictionary"))
      ? JSON.parse(localStorage.getItem("dictionary"))
      : [{}];
    let groupedItems = [];
    if (items.length) {
      items.forEach(function (index, value) {
        if (items[value].parent === "20" || items[value].parent === "") {

          groupedItems.push(items[value]);

        }
      });
      setFilteredWords(groupedItems);
    }

  }

  useEffect(() => {
    let items = JSON.parse(localStorage.getItem("dictionary"))
      ? JSON.parse(localStorage.getItem("dictionary"))
      : [{}];
    let groupedItems = [];
    if (searchText === "" && items.length) {
      items.forEach(function (index, value) {
        if (items[value].parent === "20" || items[value].parent === "") {

          groupedItems.push(items[value]);

        }
      });
      setFilteredWords(groupedItems);
    }

  }, [UpdateWords, searchText]);

  function filterByValue(array, string) {
    return array.filter((o) =>
      Object.keys(o).some((k) => {
        if (typeof o[k] === "string") {
          return o[k].toLowerCase().includes(string.toLowerCase());

        }

        return null;
      })
    );
  }

  const items = JSON.parse(localStorage.getItem("dictionary"))
    ? JSON.parse(localStorage.getItem("dictionary"))
    : [{}];
  return (
    <IonPage id="home-page">
      <AddWordFab />
      <IonHeader>
        <IonToolbar>
          <IonSearchbar placeholder="Search"
            value={searchText}
            onIonChange={(e) => {
              setSearchText(e.detail.value);
              setFilteredWords(
                filterByValue(
                  items,
                  e.detail.value
                )
              );
            }}
            showCancelButton="never"></IonSearchbar>
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
        <MainWordsList items={filteredWords} />

      </IonContent>
    </IonPage>
  );
};

export default Home;
