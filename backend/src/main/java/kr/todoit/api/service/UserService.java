package kr.todoit.api.service;

import kr.todoit.api.domain.User;
import kr.todoit.api.dto.UserJoinRequest;
import kr.todoit.api.dto.UserJoinResponse;
import kr.todoit.api.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.UUID;

@Service
@Transactional
@AllArgsConstructor
@Slf4j
public class UserService {

    private TokenService tokenService;
    private UserRepository userRepository;

    public HashMap<String, String> joinByOauth(UserJoinRequest userJoinRequest){
        User user = userRepository.findByEmail(userJoinRequest.getEmail());

        if(user == null){
            log.info("회원등록이 안된 유저 -> 회원가입 진행");

            String randomNickname;
            while (true){
                log.info("랜덤 닉네임 추출 -> 중복시 반복");
                String randomUUID = UUID.randomUUID().toString();
                randomNickname = randomUUID.split("-")[4];
                Short nicknameCount = userRepository.countByNickname(randomNickname);
                if(nicknameCount == 0) break;
            }

            userJoinRequest.setNickname(randomNickname);
            user = userJoinRequest.toUser();
            userRepository.save(user);
        }

        log.info("자동로그인 진행 -> 토큰 발급");
        String act = tokenService.getAct(user.getId());
        String rft = tokenService.getRft(user.getId());
        HashMap<String, String> tokens = new HashMap<>();
        tokens.put("act",act);
        tokens.put("rft",rft);

        return tokens;
    }
}
