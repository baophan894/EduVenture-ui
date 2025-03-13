import { Route, Routes } from "react-router-dom";
import MainLayout from "../pages";
import CourseDetail from "../pages/CourseDetail";
import SignInScreen from "../pages/SignIn";
import SignUpScreen from "../pages/Signup";
import ChangePassword from "../pages/changePassword";
import CourseScreen from "../pages/courses";
import Dashboard from "../pages/dashboard";
import Document from "../pages/documents";
import DocumentDetail from "../pages/documents/subScreens/documentDetail";
import ExpertDashboard from "../pages/expert";
import FlashcardScreen from "../pages/flashcard";
import FlashCardDetailScreen from "../pages/flashcard/subScreen/flashcardetail";
import ForgotpasswordScreen from "../pages/forgot-password";
import HomePage from "../pages/home";
import Profile from "../pages/newProfile";
import CourseBought from "../pages/newProfile/components/myLearning/CourseBought";
import PaymentResult from "../pages/paymentResult";
import PostScreen from "../pages/posts";
import PostDetail from "../pages/posts/components/postDetail";
import TestDetailScreen from "../pages/testDetail";
import TestLibraryScreen from "../pages/testLibrary";
import UpdatePassword from "../pages/updatePassword";
import VerifyNotification from "../pages/verify";
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
        <Route path="/test-library" element={<TestLibraryScreen />}></Route>
        <Route
          path="/test-library/detail/:testId"
          element={<TestDetailScreen />}
        ></Route>

        <Route path="/forum" element={<PostScreen />}></Route>
      </Route>
    </Routes>
  );
};
export default RouterManagement;
