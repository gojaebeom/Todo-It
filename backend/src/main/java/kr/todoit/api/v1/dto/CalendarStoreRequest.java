package kr.todoit.api.v1.dto;

import kr.todoit.api.v1.domain.Calendar;
import kr.todoit.api.v1.domain.CalendarGroup;
import kr.todoit.api.v1.domain.User;
import kr.todoit.api.v1.exception.CustomException;
import kr.todoit.api.v1.exception.ExceptionType;
import lombok.Builder;
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
    private Byte isPrivate;
    private Byte isDefault;

    public void setName(String name)  {
        // 최초 생성자 id는 필수값 에러 필요
        // 캘린더 null 안됨
        // 캘린더 명 10글자 이하
        if(name.length() > 10) throw new CustomException(ExceptionType.OVERFLOW_CALENDAR_NAME);

        this.name = name;
    }

    public Calendar toCalendar(User user){
        return Calendar.builder()
                .user(user)
                .name(name)
                .thumbnail(thumbnailPath)
                .thumbnailPreview(thumbnailPreviewPath)
                .isPrivate(isPrivate)
                .isDefault(isPrivate)
                .build();
    }

    public CalendarGroup toCalendarGroup(Calendar calendar, User user){
        return CalendarGroup.builder()
                .calendar(calendar)
                .user(user)
                .build();
    }

    @Builder
    public CalendarStoreRequest(Long userId, String name, MultipartFile thumbnail, String thumbnailPath, String thumbnailPreviewPath, Byte isPrivate, Byte isDefault) {
        this.userId = userId;
        this.name = name;
        this.thumbnail = thumbnail;
        this.thumbnailPath = thumbnailPath;
        this.thumbnailPreviewPath = thumbnailPreviewPath;
        this.isPrivate = isPrivate;
        this.isDefault = isDefault;
    }
}
