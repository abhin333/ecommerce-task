const ErrorMessage = ({ message }) => {
    return (
        <h2 style={{ color: "red", textAlign: "center" }}>
            {message}
        </h2>
    );
};

export default ErrorMessage;