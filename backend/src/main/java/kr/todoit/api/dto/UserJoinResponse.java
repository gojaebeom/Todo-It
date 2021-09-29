package kr.todoit.api.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class UserJoinResponse {
    private String act;
    private String rft;

    @Builder
    public UserJoinResponse(String act, String rft) {
        this.act = act;
        this.rft = rft;
    }
}
