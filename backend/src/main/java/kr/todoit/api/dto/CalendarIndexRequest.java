package kr.todoit.api.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CalendarIndexRequest {
    private Long userId;
    private Long calendarId;
}
