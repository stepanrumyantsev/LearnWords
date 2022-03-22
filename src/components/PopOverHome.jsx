import React, { useContext } from "react";
import { makeid } from "../generateId";
import {
    IonButton,
    IonIcon,
    IonItem,
    IonList,
    useIonPopover,
} from "@ionic/react";
import { ellipsisVertical, ellipsisHorizontal } from "ionicons/icons";
import { UpdateWordsContext } from "../UpdateWordsContext";

const PopoverListSettings = ({ onClearAll, onUncheckAll }) => (
    <IonList>
        <IonItem button onClick={onClearAll}>
            Clear All
        </IonItem>

        <IonItem button routerLink={"/settings/"} >
            Settings
        </IonItem>


    </IonList>
);

export const PopOverHome = () => {
    const { setUpdateWords } = useContext(UpdateWordsContext);
    const [present, dismiss] = useIonPopover(PopoverListSettings, {
        onClearAll: () => {
            localStorage.removeItem("dictionary");
            setUpdateWords(makeid(10));
            dismiss();
        },

    });

    return (
        <IonButton
            fill="clear"
            slot="end"
            onClick={(e) =>
                present({
                    event: e.nativeEvent,
                })
            }
        >
            <IonIcon
                slot="icon-only"
                ios={ellipsisHorizontal}
                md={ellipsisVertical}
                color={"white"}
            ></IonIcon>
        </IonButton>
    );
};