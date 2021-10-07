package kr.todoit.api.dto;

import kr.todoit.api.domain.Calendar;
import kr.todoit.api.domain.CalendarGroup;
import kr.todoit.api.domain.User;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserJoinCalendarRequest {
    private String userCode;
    private Long calendarId;

    public CalendarGroup toCalendarGroup(User user, Calendar calendar) {
        return CalendarGroup.builder()
                .user(user)
                .calendar(calendar)
                .build();
    }
}
