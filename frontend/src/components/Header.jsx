import { useAuth } from "../contexts/AuthContext";
import { Link, Outlet } from "react-router-dom";

export default function Header() {
  const { logout, user } = useAuth();

  return (
    <>
      <nav className="nav-bar">
        <div style={{ display: "flex", flexGrow: 1, columnGap: "20px" }}>
          <Link
            to="/"
            style={{ fontSize: "20px", color: "#000", textDecoration: "none" }}
          >
            Home Page
          </Link>
          {user?.roles.includes("Admin") && (
            <Link
              to="/admin/user"
              style={{
                fontSize: "20px",
                color: "#000",
                textDecoration: "none",
              }}
            >
              Manage User
            </Link>
          )}
        </div>
        <button onClick={async () => await logout()}>Logout</button>
      </nav>
      <Outlet />
    </>
  );
}
