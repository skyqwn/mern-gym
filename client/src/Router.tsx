import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Auth from "./routes/Auth";
import ProtectRoute from "./components/ProtectRoute";
import Community from "./routes/Community";
import CommunityDetail from "./routes/CommunityDetail";
import Gallery from "./routes/Gallery";
import GalleryDetail from "./routes/GalleryDetail";
import Profile from "./routes/Profile";

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectRoute>
            <Home />
          </ProtectRoute>
        }
      />
      <Route path="/auth" element={<Auth />} />
      <Route path="/community" element={<Community />} />
      <Route path="/community/:id" element={<CommunityDetail />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route
        path="/gallery/:id"
        element={
          <ProtectRoute>
            <GalleryDetail />
          </ProtectRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectRoute>
            <Profile />
          </ProtectRoute>
        }
      />
    </Routes>
  );
};

export default Router;
