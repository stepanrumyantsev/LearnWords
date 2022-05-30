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
} from "@ionic/react";
import { saveOutline, trashOutline } from "ionicons/icons";
import { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { UpdateWordsContext } from "../UpdateWordsContext";
import { makeid } from "../generateId";


const AddWordPage = () => {


    const translate = require("deepl");

    const history = useHistory();
    const { id } = useParams();
    const [item, setItem] = useState({
        title: "",
    });
    const [isAddWord, setIsAddWord] = useState((id === "20"));
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [inputLanguage, setInputLanguage] = useState(localStorage.getItem("inputLang") ? localStorage.getItem("inputLang") : "DE");
    const [outputLanguage, setOutputLanguage] = useState(localStorage.getItem("outputLang") ? localStorage.getItem("outputLang") : "EN");
    const { setUpdateWords } = useContext(UpdateWordsContext);
    const [group, setGroup] = useState(id);
    const items = JSON.parse(localStorage.getItem("dictionary") || "{}");


    useEffect(() => {
        const timer = setTimeout(() => {

            translate({
                free_api: true,
                text: input,
                source_lang: inputLanguage,
                target_lang: outputLanguage,
                auth_key: '9eb0ef9f-e4b3-7de8-bacf-e5c527362378:fx',
                // All optional parameters available in the official documentation can be defined here as well.
            })
                .then(result => {

                    setOutput(result.data.translations[0].text);
                })
                .catch(error => {
                    console.error(error)
                });
        }, 1000);
        return () => {
            clearTimeout(timer);
        };
    }, [input, inputLanguage, outputLanguage]
    );

    const handleEdit = (id, Location) => {
        const items = JSON.parse(localStorage.getItem(Location) || "{}");
        if (items.length) {
            items.forEach(function (index, value) {
                if (items[value].id.includes(id)) {
                    items[value].input = input;
                    items[value].output = output;
                    items[value].inputLanguage = inputLanguage;
                    items[value].outputLanguage = outputLanguage;
                    items[value].parent = group;


                    localStorage.setItem(Location, JSON.stringify(items));
                }
            });
        }
    };

    useEffect(() => {
        handleEdit(item.id, "dictionary");
        setUpdateWords(makeid(16));


    }, [input, output, inputLanguage, outputLanguage, group]);

    const handleSave = (id, Location) => {
        const entryData = {
            id: makeid(16),
            type: "item",
            parent: group,
            input: input,
            output: output,
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

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem("dictionary") || "{}");

        if (items.length) {
            items.forEach(function (index, value) {
                if (items[value].id.includes(id)) {

                    setItem(items[value]);
                    setInput(items[value].input);
                    setOutput(items[value].output);
                    setInputLanguage(items[value].inputLanguage);
                    setOutputLanguage(items[value].outputLanguage);
                    setGroup(items[value].parent);

                }

                else if (items[value].id.includes(id) && items[value].type === "group") {
                    setIsAddWord(true);
                }
            });
        }
    }, [id]);


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
                        <IonSelect value={inputLanguage} placeholder="Select One" onIonChange={e => { setInputLanguage(e.detail.value); localStorage.setItem("inputLang", e.detail.value) }}>
                            <IonSelectOption value="DE">&#127465; &#127466; DE</IonSelectOption>
                            <IonSelectOption value="EN">&#127468; &#127463; EN</IonSelectOption>
                            <IonSelectOption value="ES">&#127466; &#127480; ES</IonSelectOption>
                            <IonSelectOption value="RU">&#127479; &#127482; RU</IonSelectOption>
                            <IonSelectOption value="FR">&#127467; &#127479; FR</IonSelectOption>
                        </IonSelect>
                        <IonInput
                            placeholder={"Type word or sentence"}
                            value={input || ""} className={"ion-text-right"}
                            onIonChange={(event) => setInput(event.detail.value)}
                        />
                    </IonItem>

                    <IonItem>
                        <IonLabel position="fixed">Translation: </IonLabel>
                        <IonSelect value={outputLanguage} placeholder="Select One" onIonChange={e => { setOutputLanguage(e.detail.value); localStorage.setItem("outputLang", e.detail.value) }}>
                            <IonSelectOption value="DE">&#127465; &#127466; DE</IonSelectOption>
                            <IonSelectOption value="EN">&#127468; &#127463; EN</IonSelectOption>
                            <IonSelectOption value="ES">&#127466; &#127480; ES</IonSelectOption>
                            <IonSelectOption value="RU">&#127479; &#127482; RU</IonSelectOption>
                            <IonSelectOption value="FR">&#127467; &#127479; FR</IonSelectOption>
                        </IonSelect>
                        <IonInput
                            placeholder={"Translation"}
                            value={output || ""} className={"ion-text-right"}
                            onIonChange={(event) => setOutput(event.detail.value)}
                        />
                    </IonItem>


                    <IonItem>
                        <IonLabel>Group</IonLabel>

                        <IonSelect value={group} placeholder="Select One" onIonChange={e => setGroup(e.detail.value)}>
                            {items.map && items.map((item) => {
                                if (item.type === "group")
                                    return <IonSelectOption key={item.id} value={item.id}>{item.input}</IonSelectOption>
                            }


                            )};


                        </IonSelect>
                    </IonItem>




                </IonContent>

                {isAddWord && <IonButton style={{ marginBottom: '20px' }}
                    onClick={() => {
                        handleSave(id, "dictionary");
                        setUpdateWords(makeid(16));
                    }}
                >
                    <IonIcon icon={saveOutline} />
                    &nbsp;Save
                </IonButton>}
            </IonPage>
        </div>
    );
};

export default AddWordPage;