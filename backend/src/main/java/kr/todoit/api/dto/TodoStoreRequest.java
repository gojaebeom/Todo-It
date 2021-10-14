package kr.todoit.api.dto;

import kr.todoit.api.domain.Calendar;
import kr.todoit.api.domain.Todo;
import kr.todoit.api.domain.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TodoStoreRequest {
    private Long userId;
    private Long calendarId;
    private String title;
    private String description;
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
