package kr.todoit.api.dto;

import kr.todoit.api.domain.User;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
public class UserJoinRequest {
    private String email;
    private String nickname;

    @NotNull(message = "provide type 은 필수값입니다.")
    private String provideType;

    public User toUser() {
        return User.builder()
                .email(email)
                .nickname(nickname)
                .build();
    }

//    public void setEmail(String email) {
//        try{
//            String _email = email.split(":")[1];
//            if(_email.equals("null")){
//                throw new IllegalArgumentException("이메일값이 입력되지 않았습니다");
//            }
//        }catch (Exception e){
//            throw new IllegalArgumentException("이메일 형식이 아닙니다.");
//        }
//        this.email = email;
//    }
}
