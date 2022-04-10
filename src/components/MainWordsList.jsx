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

const MainWordsList = (props) => {

    const { UpdateWords, setUpdateWords } = useContext(UpdateWordsContext);

    if (!localStorage.getItem("dictionary") || localStorage.getItem("dictionary") === "[]") {
        return <ExploreContainer text={"Start adding Items or Groups of Items"} />;
    }

    if (localStorage.getItem("dictionary") && props.items.length === 0) {
        return <ExploreContainer text={"Nothing found"} />;

    }




    const handleDelete = (id, Location) => {
        const items = JSON.parse(localStorage.getItem(Location) || "{}");
        if (items.length) {
            const result = items.filter(item => !(item.id.includes(id) || item.parent.includes(id)));
            localStorage.setItem(Location, JSON.stringify(result));
        }
    };

    const langToFlag = (lang) => {
        let flag = "";
        switch (lang) {
            case "EN":
                return <span> &#127468; &#127463; </span>;

            case "DE":
                return <span>&#127465; &#127466; </span>;

            case "RU":
                return <span> &#127479; &#127482; </span>;

            case "ES":
                return <span>&#127466; &#127480;</span>;



            default:
                return "";
        }




    }

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

                        {...(item.type === "group" && { routerLink: `/group/${item.id}`, button: true })}
                        {...((item.type === "item" && isPlatform("ios")) ? { button: false } : { button: true })}


                    >
                        <IonThumbnail slot="start" className={"thumbnail"}>
                            <IonIcon size={"large"} icon={item.type === "group" ? priceTags : priceTag} />
                        </IonThumbnail>
                        {item.type === "group" && <IonLabel>
                            <h2>
                                {item.input}

                            </h2>

                            <p>{"items: " + countChildren(item.id)}</p>
                        </IonLabel>}

                        {item.type === "item" &&
                            <IonLabel>
                                <h2>
                                    {langToFlag(item.inputLanguage)}
                                    {item.input}
                                    {" => "}
                                    {langToFlag(item.outputLanguage)}
                                    {item.output}
                                </h2>


                            </IonLabel>
                        }
                    </IonItem>
                </IonItemSliding>
            ))}
        </IonList>
    );
};

export default MainWordsList;