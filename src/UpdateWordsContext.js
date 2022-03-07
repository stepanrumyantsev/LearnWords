import React from "react";
import { makeid } from "./generateId";

export const UpdateWordsContext = React.createContext({
    UpdateWords: "",
    setUpdateWords: (id) => {
        makeid(16);
    },
});