import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { loadingPageState } from "../../atoms/ui/loadingPage";

function LoadingPage(){
    const [loading, setLoading] = useRecoilState(loadingPageState);
    useEffect(() => {
        if(loading.step1 === false){
            console.log("실행");
            setTimeout(() => {
                setLoading({step1:false, step2:false});
            }, 500);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading.step1])

    
    return(
    loading.step2 &&
    <div className={` top-0 left-0 z-50 flex items-center justify-center w-full h-full transition-opacity delay-200 bg-red-300 ${loading.step1 ? "opacity-100 fixed " : "opacity-0 absolute visible"}`}>
        <div className="w-10 h-10 mx-2 border-t-2 border-r-2 rounded-full animate-spin"></div>
    </div>
    )
}
export default LoadingPage;