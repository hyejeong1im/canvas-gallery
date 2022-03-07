import { 
    Point
} from './point.js';

export class Wave {
    constructor(index, totalPoints, color) {
        this.index = index;
        this.totalPoints = totalPoints;
        this.color = color;
        this.points = [];
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        // 화면의 중간
        this.centerX = stageWidth / 2;
        this.centerY = stageHeight / 2;

        this.pointGap = this.stageWidth / (this.totalPoints - 1);

        this.init();
    } 

    // resize 이벤트 후에 point 클래스 생성
    init() {
        this.points = [];

        // totalPoints 만큼 포인트 생성
        for (let i = 0; i < this.totalPoints; i++) {
            const point = new Point(
                this.index + i,
                this.pointGap * i,
                this.centerY,
            )
            this.points[i] = point;
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        
        let prevX = this.points[0].x;
        let prevY = this.points[0].y;

        ctx.moveTo(prevX, prevY);

        // 첫 포인트, 마지막 포인트는 움직이지 않음
        for (let i = 1; i < this.totalPoints; i++) {
            if (i < this.totalPoints - 1) {
                this.points[i].update();
            }

            // 포인트의 중간값. 곡선을 그리기 위해서는 이전값과 현재값의 중간을 위치 중간으로 설정해주어야 한다.
            const cx = (prevX + this.points[i].x) / 2;
            const cy = (prevY + this.points[i].y) / 2;

            // ctx.lineTo(cx, cy); // 직선
            ctx.quadraticCurveTo(prevX, prevY, cx, cy); // 곡선

            prevX = this.points[i].x;
            prevY = this.points[i].y;
        }

        ctx.lineTo(prevX, prevY);
        ctx.lineTo(this.stageWidth, this.stageHeight);
        ctx.lineTo(this.points[0].x, this.stageHeight);
        ctx.fill();
        ctx.closePath();
    }
}