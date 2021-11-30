package kr.todoit.api.v1.service;

import io.jsonwebtoken.*;
import kr.todoit.api.v1.exception.CustomException;
import kr.todoit.api.v1.exception.ExceptionType;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.naming.AuthenticationException;
import java.time.Duration;
import java.util.Date;
import java.util.HashMap;

@Slf4j
@Service
public class TokenService {

    @Value("${custom.secret}")
    private String secret;

    private final String ISSUER = "todo-it";

    public HashMap<String, Object> getAct(Long userId) throws AuthenticationException {
        Date now = new Date();
        String accessToken = Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .setIssuer(ISSUER)
                .setSubject("act")
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + Duration.ofMinutes(30).toMillis()))
                .claim("id", userId)
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();

        return verifyToken(accessToken);
    }

    public HashMap<String, Object> getRft(Long userId) throws AuthenticationException {
        Date now = new Date();
        String refreshToken = Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .setIssuer(ISSUER)
                .setSubject("rft")
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + Duration.ofDays(14).toMillis()))
                .claim("id", userId)
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();

        return verifyToken(refreshToken);
    }

    public static void isMatched(Long userId, Long tokenUserId) throws AuthenticationException {
        if(userId != tokenUserId){
            log.info("일치하지 않은 유저");
            throw new AuthenticationException("일치하지 않는 회원 정보입니다.");
        }
    }

    public HashMap<String, Object> verifyToken(String token) throws AuthenticationException {
        try{
            Claims data = Jwts.parser()
                    .setSigningKey(secret)
                    .parseClaimsJws(token)
                    .getBody();
            System.out.println(data);
            HashMap<String, Object> info = new HashMap<>();
            info.put("token", token);
            info.put("iss", data.get("iss").toString());
            info.put("sub", data.get("sub").toString());
            info.put("id", Long.parseLong(data.get("id").toString()));
            info.put("exp", Long.parseLong(data.get("exp").toString()) );
            info.put("iat", Long.parseLong(data.get("iat").toString()) );

            return info;
        }catch(ExpiredJwtException e){
            log.info("토큰 만료됨");
            System.out.println(e.getMessage());
            throw new CustomException(ExceptionType.EXPIRED_TOKEN);
        }catch(Exception e) {
            System.out.println(e.getMessage());
            throw new CustomException(ExceptionType.NOT_MATCHED_TOKEN);
        }
    }
}
