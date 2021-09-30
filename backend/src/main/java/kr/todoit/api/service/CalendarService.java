package kr.todoit.api.service;

import kr.todoit.api.domain.Calendar;
import kr.todoit.api.dto.CalendarStoreRequest;
import kr.todoit.api.repository.CalendarGroupRepository;
import kr.todoit.api.repository.CalendarRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.HashMap;

@Service
@Transactional
@AllArgsConstructor
@Slf4j
public class CalendarService {

    private CalendarRepository calendarRepository;
    private CalendarGroupRepository calendarGroupRepository;
    private ImageService imageService;

    public void store(CalendarStoreRequest storeRequest) throws IOException {
        if(storeRequest.getThumbnail() != null){
            HashMap<String, String> imageNameMap = imageService.upload(storeRequest.getThumbnail());
            storeRequest.setThumbnailPath(imageNameMap.get("origin"));
            storeRequest.setThumbnailPreviewPath(imageNameMap.get("preview"));
        }

        Calendar calendar = storeRequest.toCalendar();
        calendarRepository.save(calendar);
    }
}
