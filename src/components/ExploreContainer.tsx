import './ExploreContainer.css';
import { IonIcon } from '@ionic/react';
import { addOutline } from "ionicons/icons";

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {
    return (
        <div className="container">
            <strong>Start adding Items or Groups of Items</strong>
        </div>
    );
};

export default ExploreContainer;