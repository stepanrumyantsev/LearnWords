import './ExploreContainer.css';


const ExploreContainer = (props) => {
    return (
        <div className="container">
            <strong>{props.text}</strong>
        </div>
    );
};

export default ExploreContainer;