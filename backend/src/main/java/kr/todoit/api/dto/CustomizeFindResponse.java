package kr.todoit.api.dto;

import kr.todoit.api.domain.CalendarCustomize;
import lombok.Builder;
import lombok.Getter;

@Getter
public class CustomizeFindResponse {
    private Long calendarId;
    private Long userId;
    private String matchedDate;
    private String color;

    public static CustomizeFindResponse of(CalendarCustomize calendarCustomize) {
        return CustomizeFindResponse.builder()
                .matchedDate(calendarCustomize.getMatchedDate())
                .color(calendarCustomize.getColor())
                .userId(calendarCustomize.getUser().getId())
                .calendarId(calendarCustomize.getCalendar().getId())
                .build();
    }

    @Builder
    public CustomizeFindResponse(Long calendarId, Long userId, String matchedDate, String color) {
        this.calendarId = calendarId;
        this.userId = userId;
        this.matchedDate = matchedDate;
        this.color = color;
    }
}
