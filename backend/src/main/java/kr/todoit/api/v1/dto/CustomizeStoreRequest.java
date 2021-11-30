package kr.todoit.api.v1.dto;

import kr.todoit.api.v1.domain.Calendar;
import kr.todoit.api.v1.domain.CalendarCustomize;
import kr.todoit.api.v1.domain.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CustomizeStoreRequest {
    private Long userId;
    private Long calendarId;
    private String color;
    private String matchedDate;

    @Builder
    public CustomizeStoreRequest(Long userId, Long calendarId, String color, String matchedDate) {
        this.userId = userId;
        this.calendarId = calendarId;
        this.color = color;
        this.matchedDate = matchedDate;
    }

    public CalendarCustomize toCalendarCustomize(User user, Calendar calendar) {
        return CalendarCustomize.builder()
                .user(user)
                .calendar(calendar)
                .color(color)
                .matchedDate(matchedDate)
                .build();
    }
}
