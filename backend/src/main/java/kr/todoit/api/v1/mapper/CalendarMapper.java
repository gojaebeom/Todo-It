package kr.todoit.api.v1.mapper;

import kr.todoit.api.v1.dto.CalendarDetailResponse;
import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface CalendarMapper {
    List<HashMap<String, Object>> findAllByUserId(Long id);

    CalendarDetailResponse findOneById(Long id);
}
