import { Link } from "react-router-dom";
import withDefaultEvent from "./withDefaultEvent";
import profileSampleImg from "../../assets/images/bgmCover01.png";

function DefaultLayout({ children, profileMenu, layoutRef, profileRef }){
    return(
    <div className="flex flex-col items-center w-full min-h-screen text-black font-noto-light" ref={layoutRef}>
        <header className="flex items-center justify-center w-full bg-red-400 border-b h-14">
            <div className="flex items-center justify-between w-full px-5 max-w-1400">
                <Link to="/">
                    <i className="text-2xl text-white fas fa-home"></i>
                </Link>
                <div className="relative w-10 h-10">
                    <div className="absolute top-0 right-0 flex flex-col items-end">
                        <div className="flex items-center justify-center w-10 h-10 overflow-hidden border rounded-full cursor-pointer"
                            ref={profileRef}
                        >
                            <img src={profileSampleImg} alt="img" className="w-full h-full"/>
                        </div>
                        {
                            profileMenu &&
                            <ul className="bottom-0 right-0 w-32 bg-white border roudend-sm"> 
                                <li className="p-2 border-b">
                                    <Link to="/users/edit" className="flex items-center justify-start">
                                        <i className="fas fa-cog"></i>
                                        <span className="ml-2">설정</span>
                                    </Link>
                                </li>
                                <li className="p-2">
                                    <Link to="/login" className="flex items-center justify-start">
                                        <i className="text-lx fas fa-sign-out-alt"></i>
                                        <span className="ml-2">로그아웃</span>
                                    </Link>
                                </li>
                            </ul>
                        }
                    </div>
                </div>
            </div>
        </header>
        <section className="flex flex-col items-center w-full max-w-1200">
            { children }
        </section>
    </div>
    )
}
export default withDefaultEvent(DefaultLayout);