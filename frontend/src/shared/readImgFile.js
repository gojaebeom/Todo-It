const readImgFile = (event, callback) => {
  if (event.target.files.length === 0) {
    event.target.value = ''
    return false
  }
  const file = event.target.files[0]
  const fileName = file.name

  if (/(\.gif|\.jpg|\.jpeg|\.png)$/i.test(fileName) === false) {
    event.target.value = ''
    return alert('이미지 파일을 선택해주세요')
  }

  // FileReader 인스턴스 생성
  const reader = new FileReader()
  // 이미지가 로드가 된 경우
  reader.onload = (event) => {
    callback(event, file)
  }
  // reader가 이미지 읽도록 하기
  reader.readAsDataURL(event.target.files[0])
}
export default readImgFile
