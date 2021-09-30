package kr.todoit.api.dto;

import kr.todoit.api.domain.Calendar;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
public class CalendarStoreRequest {
    @NotNull(message = "최초 생성자 id는 필수값입니다.")
    private Long userId;
    @NotNull(message = "캘린더 이름은 필수값입니다.")
    private String name;
    private MultipartFile thumbnail;
    private String thumbnailPath;
    private String thumbnailPreviewPath;

    public Calendar toCalendar(){
        return Calendar.builder()
                .name(name)
                .thumbnail(thumbnailPath)
                .thumbnailPreview(thumbnailPreviewPath)
                .build();
    }
}
