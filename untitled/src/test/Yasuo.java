package test;

public class Heimerdinger extends Champion{

    @Override
    public void qSkill() {
        // 메소드 오버라이딩을 통해 부모의 기능을 사용
        // 아래 super 는 부모클래스를 가리킨다 -> 즉 밑의 주석 코드를 작성시 부모 클래스의 qSkill을 사용하게 된다.
        // super.qSkill();

        System.out.println("포탑 설치");
    }

    @Override
    public void wSkill() {
        System.out.println("미사일 발사!!");
    }

    @Override
    public void eSkill() {
        System.out.println("수류탄 투척!!");
    }

    @Override
    public void rSkill() {
        System.out.println("궁극기: 모든 스킬 강화!!");
    }

    @Override
    public void passive() {
        System.out.println("5티어를 벋어날 수 없는 구대기 챔피언이 바로 이녀석이다");
    }
}
