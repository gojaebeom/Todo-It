package kr.todoit.api.v1.mapper;

import kr.todoit.api.v1.dto.TodoIndexRequest;
import kr.todoit.api.v1.dto.TodosByDayResponse;
import kr.todoit.api.v1.dto.TodosByMonthResponse;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface TodoMapper {
    List<TodosByDayResponse> findDayTodosByCalendarIdWithMatchedDate(TodoIndexRequest todoIndexRequest);

    List<TodosByMonthResponse> findMonthByCalendarId(TodoIndexRequest todoIndexRequest);
}
