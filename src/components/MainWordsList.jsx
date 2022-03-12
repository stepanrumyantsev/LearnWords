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
import "./MainWordsList.css";
import ExploreContainer from "./ExploreContainer";
import {
    trash as trashIcon,
    checkmarkOutline as checkmarkIcon,
    arrowUndoOutline as undoIcon,
} from "ionicons/icons";
import { makeid } from "../generateId";
import { UpdateWordsContext } from "../UpdateWordsContext";
import { findByLabelText } from "@testing-library/react";

const MainWordsList = (props) => {
    const { UpdateWords, setUpdateWords } = useContext(UpdateWordsContext);

    if (!localStorage.getItem("dictionary") || localStorage.getItem("dictionary") === "[]") {
        return <ExploreContainer />;
    }




    const handleDelete = (id, Location) => {
        const items = JSON.parse(localStorage.getItem(Location) || "{}");
        if (items.length) {
            items.forEach(function (index, value) {
                if (items[value].id.includes(id) || items[value].parent.includes(id)) {
                    items.splice(value, 1);
                    localStorage.setItem(Location, JSON.stringify(items));
                }
            });
        }
    };

    const countChildren = (id) => {
        let counter = 0;
        const items = JSON.parse(localStorage.getItem("dictionary") || "{}");

        if (items.length) {
            items.forEach(function (index, value) {
                if (items[value].parent.includes(id)) {
                    counter = counter + 1;

                }
            });
            return counter;

        }
    }

    const areAllChildrenChecked = (id) => {
        let allChecked = true;
        let counter = 0;
        const items = JSON.parse(localStorage.getItem("dictionary") || "{}");

        if (items.length) {
            items.forEach(function (index, value) {
                if (items[value].parent.includes(id)) {
                    counter = counter + 1;


                    if (items[value].checked === "false") {
                        allChecked = false;
                    }
                }


            });
            if (counter === 0) allChecked = false;
            return allChecked;


        }



    }

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

                                handleDelete(item.id, "dictionary");
                                setUpdateWords(makeid(16));

                            }}
                        >
                            {" "}
                            <IonIcon icon={trashIcon} slot="icon-only" />
                        </IonItemOption>
                    </IonItemOptions>
                    <IonItem

                        lines={"none"}

                        {...(item.type === "group" ? { routerLink: `/group/${item.id}`, button: true } : { routerLink: `/item/${item.id}` })}
                        {...((item.type === "item" && isPlatform("ios")) ? { button: false } : { button: true })}


                    >
                        <IonThumbnail slot="start" className={"thumbnail"}>
                            <IonIcon size={"large"} icon={item.type === "group" ? priceTags : priceTag} />
                        </IonThumbnail>
                        <IonLabel>
                            <h2>
                                {item.input}
                            </h2>

                            <p>{item.type === "group" ? "items: " + countChildren(item.id) : item.input + " " + item.inputLanguage}</p>
                        </IonLabel>
                    </IonItem>
                </IonItemSliding>
            ))}
        </IonList>
    );
};

export default MainWordsList;