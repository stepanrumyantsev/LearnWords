import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonPage,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonItemDivider,
    IonTextarea
} from "@ionic/react";
import { saveOutline, trashOutline } from "ionicons/icons";
import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { makeid } from "../generateId";
import { UpdateWordsContext } from "../UpdateWordsContext";

const WordPage = () => {
    const history = useHistory();
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [notes, setNotes] = useState("");
    const [item, setItem] = useState({
        title: "",
    });


    const handleEdit = (id, Location) => {
        const items = JSON.parse(localStorage.getItem(Location) || "{}");
        if (items.length) {
            items.forEach(function (index, value) {
                if (items[value].id.includes(id)) {
                    items[value].input = title;
                    items[value].notes = notes;
                    localStorage.setItem(Location, JSON.stringify(items));
                }
            });
        }
    };

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem("dictionary") || "{}");

        if (items.length) {
            items.forEach(function (index, value) {
                if (items[value].id.includes(id)) {

                    setItem(items[value]);
                    setTitle(items[value].input);
                    setNotes(items[value].notes);
                }
            });
        }
    }, []);

    useEffect(() => {
        handleEdit(item.id, "dictionary");
        setUpdateWords(makeid(16));


    }, [title, notes]);

    const handleDelete = (id, Location) => {
        const items = JSON.parse(localStorage.getItem(Location) || "{}");

        if (items.length) {
            items.forEach(function (index, value) {
                if (items[value].id.includes(id)) {
                    items.splice(value, 1);
                    localStorage.setItem(Location, JSON.stringify(items));
                }
            });
        }
        history.goBack();
    };

    const { setUpdateWords } = useContext(UpdateWordsContext);

    const getItemFromStorage = (id, Location) => {
        const items = JSON.parse(localStorage.getItem(Location) || "{}");
        if (items.length) {
            items.forEach(function (index, value) {
                if (items[value].id.includes(id)) {

                    return items[value];
                }
            });
        }
    };

    return (
        <div>
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton />
                        </IonButtons>
                        <IonTitle>{title || ""}</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={() => {
                                handleDelete(item.id, "dictionary");
                                setUpdateWords(makeid(16));
                            }}>
                                <IonIcon icon={trashOutline} slot="icon-only" />
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>

                <IonContent className="ion-padding">
                    <IonItem>
                        <IonLabel position="fixed">Item Name: </IonLabel>
                        <IonInput
                            placeholder={"Name"}
                            value={title || ""} className={"ion-text-right"}
                            onIonChange={(event) => setTitle(event.detail.value)}
                        />
                    </IonItem>

                    <IonItemDivider>Notes</IonItemDivider>
                    <IonItem>
                        <IonTextarea placeholder="Enter more information here..." value={notes} onIonChange={e => setNotes(e.detail.value)}></IonTextarea>
                    </IonItem>


                </IonContent>
            </IonPage>
        </div>
    );
};

export default WordPage;