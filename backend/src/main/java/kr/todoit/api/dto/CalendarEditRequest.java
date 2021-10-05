package kr.todoit.api.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CalendarEditRequest {
    private Long id;
    private Long userId;
}
