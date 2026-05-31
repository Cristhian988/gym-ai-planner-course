import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user, isLoading } = useAuth();

  if (user && !isLoading) {
    return <Navigate to="/profile" replace />;
  }
  return (
    <div>
      <h1 className="text-3xl font-bold">Home</h1>
    </div>
  );
}
