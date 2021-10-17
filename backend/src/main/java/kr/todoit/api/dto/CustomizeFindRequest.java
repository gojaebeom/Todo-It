package kr.todoit.api.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CustomizeFindRequest {
    private Long userId;
    private Long calendarId;
}
