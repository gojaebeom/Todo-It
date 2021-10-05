package kr.todoit.api.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TodoIndexRequest {
    private Long calendarId;
    private Long userId;
    private String matchedDate;
}
