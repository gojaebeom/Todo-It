package kr.todoit.api.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
public class UserEditRequest {
    @NotNull(message = "회원 아이디는 필수 값입니다.")
    private Long id;
    private String nickname;
    private MultipartFile profileImg;
}
