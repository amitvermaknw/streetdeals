import { useLocation, useNavigate } from 'react-router-dom';

function UserAuthGuard({ children }: { children: React.ReactNode }) {
    const location = useLocation();
    const navigate = useNavigate();

    // Assume you have an `isAuthenticated` variable that checks if the user is logged in
    if (!isAuthenticated) {
        // Store the current location in the state or a query parameter
        const currentPath = location.pathname + location.search;
        navigate(`/login?redirect=${encodeURIComponent(currentPath)}`);
        return null; // Prevent rendering the protected page
    }

    return <>{children}</>;
}