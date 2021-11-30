package kr.todoit.api.v1.service;

import kr.todoit.api.v1.domain.Calendar;
import kr.todoit.api.v1.domain.Todo;
import kr.todoit.api.v1.domain.User;
import kr.todoit.api.v1.dto.*;
import kr.todoit.api.v1.exception.CustomException;
import kr.todoit.api.v1.exception.ExceptionType;
import kr.todoit.api.v1.mapper.TodoMapper;
import kr.todoit.api.v1.repository.CalendarRepository;
import kr.todoit.api.v1.repository.TodoRepository;
import kr.todoit.api.v1.repository.UserRepository;
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
        /**
         * TODO : 2021.10.15
         * 여러 캘린더에 배포하는 방식으로 변경
         */
        for(Long calendarId : todoStoreRequest.getCalendarIdList()){
            Calendar calendar = calendarRepository.findCalendarById(calendarId);
            if(user != null && calendar != null){
                log.info("유저, 캘린더 매칭 -> 투두 저장");
                Todo todo = todoStoreRequest.toTodo(user, calendar);
                todoRepository.save(todo);
            }else{
                throw new CustomException(ExceptionType.TODO_STORE_FAILS);
            }
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
