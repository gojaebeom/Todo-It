package kr.todoit.api.repository;

import kr.todoit.api.domain.CalendarCustomize;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CalendarCustomizeRepository extends JpaRepository<CalendarCustomize, Long> {

    Byte countByUserIdAndCalendarIdAndMatchedDate(Long userId, Long calendarId, String matchedDate);

    CalendarCustomize findByUserIdAndCalendarIdAndMatchedDate(Long userId, Long calendarId, String matchedDate);

    List<CalendarCustomize> findByUserIdAndCalendarId(Long userId, Long calendarId);
}
