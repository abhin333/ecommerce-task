import "../styles/Loader.css";
const Loader = () => {
    return (
        <div className="loader-container">
            <div className="loader-spinner"></div>
            <p className="loader-text">Loading premium content...</p>
        </div>
    );
};

export default Loader;