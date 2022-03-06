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
import React, { useState, useContext } from "react";
import { useHistory, useParams } from "react-router";
//import { UpdateItemsContext } from "../UpdateItemsContext";
//import { makeid } from "../generateId";

const AddWordPage = () => {
    const history = useHistory();
    const { id } = useParams();
    const [title, setTitle] = useState("");
    //const [amount, setAmount] = useState(1.0);
    //const [units, setUnits] = useState("piece(s)");
    //const [notes, setNotes] = useState("");
    //const { setUpdateItems } = useContext(UpdateItemsContext);

    const handleCheck = (id, Location) => {
        const entryData = {
            id: "ddd",
            type: "item",
            parent: id,
            title: title,

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
            id: "ddf",
            type: "item",
            title: title,

        };

        let itemsHistory = [];
        if (localStorage.getItem("itemsHistory") !== null) {
            itemsHistory = JSON.parse(localStorage.getItem("itemsHistory"));
        }
        itemsHistory.push(entryData);
        localStorage.setItem("itemsHistory", JSON.stringify(itemsHistory));

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
                        <IonLabel position="fixed">Item Name: </IonLabel>
                        <IonInput
                            placeholder={"Type item name"}
                            value={title || ""} className={"ion-text-right"}
                            onIonChange={(event) => setTitle(event.detail.value)}
                        />
                    </IonItem>



                </IonContent>

                <IonButton style={{ marginBottom: '20px' }}
                    onClick={() => {
                        handleCheck(id, "itemsHistory");
                        //setUpdateItems(makeid(16));
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