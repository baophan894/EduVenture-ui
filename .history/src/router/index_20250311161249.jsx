import { Route, Routes } from "react-router-dom";
import MainLayout from "../pages";
import HomePage from "../pages/home";
import SignUpScreen from "../pages/Signup";
import VerifyNotification from "../pages/verify";
import SignInScreen from "../pages/SignIn";
import ForgotpasswordScreen from "../pages/forgot-password";
import ChangePassword from "../pages/changePassword";
import UpdatePassword from "../pages/updatePassword";
import Dashboard from "../pages/dashboard";
import ExpertDashboard from "../pages/expert";
import CourseScreen from "../pages/courses";
import CourseDetail from "../pages/CourseDetail";
import PaymentResult from "../pages/paymentResult";
import Profile from "../pages/newProfile";
import CourseBought from "../pages/newProfile/components/myLearning/CourseBought";
import Document from "../pages/documents";
import DocumentDetail from "../pages/documents/subScreens/documentDetail";
import FlashcardScreen from "../pages/flashcard";
import FlashCardDetailScreen from "../pages/flashcard/subScreen/flashcardetail";
import PostScreen from "../pages/posts";
import PostDetail from "../pages/posts/components/postDetail";
const RouterManagement = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<HomePage />}></Route>
        <Route path="/register" element={<SignUpScreen />}></Route>
        <Route path="/login" element={<SignInScreen />}></Route>
        <Route path="/verify" element={<VerifyNotification />}></Route>
        <Route
          path="/forgot-password"
          element={<ForgotpasswordScreen />}
        ></Route>
        <Route path="/change-password" element={<ChangePassword />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/update-password" element={<UpdatePassword />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/expert" element={<ExpertDashboard />}></Route>
        <Route path="/courses" element={<CourseScreen />}></Route>
        <Route path="/documents" element={<Document />}></Route>
        <Route path="/course/detail/:id" element={<CourseDetail />}></Route>
        <Route path="/learn/:id" element={<CourseBought />}></Route>
        <Route path="/payment/result" element={<PaymentResult />}></Route>
        <Route path="/document/detail/:id" element={<DocumentDetail />}></Route>
        <Route path="/post/detail/:id" element={<PostDetail />}></Route>
        <Route path="/flashcards" element={<FlashcardScreen />}></Route>
        <Route
          path="/flashcard/detail/:id"
          element={<FlashCardDetailScreen />}
        ></Route>
        <Route path="/forum" element={<PostScreen />}></Route>
      </Route>
    </Routes>
  );
};
export default RouterManagement;
