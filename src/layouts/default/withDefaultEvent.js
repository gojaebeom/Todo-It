import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

function withDefaultEvent(DefaultLayout){
    return ({ children }) => {

        const profileMenu = useSelector(s=>s.profileMenu);
        const dispatch = useDispatch();
        const layoutRef = useRef();
        const profileRef = useRef();

        useEffect(() => {
            const clickEventHandler = (e) => {
                let el = e.target;

                while (el) {
                    el = el.parentNode;

                    if(el === profileRef.current){
                        if(profileMenu){
                            dispatch({type: "PROFILE_MENU_TOGGLE", payload: false});
                            break;
                        } else {
                            dispatch({type: "PROFILE_MENU_TOGGLE", payload: true});
                            break;
                        }
                    }else{
                        dispatch({type: "PROFILE_MENU_TOGGLE", payload: false});
                        break;
                    }
                }
            }
            window.addEventListener("click", clickEventHandler);
            
            return () => {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                window.removeEventListener("click", clickEventHandler);
            }

        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [profileMenu]);

        return (
        <DefaultLayout
            children={children}
            profileMenu={profileMenu}
            layoutRef={layoutRef}
            profileRef={profileRef}
        />
        );
    }
}
export default withDefaultEvent;