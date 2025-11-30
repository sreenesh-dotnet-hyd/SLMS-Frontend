import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import HomeNav from "./HomeNav";
import Second from "./Second";

export default function Home(){
    const navigate = useNavigate();
    const NavigateToSignIn = ()=>{
        navigate('signin');
    }
    return(<div className="home-container">
           <HomeNav/>
        <div className="hero-container">
        <span className="hero-text">
            Smarter Software License Management
        </span>
        <span className="sub-hero-text">
            Don’t leave your operations to chance. 
           Master your software ecosystem with tracking, unified dashboards, and insights.
        </span>

        <div className="hero-btns">
            <button>Explore the product</button>
            <button onClick={()=>NavigateToSignIn()}>Sign In</button>
        </div>
        </div>

        <Second/>
        <Footer/>
    </div>)
}