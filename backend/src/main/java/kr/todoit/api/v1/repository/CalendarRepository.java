package kr.todoit.api.v1.repository;

import kr.todoit.api.v1.domain.Calendar;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CalendarRepository extends JpaRepository<Calendar, Long> {
    Calendar findCalendarById(Long calendarId);

    List<Calendar> findByUserId(Long userId);
}
