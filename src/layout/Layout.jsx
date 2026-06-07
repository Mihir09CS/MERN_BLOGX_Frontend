import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import AdminSidebar from "../components/AdminSidebar";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import VerifyEmail from "../pages/auth/VerifyEmail";
import ResendOtp from "../pages/auth/ResendOtp";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import SetPassword from "../pages/auth/SetPassword";
import GithubCallback from "../pages/auth/GithubCallback";

import Home from "../pages/blog/Home";
import PopularBlogs from "../pages/blog/PopularBlogs";
import BlogDetail from "../pages/blog/BlogDetail";
import CreateBlog from "../pages/blog/CreateBlog";
import EditBlog from "../pages/blog/EditBlog";
import MyBlogs from "../pages/blog/MyBlogs";
import MyBookmarkedBlogs from "../pages/blog/MyBookmarkedBlogs";

import About from "../pages/static/About";
import Contact from "../pages/static/Contact";
import PrivacyPolicy from "../pages/static/PrivacyPolicy";
import TermsOfService from "../pages/static/TermsOfService";

import MyAccount from "../pages/user/MyAccount";
import EditAccount from "../pages/user/EditAccount";
import DeleteAccount from "../pages/user/DeleteAccount";
import PublicUser from "../pages/user/PublicUser";
import UserBlogs from "../pages/user/UserBlogs";

import MyProfile from "../pages/profile/MyProfile";
import EditProfile from "../pages/profile/EditProfile";
import MyFollowers from "../pages/profile/MyFollowers";
import MyFollowing from "../pages/profile/MyFollowing";
import PublicProfile from "../pages/profile/PublicProfile";
import ProfileFollowers from "../pages/profile/ProfileFollowers";
import ProfileFollowing from "../pages/profile/ProfileFollowing";

import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminUserDetails from "../pages/admin/AdminUserDetails";
import AdminBlogs from "../pages/admin/AdminBlogs";
import AdminComments from "../pages/admin/AdminComments";
import AdminReports from "../pages/admin/AdminReports";
import AdminLogs from "../pages/admin/AdminLogs";

import Error404 from "../pages/Error404";

const getUserToken = () => localStorage.getItem("token");
const getAdminToken = () => localStorage.getItem("adminToken");

function ProtectedUserRoute({ children }) {
  const token = getUserToken();
  return token ? children : <Navigate to="/auth/login" replace />;
}

function ProtectedAdminRoute({ children }) {
  const token = getAdminToken();
  return token ? children : <Navigate to="/admin/login" replace />;
}

function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="w-full flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-50">
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

export default function Layout() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="github/callback" element={<GithubCallback />} />
          <Route path="verify-email" element={<VerifyEmail />} />
          <Route path="resend-otp" element={<ResendOtp />} />
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
          <Route path="*" element={<Error404 />} />
        </Route>

        <Route path="/login" element={<Navigate to="/auth/login" replace />} />
        <Route
          path="/register"
          element={<Navigate to="/auth/register" replace />}
        />

        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="popular" element={<PopularBlogs />} />
          <Route path="blog/:id" element={<BlogDetail />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-of-service" element={<TermsOfService />} />

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

          <Route path="*" element={<Error404 />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />

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
