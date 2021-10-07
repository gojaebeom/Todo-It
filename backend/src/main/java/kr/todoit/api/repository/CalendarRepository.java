package kr.todoit.api.repository;

import kr.todoit.api.domain.Calendar;
import kr.todoit.api.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CalendarRepository extends JpaRepository<Calendar, Long> {
    Calendar findCalendarById(Long calendarId);

    List<Calendar> findByUserId(Long userId);
}
