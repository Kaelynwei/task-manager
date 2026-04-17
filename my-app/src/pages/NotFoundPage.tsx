import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <div>
            <h1>404 Page Not Found</h1>
            <p>The page you are looking for doesn't exist</p>
            <Link to="/" style={{ color: '#007bff '}}> Go back to Home</Link>
        </div>
    );
}
export default NotFoundPage;