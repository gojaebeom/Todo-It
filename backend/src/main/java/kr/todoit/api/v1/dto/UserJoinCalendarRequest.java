package kr.todoit.api.v1.dto;

import kr.todoit.api.v1.domain.Calendar;
import kr.todoit.api.v1.domain.CalendarGroup;
import kr.todoit.api.v1.domain.User;
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
