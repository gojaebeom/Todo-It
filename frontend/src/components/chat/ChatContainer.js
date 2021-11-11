import { useRef } from 'react'
import chatImg from '../../assets/images/chat.png'

function ChatContainer() {
  const chatRef = useRef()

  const chatOpen = () => {
    chatRef.current.classList.add(['w-[30px]', 'h-[30px]'])
    // // setTimeout(() => {
    // //   chatRef.current.classList.add('hidden')
    // // }, 300)
  }

  return (
    <div
      ref={chatRef}
      className="absolute right-5 bottom-5 w-[60px] h-[60px] z-50 rounded-full flex justify-center items-center bg-gray-200 cursor-pointer transition duration-700"
      onClick={chatOpen}
    >
      <img src={chatImg} alt="img" className="w-8/12" />
    </div>
  )
}

export default ChatContainer
