package kr.todoit.api.v1.repository;

import kr.todoit.api.v1.domain.Calendar;
import kr.todoit.api.v1.domain.CalendarGroup;
import kr.todoit.api.v1.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CalendarGroupRepository extends JpaRepository<CalendarGroup, Long> {
    Long countByUserAndCalendar(User user, Calendar calendar);
}
