package kr.todoit.api.v1.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
public class TodoIndexRequest {
    @NotNull(message = "캘린더 아이디는 필수값입니다.")
    private Long calendarId;
    private Long userId;
    private String matchedDate;
}
