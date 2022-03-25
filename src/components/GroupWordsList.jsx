import React, { useContext } from "react";
import {
    IonList,
    IonItem,
    IonLabel,
    IonThumbnail,
    IonIcon,
    IonItemSliding,
    IonItemOption,
    IonItemOptions,
    isPlatform
} from "@ionic/react";
import priceTag from "../res/pricetag-outline.svg";
import priceTags from "../res/pricetags-outline.svg";
import "./GroupWordsList.css";
import ExploreContainer from "./ExploreContainer";
import {
    trash as trashIcon,
    checkmarkOutline as checkmarkIcon,
    arrowUndoOutline as undoIcon,
} from "ionicons/icons";
import { makeid } from "../generateId";
import { UpdateWordsContext } from "../UpdateWordsContext";

const GroupWordsList = (props) => {
    const { UpdateWords, setUpdateWords } = useContext(UpdateWordsContext);
    if (!localStorage.getItem("dictionary")) {
        return <ExploreContainer />;
    }

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
    };

    const handleCheck = (id, Location) => {
        const items = JSON.parse(localStorage.getItem(Location) || "{}");
        if (items.length) {
            items.forEach(function (index, value) {
                if (items[value].id.includes(id)) {
                    if (items[value].checked === "true") {
                        items[value].checked = "false";
                        localStorage.setItem(Location, JSON.stringify(items));
                    } else {
                        items[value].checked = "true";
                        localStorage.setItem(Location, JSON.stringify(items));
                    }
                }
            });
        }
    };

    return (
        <IonList>
            {props.items.map((item) => (
                <IonItemSliding key={item.id}>
                    <IonItemOptions side="start">
                        <IonItemOption
                            color="danger"
                            onClick={() => {

                                handleDelete(item.id, "itemsHistory");
                                setUpdateWords(makeid(16));

                            }}
                        >
                            {" "}
                            <IonIcon icon={trashIcon} slot="icon-only" />
                        </IonItemOption>
                    </IonItemOptions>
                    <IonItemOptions side="end">
                        <IonItemOption
                            color={item.checked === "true" ? "warning" : "success"}
                            onClick={() => {
                                handleCheck(item.id, "dictionary");
                                setUpdateWords(makeid(16));
                            }}
                        >
                            <IonIcon
                                icon={item.checked === "true" ? undoIcon : checkmarkIcon}
                                slot="icon-only"
                            />
                        </IonItemOption>
                    </IonItemOptions>
                    <IonItem
                        lines={"none"}
                        {...(item.type === "group" ? { routerLink: `/group/${item.id}` } : { routerLink: `/item/${item.id}` })}
                        {...((item.type === "item" && isPlatform("ios")) ? { button: false } : { button: true })}
                    >
                        <IonThumbnail slot="start" className={"thumbnail"}>
                            <IonIcon size={"large"} icon={item.type === "group" ? priceTags : priceTag} />
                        </IonThumbnail>
                        <IonLabel>
                            <h2>
                                {item.type === "group" ? item.input : item.input + " " + item.inputLanguage + " => " + item.output + " " + item.outputLanguage}
                            </h2>




                        </IonLabel>
                    </IonItem>
                </IonItemSliding>
            ))}
        </IonList>
    );
};

export default GroupWordsList;