package kr.todoit.api.service;

import kr.todoit.api.domain.Calendar;
import kr.todoit.api.domain.CalendarGroup;
import kr.todoit.api.domain.User;
import kr.todoit.api.dto.CalendarDetailResponse;
import kr.todoit.api.dto.CalendarListResponse;
import kr.todoit.api.dto.CalendarStoreRequest;
import kr.todoit.api.mapper.CalendarMapper;
import kr.todoit.api.repository.CalendarGroupRepository;
import kr.todoit.api.repository.CalendarRepository;
import kr.todoit.api.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

@Service
@Transactional
@AllArgsConstructor
@Slf4j
public class CalendarService {

    private CalendarRepository calendarRepository;
    private CalendarGroupRepository calendarGroupRepository;
    private CalendarMapper calendarMapper;
    private UserRepository userRepository;
    private ImageService imageService;


    public List<CalendarListResponse> store(CalendarStoreRequest storeRequest) throws IOException {

        if(storeRequest.getThumbnail() != null){
            log.info("캘린더 썸네일 파일 존재 -> 썸네일, 썸네일 프리뷰 이미지 생성,");
            HashMap<String, String> imageNameMap = imageService.upload(storeRequest.getThumbnail());
            storeRequest.setThumbnailPath(imageNameMap.get("origin"));
            storeRequest.setThumbnailPreviewPath(imageNameMap.get("preview"));
        }
        log.info("캘린더 생성");
        User user = userRepository.findUserById(storeRequest.getUserId());
        Calendar calendar = storeRequest.toCalendar(user);
        calendarRepository.save(calendar);

        log.info("캘린더 그룹 생성");
        CalendarGroup calendarGroup = storeRequest.toCalendarGroup(calendar, user);
        calendarGroupRepository.save(calendarGroup);

        return calendarMapper.findAllByUserId(storeRequest.getUserId());
    }

    public CalendarDetailResponse show(Long id) {
        return calendarMapper.findOneById(id);
    }
}
