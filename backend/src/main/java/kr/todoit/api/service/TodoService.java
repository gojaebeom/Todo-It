package kr.todoit.api.service;

import kr.todoit.api.domain.Calendar;
import kr.todoit.api.domain.Todo;
import kr.todoit.api.domain.User;
import kr.todoit.api.dto.*;
import kr.todoit.api.exception.CustomException;
import kr.todoit.api.exception.ExceptionType;
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


    public List<TodosByDayResponse> findDays(TodoIndexRequest todoIndexRequest) {
        return todoMapper.findDayTodosByCalendarIdWithMatchedDate(todoIndexRequest);
    }

    public List<TodosByMonthResponse> findMonth(TodoIndexRequest todoIndexRequest) {
        return todoMapper.findMonthByCalendarId(todoIndexRequest);
    }

    public void store(TodoStoreRequest todoStoreRequest){
        User user = userRepository.findUserById(todoStoreRequest.getUserId());
        Calendar calendar = calendarRepository.findCalendarById(todoStoreRequest.getCalendarId());
        if(user != null && calendar != null){
            log.info("유저, 캘린더 매칭 -> 투두 저장");
            Todo todo = todoStoreRequest.toTodo(user, calendar);
            todoRepository.save(todo);
        }else{
            throw new CustomException(ExceptionType.TODO_STORE_FAILS);
        }
    }

    public void delete(Long id) {
        todoRepository.deleteById(id);
        log.info("투두 삭제");
    }

    public void edit(TodoEditRequest todoEditRequest) {
        Todo todo = todoRepository.findTodoById(todoEditRequest.getId());
        if(todoEditRequest.getTitle() != null && !todoEditRequest.getTitle().equals("")){
            todo.setTitle(todoEditRequest.getTitle());
        }
        if(todoEditRequest.getDescription() != null){
            todo.setDescription(todoEditRequest.getDescription());
        }
        if(todoEditRequest.getIsFinished() != null){
            todo.setIsFinished(todoEditRequest.getIsFinished());
        }
    }
}
