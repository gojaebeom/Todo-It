package kr.todoit.api.dto;

import kr.todoit.api.domain.Calendar;
import kr.todoit.api.domain.CalendarGroup;
import kr.todoit.api.domain.User;
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

    public void setName(String name) {
        if(name.length() > 10) throw new IllegalArgumentException("캘린더 이름은 10글자 이하로 작성해주세요.");
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
