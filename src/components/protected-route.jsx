import { useUser } from "@clerk/clerk-react"
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const { isSignedIn, user, isLoaded } = useUser();
    const {pathname} = useLocation()
    if (isLoaded && !isSignedIn && isSignedIn !== undefined) {
        return <Navigate to="/?sign-in=true" />;
    }

    if (user !== undefined && !user?.unsafeMetadata?.role && pathname !== "/onboarding") {
      return <Navigate to="/onboarding" />;
    }

    // if (user?.unsafeMetadata?.role === "candidate" && pathname === "/post-job") {
    //   return <Navigate to="/jobs" />;
    // } else {
    //   <Navigate to="/post-job" />;
    // }

  return children;
}

export default ProtectedRoute