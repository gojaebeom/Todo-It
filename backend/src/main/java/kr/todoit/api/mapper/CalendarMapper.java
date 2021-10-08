package kr.todoit.api.mapper;

import kr.todoit.api.dto.CalendarDetailResponse;
import kr.todoit.api.dto.CalendarListResponse;
import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface CalendarMapper {
    List<HashMap<String, Object>> findAllByUserId(Long id);

    CalendarDetailResponse findOneById(Long id);
}
