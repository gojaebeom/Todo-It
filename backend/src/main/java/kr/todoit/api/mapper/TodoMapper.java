package kr.todoit.api.mapper;

import kr.todoit.api.domain.Todo;
import kr.todoit.api.dto.TodoIndexRequest;
import kr.todoit.api.dto.TodosByDayResponse;
import kr.todoit.api.dto.TodosByMonthResponse;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface TodoMapper {
    List<TodosByDayResponse> findDayTodosByCalendarIdWithMatchedDate(TodoIndexRequest todoIndexRequest);

    List<TodosByMonthResponse> findMonthByCalendarId(TodoIndexRequest todoIndexRequest);
}
