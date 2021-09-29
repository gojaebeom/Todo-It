package kr.todoit.api.interceptor;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.naming.AuthenticationException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.BindException;

@Slf4j
public class TokenVerifyInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        log.info("[ 토큰 유효성 검사 인터셉터 ]");
        log.info("Request Method : ");
        log.info(request.getMethod().toString());
        if(request.getMethod().equals("OPTIONS")){
            log.info("if request options method is options, return true");
            return true;
        }

        String tokenString = request.getHeader("Authorization");
        System.out.println(tokenString);
        if(tokenString == null){
            throw new AuthenticationException("PERMISSION_NOT_DEFINE");
        }
        String token;
        try{
            token = tokenString.split("bearer ")[1];
        }catch (Exception e){
            throw new IllegalArgumentException("토큰이 올바르지 않습니다.");
        }

        try{
            Claims data = Jwts.parser()
                    .setSigningKey("secret")
                    .parseClaimsJws(token)
                    .getBody();
            log.info("id", data.get("id"));
            request.setAttribute("id", data.get("id"));
        }catch(ExpiredJwtException e){
            throw new BindException("EXPIRED_TOKEN");
        }catch(Exception e) {
            throw new BindException("PERMISSION_NOT_DEFINE");
        }

        return true;
    }
}