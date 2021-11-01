import { Link } from 'react-router-dom'
import error404Img from '../../assets/images/404.svg'

const Error403 = () => {
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-screen overflow-hidden bg-indigo-900">
      <img
        src={error404Img}
        alt="cover"
        className="absolute object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-black opacity-25"></div>
      <div className="container relative flex items-center px-6 py-32 mx-auto md:px-12 xl:py-40">
        <div className="relative z-10 flex flex-col items-center w-full font-mono">
          <h1 className="mt-4 text-5xl font-extrabold leading-tight text-center text-white">
            Fobbien
          </h1>
          <p className="font-extrabold text-white text-8xl my-44 animate-bounce">
            403
          </p>
          <Link
            to="/login"
            className="my-10 text-xl font-extrabold text-white underline "
          >
            홈으로
          </Link>
        </div>
      </div>
    </div>
  )
}
export default Error403
