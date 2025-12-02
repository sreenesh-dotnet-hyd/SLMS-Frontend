import { useNavigate } from 'react-router-dom';
import './Landing.css'

export default function HomeNav() {
    const navigate = useNavigate();
     const NavigateToSignIn = ()=>{
        navigate('signin');
    }

    return (<div className="home-nav-container">
        <div className="sub-1">
            <div className="logo">
                icense
            </div>
            <div className="features">
                <span>
                    features
                </span>
                <span>
                    company
                </span>
                <span>
                    resources
                </span>
                <span>
                    pricing
                </span>
            </div>
        </div>
        <div className="sub-2">
            <button className='btn'>Contact Us</button>
            <button className='btn' onClick={()=>NavigateToSignIn()}>Sign In</button>
        </div>


    </div>)
}