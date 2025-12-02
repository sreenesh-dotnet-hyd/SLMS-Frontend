import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import HomeNav from "./HomeNav";
import Second from "./Second";
import Dashboards from "./Dashboards";

export default function Home(){
    const navigate = useNavigate();
    const NavigateToSignIn = ()=>{
        navigate('signin');
    }

    const NavigateToProduct = ()=>{
        navigate('/app/devices');

    }
    return(<div className="home-container">
           <HomeNav/>
        <div className="hero-container">
        <span className="hero-text">
            Smarter Software License Management
        </span>
        <span className="sub-hero-text">
            don’t leave your operations to chance. 
           Master your software ecosystem with tracking, unified dashboards, and insights.
        </span>

        <div className="hero-btns">
            <button onClick={()=>NavigateToProduct()}>Explore the product</button>
            <button onClick={()=>NavigateToSignIn()}>Sign In</button>
        </div>
        </div>
   <Dashboards/>
        <Second/>
     
        <Footer/>
    </div>)
}