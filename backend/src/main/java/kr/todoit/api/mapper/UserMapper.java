package kr.todoit.api.mapper;

import kr.todoit.api.dto.UserDetailResponse;
import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface UserMapper {
    UserDetailResponse findOneById(Long id);
    List<HashMap<String, Object>> findAllByCalendarId(Long id);
}
