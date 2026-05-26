import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom"; // [web:43]

// ==================== SHARED COMPONENTS (create later) ====================
import Header from "../components/Header";
import Footer from "../components/Footer";
import AdminSidebar from "../components/AdminSidebar";

// ==================== AUTH PAGES (match /api/auth/*) ====================
// /api/auth/register, /api/auth/login, /api/auth/verify-email, /api/auth/resend-otp,
// /api/auth/forgot-password, /api/auth/reset-password/:token, /api/auth/admin-login [file:6]
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import VerifyEmail from "../pages/auth/VerifyEmail";
import ResendOtp from "../pages/auth/ResendOtp";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import SetPassword from "../pages/auth/SetPassword";

// // ==================== BLOG PAGES (match /api/blogs/*) ====================
// // GET /api/blogs, GET /api/blogs/popular, GET /api/blogs/:id [file:9]
import Home from "../pages/blog/Home";
import PopularBlogs from "../pages/blog/PopularBlogs";
import BlogDetail from "../pages/blog/BlogDetail";
import About from "../pages/static/About";
import Contact from "../pages/static/Contact";
import PrivacyPolicy from "../pages/static/PrivacyPolicy";
import TermsOfService from "../pages/static/TermsOfService";

// // Protected blog actions (POST/PUT/DELETE + like/dislike/bookmark/report + /me/blogs + /me/bookmarks) [file:9]
import CreateBlog from "../pages/blog/CreateBlog";
import EditBlog from "../pages/blog/EditBlog";
import MyBlogs from "../pages/blog/MyBlogs";
import MyBookmarkedBlogs from "../pages/blog/MyBookmarkedBlogs";

//*****###*******
// */ Already implemented in BlogDetail.jsx so no need to reuse this
//*****###*******

// // ==================== COMMENT PAGES (match /api/comments/*) ====================
// // You may also keep comments inside BlogDetail, but these pages help you test quickly. [file:7]
// import BlogComments from "./pages/comments/BlogComments"; // GET /api/comments/:blogId [file:7]
// import EditComment from "./pages/comments/EditComment"; // PUT /api/comments/:id [file:7]

// ==================== USER PAGES (match /api/users/*) ====================
// /api/users/me (GET/PUT/DELETE), /api/users/:id, /api/users/:id/blogs, /api/users/me/bookmarks [file:10]
import MyAccount from "../pages/user/MyAccount";
import EditAccount from "../pages/user/EditAccount";
import DeleteAccount from "../pages/user/DeleteAccount";
import PublicUser from "../pages/user/PublicUser";
import UserBlogs from "../pages/user/UserBlogs";
import MyBookmarksViaUsers from "../pages/user/MyBookmarksViaUsers";

// // ==================== PROFILE PAGES (match /api/profile/*) ====================
// // /api/profile/me (GET/PUT), /api/profile/me/followers, /api/profile/me/following,
// // /api/profile/:userId, /api/profile/:userId/followers, /api/profile/:userId/following,
// // PUT /api/profile/:userId/follow [file:8]
import MyProfile from "../pages/profile/MyProfile";
import EditProfile from "../pages/profile/EditProfile";
import MyFollowers from "../pages/profile/MyFollowers";
import MyFollowing from "../pages/profile/MyFollowing";
import PublicProfile from "../pages/profile/PublicProfile";
import ProfileFollowers from "../pages/profile/ProfileFollowers";
import ProfileFollowing from "../pages/profile/ProfileFollowing";

// // ==================== UPLOAD PAGES (match /api/upload/*) ====================
// // POST /api/upload (multipart: file) [file:21]
// import UploadTest from "./pages/upload/UploadTest";

// // ==================== ADMIN PAGES (match /api/admin/*) ====================
// // /api/admin/* protected by protectAdmin; frontend should use adminToken [file:11]
import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminUserDetails from "../pages/admin/AdminUserDetails";
import AdminBlogs from "../pages/admin/AdminBlogs";
import AdminComments from "../pages/admin/AdminComments";
import AdminReports from "../pages/admin/AdminReports";
import AdminLogs from "../pages/admin/AdminLogs";

// // ==================== ERROR ====================
import Error404 from "../pages/Error404";

// ==================== TOKEN HELPERS ====================
// user JWT for protectUser routes [file:9][file:8][file:10][file:21]
const getUserToken = () => localStorage.getItem("token");
// admin JWT for protectAdmin routes [file:11]
const getAdminToken = () => localStorage.getItem("adminToken");

// ==================== ROUTE GUARDS ====================
function ProtectedUserRoute({ children }) {
  const token = getUserToken();
  return token ? children : <Navigate to="/auth/login" replace />; // [web:43]
}

function ProtectedAdminRoute({ children }) {
  const token = getAdminToken();
  return token ? children : <Navigate to="/admin/login" replace />; // [web:43]
}

