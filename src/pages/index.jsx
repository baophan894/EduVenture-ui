import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
const MainLayout = () => {
  return (
    <div >
      <Header />
      <div className="pt-[60px]" >
      <Outlet />
      </div>
      <Footer />
    </div>
  );
};
export default MainLayout;
