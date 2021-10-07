package kr.todoit.api.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CalendarIndexRequest {
    private Long userId;
    private Long calendarId;

    @Builder
    public CalendarIndexRequest(Long userId, Long calendarId) {
        this.userId = userId;
        this.calendarId = calendarId;
    }
}
