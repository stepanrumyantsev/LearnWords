
import { IonFab, IonFabButton, IonIcon, IonFabList } from "@ionic/react";
import { pricetagOutline, pricetagsOutline, addOutline } from "ionicons/icons";
import React from "react";
import "./AddWordFab.css";

const AddWordFab: React.FC = () => {
  return (
    <>
      <IonFab slot="fixed" vertical="bottom" horizontal="end" style={{ marginBottom: '20px' }}>
        <IonFabButton>
          <IonIcon icon={addOutline} />
        </IonFabButton>
        <IonFabList side="top">
          <IonFabButton data-desc="Item" routerLink={`/additem/20`}>
            <IonIcon icon={pricetagOutline} />
          </IonFabButton>
          <IonFabButton data-desc="Group" routerLink={`/addgroup/20`}>
            <IonIcon icon={pricetagsOutline} />
          </IonFabButton>
        </IonFabList>
      </IonFab>
    </>
  );
};

export default AddWordFab;