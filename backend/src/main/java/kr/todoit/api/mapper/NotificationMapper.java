package kr.todoit.api.mapper;

import kr.todoit.api.dto.NotificationFindResponse;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface NotificationMapper {
    List<NotificationFindResponse> findAllByToUserId(Long id);
}
