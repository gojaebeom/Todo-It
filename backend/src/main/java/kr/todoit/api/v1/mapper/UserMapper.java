package kr.todoit.api.v1.mapper;

import kr.todoit.api.v1.dto.UserDetailResponse;
import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface UserMapper {
    UserDetailResponse findOneById(Long id);
    List<HashMap<String, Object>> findAllByCalendarId(Long id);
}
