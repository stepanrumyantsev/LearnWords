import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router";
import { informationCircleOutline } from "ionicons/icons";

const SettingsPage = () => {
    const history = useHistory();
    //const [unitsValue, setUnitsValue] = useState(localStorage.getItem("LearnWordsUnits") ? localStorage.getItem("LearnWordsUnits") : "metric");

    return (
        <div>
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="end">
                            <IonButton onClick={history.goBack}>
                                Close
                            </IonButton>
                        </IonButtons>
                        <IonTitle>Settings</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonItem button routerLink={"/about/"}>
                        <IonIcon icon={informationCircleOutline} /> <span> &nbsp; </span>
                        <IonLabel>Privacy and About</IonLabel>
                    </IonItem>
                </IonContent>

            </IonPage>
        </div>
    );
};

export default SettingsPage;