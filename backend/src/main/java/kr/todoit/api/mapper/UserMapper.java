package kr.todoit.api.mapper;

import kr.todoit.api.dto.UserDetailResponse;
import kr.todoit.api.dto.UserDetailWithCalendarsResponse;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    UserDetailWithCalendarsResponse findOneWithCalendarsById(Long id);
    UserDetailResponse findOneById(Long id);
}
