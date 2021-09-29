import { Link } from "react-router-dom";
import withDefaultEvent from "./withDefaultEvent";
import profileSampleImg from "../../assets/images/bgmCover01.png";

function DefaultLayout({ children, profileMenu, layoutRef, profileRef, clickLogoutEvent, userInfo }){
    return(
    <div className="flex flex-col items-center w-full min-h-screen text-black font-noto-light" ref={layoutRef}>
        <header className="flex items-center justify-center w-full bg-red-400 border-b h-14">
            <div className="flex items-center justify-between w-full px-5 max-w-1400">
                <Link to="/">
                    <i className="text-2xl text-white fas fa-home"></i>
                </Link>
                <div className="relative w-10 h-10">
                    <div className="absolute top-0 right-0 flex flex-col items-end w-auto">
                        <div className="flex items-center justify-center w-10 h-10 border border-white rounded-full cursor-pointer"
                            ref={profileRef}
                        >
                            <img src={profileSampleImg} alt="img" className="w-full h-full rounded-full"/>
                        </div>
                        {
                            profileMenu &&
                            <ul className="bottom-0 right-0 z-50 overflow-hidden bg-white border w-80 roudend-sm"> 
                                <li className="w-full p-3 border-b">
                                    <Link to="/users/edit" className="flex flex-col items-start justify-center">
                                        <div className="flex items-center justify-start w-full mb-2">
                                            <img src={profileSampleImg} alt="img" className="w-16 h-16 mr-2 border border-white rounded-full"/>
                                            <div className="w-full">
                                                <p>#{userInfo.nickname}</p>
                                                <p>{userInfo.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-start">
                                            <i className="fas fa-cog"></i>
                                            <span className="ml-2">설정</span>
                                        </div>

                                    </Link>
                                </li>
                                <li className="p-3 cursor-pointer">
                                    <div className="flex items-center justify-start"
                                        onClick={clickLogoutEvent}
                                    >
                                        <i className="text-lx fas fa-sign-out-alt"></i>
                                        <span className="ml-2">로그아웃</span>
                                    </div>
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