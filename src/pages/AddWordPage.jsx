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
    IonTextarea,
    IonItemDivider
} from "@ionic/react";
import { saveOutline, trashOutline } from "ionicons/icons";
import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { UpdateWordsContext } from "../UpdateWordsContext";
import { makeid } from "../generateId";
import axios from 'axios';
import deepl from "deepl"

const AddWordPage = () => {


    const translate = require("deepl");







    const history = useHistory();
    const { id } = useParams();
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    //const [amount, setAmount] = useState(1.0);
    const [inputLanguage, setInputLanguage] = useState("DE");
    const [outputLanguage, setOutputLanguage] = useState("EN");
    //const [notes, setNotes] = useState("");
    const { setUpdateWords } = useContext(UpdateWordsContext);

    useEffect(() => {
        translate({
            free_api: true,
            text: input,
            target_lang: 'FR',
            auth_key: '9eb0ef9f-e4b3-7de8-bacf-e5c527362378:fx',
            // All optional parameters available in the official documentation can be defined here as well.
        })
            .then(result => {
                console.log(result.data.translations[0]);
                setOutput(result.data.translations[0].text);
            })
            .catch(error => {
                console.error(error)
            });
    }, [input]
    );

    const handleCheck = (id, Location) => {
        const entryData = {
            id: makeid(16),
            type: "item",
            parent: id,
            input: input,
            inputLanguage: inputLanguage,
            outputLanguage: outputLanguage

        };
        let itemsHistory = [];
        if (localStorage.getItem(Location) !== null) {
            itemsHistory = JSON.parse(localStorage.getItem(Location));
        }
        itemsHistory.push(entryData);
        localStorage.setItem(Location, JSON.stringify(itemsHistory));

        history.goBack();
    };

    const handleSave = async (id) => {
        const entryData = {
            id: makeid(16),
            type: "item",
            input: input,
            inputLanguage: inputLanguage,
            outputLanguage: outputLanguage

        };

        let itemsHistory = [];
        if (localStorage.getItem("dictionary") !== null) {
            itemsHistory = JSON.parse(localStorage.getItem("dictionary"));
        }
        itemsHistory.push(entryData);
        localStorage.setItem("dictionary", JSON.stringify(itemsHistory));

        history.goBack();
    };

    return (
        <div>
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton />
                        </IonButtons>
                        <IonTitle>{input || ""}</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={() => { }}>
                                <IonIcon icon={trashOutline} slot="icon-only" />
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>

                <IonContent className="ion-padding">
                    <IonItem>
                        <IonLabel position="fixed">Original: </IonLabel>
                        <IonSelect value={inputLanguage} placeholder="Select One" onIonChange={e => setInputLanguage(e.detail.value)}>
                            <IonSelectOption value="DE">DE</IonSelectOption>
                            <IonSelectOption value="EN(s)">EN</IonSelectOption>
                        </IonSelect>
                        <IonInput
                            placeholder={"Type word or sentence"}
                            value={input || ""} className={"ion-text-right"}
                            onIonChange={(event) => setInput(event.detail.value)}
                        />
                    </IonItem>

                    <IonItem>
                        <IonLabel position="fixed">Translation: </IonLabel>
                        <IonSelect value={outputLanguage} placeholder="Select One" onIonChange={e => setOutputLanguage(e.detail.value)}>
                            <IonSelectOption value="DE">DE</IonSelectOption>
                            <IonSelectOption value="EN">EN</IonSelectOption>
                        </IonSelect>
                        <IonInput
                            placeholder={"Translation"}
                            value={output || ""} className={"ion-text-right"}
                            onIonChange={(event) => setOutput(event.detail.value)}
                        />
                    </IonItem>



                </IonContent>

                <IonButton style={{ marginBottom: '20px' }}
                    onClick={() => {
                        handleCheck(id, "dictionary");
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

export default AddWordPage;