// ==================== LAYOUTS ====================
function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function AuthLayout() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50">
      <main className="w-full max-w-md px-4 py-10">
        <Outlet />
      </main>
    </div>
  );
}

function AdminLayout() {
  return (
    <div className="flex h-screen bg-slate-100">
      <AdminSidebar />
      <main className="flex-grow overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

// ==================== MAIN ROUTER ====================
export default function Layout() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ==================== AUTH (USER) ==================== */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* OTP flows exist in your backend [file:6] */}
          <Route path="verify-email" element={<VerifyEmail />} />
          <Route path="resend-otp" element={<ResendOtp />} />

          {/* password reset flows [file:6] */}
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />

          <Route
            path="set-password"
            element={
              <ProtectedUserRoute>
                <SetPassword />
              </ProtectedUserRoute>
            }
          />
        </Route>

        {/* Convenience redirects */}
        <Route path="/login" element={<Navigate to="/auth/login" replace />} />
        <Route
          path="/register"
          element={<Navigate to="/auth/register" replace />}
        />

        {/* ==================== PUBLIC + USER AREA ==================== */}
        <Route path="/" element={<PublicLayout />}>
          {/* Blog public reads [file:9] */}
          <Route index element={<Home />} />
          <Route path="popular" element={<PopularBlogs />} />
          <Route path="blog/:id" element={<BlogDetail />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-of-service" element={<TermsOfService />} />

          {/* Comments public read (optional debug route) [file:7] */}
          {/* <Route path="blog/:blogId/comments" element={<BlogComments />} /> */}

          {/* Public user/profile reads [file:10][file:8] */}
          <Route path="user/:id" element={<PublicUser />} />
          <Route path="user/:id/blogs" element={<UserBlogs />} />
          <Route path="profile/:userId" element={<PublicProfile />} />
          <Route
            path="profile/:userId/followers"
            element={<ProfileFollowers />}
          />
          <Route
            path="profile/:userId/following"
            element={<ProfileFollowing />}
          />

          {/* ==================== USER PROTECTED (protectUser) ==================== */}
          {/* Blog protected actions [file:9] */}
          <Route
            path="editor/new"
            element={
              <ProtectedUserRoute>
                <CreateBlog />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="editor/:id"
            element={
              <ProtectedUserRoute>
                <EditBlog />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="me/blogs"
            element={
              <ProtectedUserRoute>
                <MyBlogs />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="me/bookmarked-blogs"
            element={
              <ProtectedUserRoute>
                <MyBookmarkedBlogs />
              </ProtectedUserRoute>
            }
          />

          {/* Users "me" endpoints [file:10] */}
          <Route
            path="me/account"
            element={
              <ProtectedUserRoute>
                <MyAccount />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="me/account/edit"
            element={
              <ProtectedUserRoute>
                <EditAccount />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="me/account/delete"
            element={
              <ProtectedUserRoute>
                <DeleteAccount />
              </ProtectedUserRoute>
            }
          />
          {/* <Route
            path="me/bookmarks"
            element={
              <ProtectedUserRoute>
                <MyBookmarksViaUsers />
              </ProtectedUserRoute>
            }
          /> */}

          {/* Profile "me" endpoints + follow graph [file:8] */}
          <Route
            path="me/profile"
            element={
              <ProtectedUserRoute>
                <MyProfile />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="me/profile/edit"
            element={
              <ProtectedUserRoute>
                <EditProfile />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="me/profile/followers"
            element={
              <ProtectedUserRoute>
                <MyFollowers />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="me/profile/following"
            element={
              <ProtectedUserRoute>
                <MyFollowing />
              </ProtectedUserRoute>
            }
          />

          {/* Comment protected edit (optional debug route) [file:7] */}
          {/* <Route
            path="comment/:id/edit"
            element={
              <ProtectedUserRoute>
                <EditComment />
              </ProtectedUserRoute>
            }
          />
 */}
          {/* Upload endpoint exists (protected) [file:21] */}
          {/* <Route
            path="upload"
            element={
              <ProtectedUserRoute>
                <UploadTest />
              </ProtectedUserRoute>
            }
          /> */}

          {/* <Route path="*" element={<Error404 />} /> */}
        </Route>

        {/* ==================== ADMIN AREA ==================== */}
        {/* Admin login hits POST /api/auth/admin-login [file:6] */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* All /api/admin/* is protected by protectAdmin [file:11] */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />

          {/* Admin routes coverage [file:11] */}
           <Route path="users" element={<AdminUsers />} />
          <Route path="users/:id" element={<AdminUserDetails />} />
          <Route path="blogs" element={<AdminBlogs />} />
          <Route path="comments" element={<AdminComments />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="logs" element={<AdminLogs />} />

          <Route path="*" element={<Error404 />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
