package kr.todoit.api.service;

import kr.todoit.api.domain.Calendar;
import kr.todoit.api.domain.Todo;
import kr.todoit.api.domain.User;
import kr.todoit.api.dto.TodoIndexRequest;
import kr.todoit.api.dto.TodoStoreRequest;
import kr.todoit.api.dto.TodosByDayResponse;
import kr.todoit.api.mapper.TodoMapper;
import kr.todoit.api.repository.CalendarRepository;
import kr.todoit.api.repository.TodoRepository;
import kr.todoit.api.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@AllArgsConstructor
@Slf4j
public class TodoService {
    private TodoRepository todoRepository;
    private CalendarRepository calendarRepository;
    private UserRepository userRepository;
    private TodoMapper todoMapper;


    public List<TodosByDayResponse> index(TodoIndexRequest todoIndexRequest) {
        return todoMapper.findDayTodosByCalendarIdWithMatchedDate(todoIndexRequest);
    }

    public void store(TodoStoreRequest todoStoreRequest){
        User user = userRepository.findUserById(todoStoreRequest.getUserId());
        Calendar calendar = calendarRepository.findCalendarById(todoStoreRequest.getCalendarId());
        if(user != null && calendar != null){
            log.info("유저, 캘린더 매칭 -> 투두 저장");
            Todo todo = todoStoreRequest.toTodo(user, calendar);
            todoRepository.save(todo);
        }else{
            throw new IllegalArgumentException("저장하려는 일정정보의 회원, 또는 캘린더가 존재하지 않습니다.");
        }
    }
}
