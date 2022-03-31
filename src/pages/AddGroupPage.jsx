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
} from "@ionic/react";
import { saveOutline, trashOutline } from "ionicons/icons";
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React, { useState, useContext } from "react";
import { useHistory, useParams } from "react-router";
import { makeid } from "../generateId";
import { UpdateWordsContext } from "../UpdateWordsContext";

const AddGroupPage = () => {
    const history = useHistory();
    const [title, setTitle] = useState("");
    const { setUpdateWords } = useContext(UpdateWordsContext);


    const handleSave = async () => {
        const entryData = {
            id: makeid(16),
            type: "group",
            input: title,
            checked: "false",
            children: [],
            parent: ""
        };

        let itemsHistory = [];
        if (localStorage.getItem("dictionary") !== null) {
            itemsHistory = JSON.parse(localStorage.getItem("dictionary"));
        }
        itemsHistory.push(entryData);
        localStorage.setItem("dictionary", JSON.stringify(itemsHistory));

        //history.goBack();
        history.push(`/group/${entryData.id}`);
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
                            <IonButton onClick={() => { }}>
                                <IonIcon icon={trashOutline} slot="icon-only" />
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>

                <IonContent className="ion-padding">
                    <IonItem>
                        <IonLabel position="fixed">Group Name: </IonLabel>
                        <IonInput
                            placeholder={"Type group name"}
                            className={"ion-text-right"}
                            value={title || ""}
                            onIonChange={(event) => setTitle(event.detail.value)}
                        />
                    </IonItem>
                </IonContent>

                <IonButton style={{ marginBottom: '20px' }}
                    onClick={() => {
                        handleSave();
                        setUpdateWords(makeid(16));
                    }}
                >
                    <IonIcon icon={saveOutline} />
                    &nbsp;Save
                </IonButton>
            </IonPage>
        </div>
    );
};

export default AddGroupPage;