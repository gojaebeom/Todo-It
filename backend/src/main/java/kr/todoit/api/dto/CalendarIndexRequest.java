package kr.todoit.api.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class CalendarIndexRequest {
    @NotNull(message = "유저 아이디는 필수값입니다.")
    private Long userId;
    private Long calendarId;

    @Builder
    public CalendarIndexRequest(Long userId, Long calendarId) {
        this.userId = userId;
        this.calendarId = calendarId;
    }
}
