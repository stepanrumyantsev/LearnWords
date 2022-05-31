import React, { useContext } from "react";
import { handleDelete, langToFlag, countChildren } from "../mainfunctions";


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
} from "ionicons/icons";
import { makeid } from "../generateId";
import { UpdateWordsContext } from "../UpdateWordsContext";

const MainWordsList = (props) => {

    const { setUpdateWords } = useContext(UpdateWordsContext);

    if (!localStorage.getItem("dictionary") || localStorage.getItem("dictionary") === "[]") {
        return <ExploreContainer text={"Start adding Items or Groups of Items"} />;
    }

    if (localStorage.getItem("dictionary") && props.items.length === 0) {
        return <ExploreContainer text={"Nothing found"} />;

    }



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
                        {...(item.type === "item" && { routerLink: `/item/${item.id}`, button: true })}
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