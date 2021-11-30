package kr.todoit.api.v1.dto;

import kr.todoit.api.v1.domain.Calendar;
import kr.todoit.api.v1.domain.Todo;
import kr.todoit.api.v1.domain.User;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class TodoStoreRequest {
    private Long userId;
    private List<Long> calendarIdList;
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
