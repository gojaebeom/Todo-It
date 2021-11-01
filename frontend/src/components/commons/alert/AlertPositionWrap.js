import Alert from './Alert'

const AlertPositionWrap = () => {
  return (
    <div className={'alert-position-wrap absolute left-0 top-0 w-full h-full flex justify-center items-center bg-black bg-opacity-80 z-50'}>
      <Alert />
    </div>
  )
}
export default AlertPositionWrap
