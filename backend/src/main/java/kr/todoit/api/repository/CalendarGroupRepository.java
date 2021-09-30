package kr.todoit.api.repository;

import kr.todoit.api.domain.CalendarGroup;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CalendarGroupRepository extends JpaRepository<CalendarGroup, Long> {
}
