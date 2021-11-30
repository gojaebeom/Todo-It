package kr.todoit.api.v1.mapper;

import kr.todoit.api.v1.dto.NotificationFindResponse;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface NotificationMapper {
    List<NotificationFindResponse> findAllByToUserId(Long id);
}
