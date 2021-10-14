package kr.todoit.api.dto;

import kr.todoit.api.exception.CustomException;
import kr.todoit.api.exception.ExceptionType;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class CalendarEditRequest {
    @NotNull(message = "캘린더 ID는 필수값입니다.")
    private Long id;
    @NotNull(message = "유저 ID는 필수값입니다.")
    private Long userId;
    @NotNull(message = "캘린더 이름은 필수값입니다.")
    private String name;
    private MultipartFile thumbnail;
    private String thumbnailPath;
    private String thumbnailPreviewPath;
    private Byte isPrivate;

    public void setName(String name){
        if(name.length() > 10) throw new CustomException(ExceptionType.OVERFLOW_CALENDAR_NAME);
        this.name = name;
    }
}
