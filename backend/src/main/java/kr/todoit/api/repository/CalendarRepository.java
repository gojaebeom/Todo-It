package kr.todoit.api.repository;

import kr.todoit.api.domain.Calendar;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CalendarRepository extends JpaRepository<Calendar, Long> {
}
