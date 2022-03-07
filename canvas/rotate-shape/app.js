import { Polygon } from "./polygon.js";

class App {
    // 기본적으로 실행
    constructor() {
        // 캔버스 객체 만들기
        this.canvas = document.createElement('canvas');
        // 캔버스 객체를 body에 추가하기
        document.body.appendChild(this.canvas);
        // context 생성
        this.ctx = this.canvas.getContext('2d');

        // 레티나 디스플레이는 2, 일반 디스플레이는 1;
        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

        // 윈도우를 리사이즈할 때마다 리사이즈 함수 실행
        window.addEventListener('resize', this.resize.bind(this), false);
        // 리사이즈 함수 실행
        this.resize();

        // 클릭된 상태인가?
        this.isDown = false;
        // 움직인 x값
        this.moveX = 0;
        // 상쇄된 x값
        this.offsetX = 0;

        // bind하는 이유는 그냥 실행하면 객체를 보내고 나면 남 객체를 담아서 보낸다.?????????

        // 마우스를 누를 때 onDown 함수 실행
        document.addEventListener('pointerdown', this.onDown.bind(this), false);
        // 포인터를 움직일 때마다 onMove 함수 실행
        document.addEventListener('pointermove', this.onMove.bind(this), false);
        // 마우스를 뗄 때 onUp 함수 실행
        document.addEventListener('pointerup', this.onUp.bind(this), false);

        // 준비가 완료되면 animate 함수 실행
        window.requestAnimationFrame(this.animate.bind(this));
    }

    // 사이즈 조절함수
    resize() {
        // 현재 윈도우의 사이즈를 스테이지 사이즈에 넣기
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        // 캔버스의 크기를 pixelRatio 배로 설정
        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;

        // context의 크기도 pixelRatio 배로 설정
        this.ctx.scale(this.pixelRatio, this.pixelRatio);

        // 폴리곤 객체 불러오기
        this.polygon = new Polygon(
            this.stageWidth / 2, // x
            this.stageHeight + (this.stageHeight / 4), // y
            this.stageHeight / 1.5, // radius
            15 // sides(각)
        );
    }

    // 애니메이트 함수
    animate() {
        // 준비가 되면 animate 함수 실행하기
        window.requestAnimationFrame(this.animate.bind(this));

        // 캔버스 청소
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.moveX *= 0.92;
        // 폴리곤 객체에 ctx와 moveX 값을 담아서 애니메이트 함수 실행
        this.polygon.animate(this.ctx, this.moveX);
    }

    onDown(e) {
        this.isDown = true;
        this.moveX = 0;
        this.offsetX = e.clientX; // down시 현재 x위치를 옵셋x에 넣기
    }

    onMove(e) {
        if (this.isDown) {
            // Down이 시작된 곳의 x 위치에서 현재 위치를 뺀 값을 moveX
            this.moveX = e.clientX - this.offsetX;
            // 바뀐 현재 위치를 offsetX로.
            this.offsetX = e.clientX;
        }
    }

    onUp(e) {
        this.isDown = false;
    }
}

window.onload = () => {
    new App();
}