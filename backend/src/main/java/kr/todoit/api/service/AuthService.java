package kr.todoit.api.service;

import kr.todoit.api.domain.User;
import kr.todoit.api.dto.TokenResponse;
import kr.todoit.api.exception.CustomException;
import kr.todoit.api.exception.ExceptionType;
import kr.todoit.api.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.naming.AuthenticationException;
import java.util.HashMap;

@Service
@AllArgsConstructor
@Slf4j
@Transactional
public class AuthService {

    private TokenService tokenService;
    private UserRepository userRepository;

    public TokenResponse verify(String token) throws AuthenticationException {
        HashMap<String, Object> tokenInfo = tokenService.verifyToken(token);
        System.out.println(tokenInfo);
        User user = userRepository.findUserById(Long.valueOf(tokenInfo.get("id").toString()));

        if(user == null){
            throw new CustomException(ExceptionType.NOT_FOUND_USER);
        }

        HashMap<String, Object> actInfo = tokenService.getAct(Long.valueOf(tokenInfo.get("id").toString()));
        HashMap<String, Object> rftInfo = tokenService.getRft(Long.valueOf(tokenInfo.get("id").toString()));

        return TokenResponse.builder()
                .actInfo(actInfo)
                .rftInfo(rftInfo)
                .build();
    }
}
