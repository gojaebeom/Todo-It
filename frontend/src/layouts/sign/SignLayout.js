const SignLayout = ({ children }) => {
    return(
    <div className="relative flex items-center justify-center w-full h-screen overflow-hidden text-black bg-red-300 font-noto-light">
        { children }
    </div>
    )
}
export default SignLayout;