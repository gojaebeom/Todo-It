import { useRecoilState } from 'recoil'
import { patchNoteState } from '../../states/patchNoteState'

const PatchNoteModal = () => {
  const [open, setOpen] = useRecoilState(patchNoteState)

  return (
    open && (
      <div
        className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50 cursor-pointer"
        onClick={() => setOpen(false)}
      >
        <div
          className="relative flex flex-col items-center p-2 overflow-hidden bg-white rounded-sm w-full h-full sm:w-[450px] sm:h-[80%] cursor-default overflow-y-scroll custom-scroll"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="absolute top-0 right-0 px-3 py-1 cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <i className="fas fa-times sm:text-xl"></i>
          </div>
          <p className="mt-3 mb-5 text-2xl">투두잇 패치노트</p>

          <div className="w-full p-3 mb-3 text-sm rounded-sm bg-gray-50">
            <p className="text-xl">2021-11-12</p>
            <p className="text-lg">[유저 상세정보 카드 생성]</p>
            <p>
              컨텐츠는 구상중입니다.
            </p>
            <p className="text-lg">[캘린더 모바일 화면 레이아웃 수정]</p>
          </div>

          <div className="w-full p-3 mb-3 text-sm rounded-sm bg-gray-50">
            <p className="text-xl">2021-11-03</p>
            <p className="text-lg">[PWA 적용]</p>
            <p>
              기존의 웹 환경을 데스크톱, 모바일로 간단하게 볼 수 있는 환경을 만들었습니다. 아직 추가적인 업데이트가 지속적으로 필요할 것 같아요.
              문제가 보이면 알려주시면 감사합니다..^^
            </p>
          </div>

          <div className="w-full p-3 mb-3 text-sm rounded-sm bg-gray-50">
            <p className="text-xl">2021-11-01</p>
            <p className="text-lg">[반응형 레이아웃 적용]</p>
            <p>
            반응형 레이아웃을 만드는 것은  상당히 번거로운 일인 것 같습니다.. 제가 웹사이트를 만들 땐 데스크톱의 레이아웃은 어렴풋이 그려지는 느낌대로 만들게 되는데, 
            그 이후에 모바일 디자인을 껴맞추느라 노가다가 많이 필요하더군요😅
            </p>
            <p className="text-lg">[패치노트 모달 추가]</p>
            <p>
            업데이트가 어떤 식으로 되었는지 남기는 페이지가 있으면 좋을 것 같다는 피드백을 받았습니다. 마침 생각하고 있던 터라 이번 기회에 추가했습니다.
            원래 마크다운 라이브러리를 추가하여 편하게 작성할 생각이었는데, 이런저런 문제가 생겨 하나하나 html 태그로 작성하고 있네요😓
            </p>
          </div>

          <div className="w-full p-3 mb-3 text-sm rounded-sm bg-gray-50">
            <p className="text-xl">2021-10-17</p>
            <p className="text-lg">[2차 피드백 적용]</p>

            <p>
              - 투두리스트 작성시 자신의 다른 캘린더에 동시에 글 작성할 수 있는
              기능 구현
            </p>
            <p>
              - 투두리스트 페이지에서 상세내용 더보기, 접기 제거 -&gt; 모두
              보이는게 기본값으로 수정
            </p>
            <p>- 투두리스트 디자인 일부 수정</p>
            <p>
              - 캘린더 커스터마이징 기능 구현( 캘린더의 각 셀에서 마우스
              우클릭을 통해 원하는 색으로 변경 )
            </p>
            <p>캘린더 커스터마이징은 자기 자신에게만 보이도록 설정</p>
            <p>( 서버 배포 이후 색깔 변경시 조금 늦게 변경되는 문제 발생 )</p>
            <p>- 좌측 캘린더 매뉴바 각 아이콘 클릭 디자인 변경</p>
            <p>0.0.2-SNAPSHOT -&gt; 0.0.3-SNAPSHOT 버전으로 배포</p>
            <p>
              💡 현재 AWS 우분투 프리티어 서버 사용중인데, 어플리케이션,
              데이터베이스, 파일관리까지 한 서버에서 사용중이라 가끔 엄청
              느려지는 문제가 있습니다. (기본적인 속도도 느립니다.. ) 이 부분은
              회사 나스서버로 옮겨야 개선될 것 같습니다.{' '}
            </p>
          </div>

          <div className="w-full p-3 mb-3 text-sm rounded-sm bg-gray-50">
            <p className="text-xl">2021-10-11</p>
            <p className="text-lg">[피드백 1차 적용]</p>

            <p>- 캘린더 화면에서 각 투두의 구분 </p>
            <p>
              - 캘린더 각 셀의 overflow 제거 -&gt; 내용이 늘어나는 만큼 셀이
              늘어나는 방식으로 변경
            </p>
            <p>- 캘린더 썸네일 생성시 이미지 위에 흰 텍스트로 제목 강조</p>
            <p>- jwt 토큰 인증시간 20 -&gt; 30 분으로 변경 </p>
            <p>- jwt 자동갱신 기능 생성</p>
            <p>- 위 사항 업데이트 -&gt; 0.0.2-SNAPSHOT 버전으로 배포</p>
          </div>

          <div className="w-full p-3 mb-3 text-sm rounded-sm bg-gray-50">
            <p className="text-xl">2021-10-11</p>
            <p className="text-lg">[투두잇 문제 개선]</p>
            <p>- 처음 접속시 403 에러페이지로 이동하는 문제</p>
            <p>
              - 기본 캘린더는 삭제가 불가능하게 만들기 (is_default 컬럼 추가)
            </p>
            <p>- 투두리스트 상세보기 UI 추가</p>
            <p>- 캘린더 하단에 배타버전 관련 글 띄워두기</p>
            <p>- 투두리스트 채크박스 커스텀디자인으로 변경</p>
          </div>

          <div className="w-full p-3 text-sm rounded-sm bg-gray-50">
            <p className="text-xl">2021-10-10</p>
            <p className="text-lg">[투두잇 테스트 버전 배포]</p>
            <p>
              '2주간의 여정 끝에 투두잇 서비스가 출시되었습니다. 처음은 사내에서
              간단히 일정을 적을 수 있는 앱으로 만들려고 하였으나, 조금 방향을
              바꿔서 누구나 사용할 수 있는 앱으로 개선하였습니다.'
            </p>
          </div>
        </div>
      </div>
    )
  )
}

export default PatchNoteModal
