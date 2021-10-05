package kr.todoit.api.dto;

import kr.todoit.api.domain.Calendar;
import kr.todoit.api.domain.Todo;
import kr.todoit.api.domain.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
public class TodoStoreRequest {
    @NotNull(message = "회원 id는 필수값입니다.")
    private Long userId;
    @NotNull(message = "캘린더 id는 필수값입니다.")
    private Long calendarId;
    @NotNull(message = "제목은 필수값입니다.")
    private String title;
    private String description;
    @NotNull(message = "매칭날짜는 필수값입니다.")
    private String matchedDate;

    public Todo toTodo(User user, Calendar calendar) {
        return Todo.builder()
                .user(user)
                .calendar(calendar)
                .title(title)
                .description(description)
                .matchedDate(matchedDate)
                .isFinished((byte) 0)
                .build();
    }
}
