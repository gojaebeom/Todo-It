package kr.todoit.api.v1.repository;

import kr.todoit.api.v1.domain.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    Todo findTodoById(Long id);
}
