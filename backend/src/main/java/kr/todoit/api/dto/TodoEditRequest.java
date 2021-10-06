package kr.todoit.api.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
public class TodoEditRequest {
    @NotNull(message = "일정 ID는 필수값입니다.")
    private Long id;
    private String title;
    private String description;
    private Byte isFinished;
}
