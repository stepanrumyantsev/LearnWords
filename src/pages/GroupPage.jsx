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
import { UpdateWordsContext } from "../UpdateWordsContext";
import MainWordsList from "../components/MainWordsList";
import { arrowBackOutline } from "ionicons/icons";

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
    }, [id]);

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
    }, [UpdateWords, id]);

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
                            <IonButton routerLink={`/home/`}>
                                <IonIcon icon={arrowBackOutline}></IonIcon>

                            </IonButton>
                        </IonButtons>
                        <IonTitle>{item.input || ""}</IonTitle>

                    </IonToolbar>
                </IonHeader>

                <IonContent className="ion-padding">
                    <MainWordsList items={children} />
                </IonContent>
            </IonPage>
        </div>
    );
};

export default GroupPage;