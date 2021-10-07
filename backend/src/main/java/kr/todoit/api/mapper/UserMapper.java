package kr.todoit.api.mapper;

import kr.todoit.api.dto.UserDetailResponse;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    UserDetailResponse findOneById(Long id);
}
