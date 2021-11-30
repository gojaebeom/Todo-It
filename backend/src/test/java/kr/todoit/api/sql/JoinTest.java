package kr.todoit.api.sql;

import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class JoinTest {

//    @Autowired
//    private UserMapper userMapper;
//    @Autowired
//    private CalendarMapper calendarMapper;
//
//    @Test
//    public void test(){
//
//        List<CalendarListResponse> calendarListResponses = new ArrayList<>();
//
//        // 특정 유저가 구독한 모든 캘린더 리스트를 불러온다.
//        List<HashMap<String, Object>> calendars = calendarMapper.findAllByUserId(1L);
//        for(HashMap<String, Object> calendar : calendars){
//
//            // 각 캘린더마다 가입하고있는 유저리스트를 보여준다
//            // 캘린더가 있는만큼 호출
//            List<HashMap<String, Object>> users = userMapper.findAllByCalendarId(Long.valueOf(calendar.get("id").toString()));
//        }
//    }
}
