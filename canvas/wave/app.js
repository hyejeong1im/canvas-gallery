import { 
    WaveGroup
} from './wavegroup.js';

class App {
    constructor() {
        // 캔버스 생성
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        // body 아래에 캔버스 삽입
        document.body.appendChild(this.canvas);

        // wave 클래스 생성
        this.WaveGroup = new WaveGroup();

        // 윈도우가 리사이즈 될 때
        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        // 애니메이션 실행
        requestAnimationFrame(this.animate.bind(this));

        // * bind를 쓰는 이유 *
        // 함수에서는 this를 app이 아닌 window로 인식하기 때문에 원하는 객체를 callback 함수에 넘겨주기 위해서는 this.함수.bind(this) 사용.
    }

    // 캔버스의 해상도를 높이기 위해 더블 사이즈로 지정한 후, 크기를 줄임
    resize() {
        // 현재 창 크기를 값에 대입
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        // 대입한 값의 2배를 캔버스 크기로 지정
        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2, 2);

        this.WaveGroup.resize(this.stageWidth, this.stageHeight);
    }

    animate(t) {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.WaveGroup.draw(this.ctx);

        requestAnimationFrame(this.animate.bind(this));
    }
}

window.onload = () => {
    new App();
}