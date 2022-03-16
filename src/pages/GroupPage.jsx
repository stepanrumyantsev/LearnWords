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
    IonFab,
    IonFabButton,
} from "@ionic/react";
import { saveOutline, trashOutline, addOutline } from "ionicons/icons";
import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { makeid } from "../generateId";
import { UpdateWordsContext } from "../UpdateWordsContext";
import GroupWordsList from "../components/GroupWordsList";

const GroupPage = () => {

    const UpdateWords = useContext(UpdateWordsContext);
    const history = useHistory();
    const { id } = useParams();
    const [item, setItem] = useState([]);

    const [children, setChildren] = useState([]);


    let childrenArray = [];


    useEffect(() => {
        const items = JSON.parse(localStorage.getItem("dictionary") || "{}");

        if (items.length) {
            items.forEach(function (index, value) {
                if (items[value].id.includes(id)) {

                    setItem(items[value]);
                }
            });
        }
    }, []);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem("dictionary") || "{}");

        if (items.length) {
            items.forEach(function (index, value) {
                if (items[value].parent.includes(id)) {

                    childrenArray.push(items[value]);

                }
            });
            setChildren(childrenArray);
        }
    }, [UpdateWords]);

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
                <IonFab slot="fixed" vertical="bottom" horizontal="end">
                    <IonFabButton routerLink={`/additem/${id}`}>
                        <IonIcon icon={addOutline} />
                    </IonFabButton>
                </IonFab>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton />
                        </IonButtons>
                        <IonTitle>{item.input || ""}</IonTitle>

                    </IonToolbar>
                </IonHeader>

                <IonContent className="ion-padding">
                    <GroupWordsList items={children} />
                </IonContent>
            </IonPage>
        </div>
    );
};

export default GroupPage;