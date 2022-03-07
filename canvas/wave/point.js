export class Point {
    constructor(index, x, y) {
        this.x = x;
        this.y = y;
        this.fixedY = y;
        this.speed = 0.1;
        this.cur = index; // 현재 포인트가 몇번째 포인트?
        this.max = Math.random() * 100 + 150;
    }

    // 포인트 움직이기
    update() {
        this.cur += this.speed;
        // Math.sin : 아래 위로 움직일 수 있게 하는 함수
        // sin값에 일정 값을 계속 추가하거나 빼면 리턴값이 1까지 증가했다가 다시 -1까지 감소함
        this.y = this.fixedY + (Math.sin(this.cur) * this.max);
    }
}