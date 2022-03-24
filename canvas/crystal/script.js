const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 700;

let particleArray = [];
let adjustX = 0;
let adjustY = 0;

const mouse = {
    x: null,
    y: null,
    radius: 100
}

// mousemove마다 이벤트의 마우스 정보를 mouse 객체에 담기
window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

ctx.font = '30px Verdana';
ctx.fillText('❄️', 2, 28);
const textCoordinates = ctx.getImageData(0, 0, 100, 100);

// Particle 객체 생성
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 5; // 원 객체의 사이즈
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 20) + 5;
    }
    draw() {
        ctx.fillStyle = 'skyblue';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    update() {
        // 피타고라스의 정리
        // 1. 점과 점 사이 가로와 세로 차이를 구하기
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        
        // 2. 제곱근을 구하는 sqrt 함수
        let distance = Math.sqrt(dx * dx + dy * dy);

        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;

        let maxDistance = mouse.radius;

        // ex) (100 - 20) / 100 = 80 / 100 = 0.8
        // = 20% 느리게
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        // 특정 거리 안의 객체들에게 x, y 변형
        if (distance < mouse.radius) {
            // this.size = 10; // 거리가 가까운 객체의 크기를 늘림
            this.x -= directionX;
            this.y -= directionY;
        }
        else {
            if (this.x !== this.baseX) {
                let dx = this.x - this.baseX;
                this.x -= dx / 10;
            }
            if (this.y !== this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy / 10;
            }
        }
    }
}

function init() {
    particleArray = [];

    // x, y를 랜덤으로 지정한 객체를 배열에 넣기
    // for (let i = 0; i < 500; i++) {
    //     let x = Math.random() * canvas.width;
    //     let y = Math.random() * canvas.height;
    //     particleArray.push(new Particle(x, y));
    // }

    // 글자를 스캔
    for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
        for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
            if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) // 스캔한 이미지의 데이터 불투명도가 128 이상인지 확인
            {
                let positionX = x + adjustX;
                let positionY = y + adjustY;
                particleArray.push(new Particle(positionX * 20, positionY * 20));
            }
        }
    }

}

init();
console.log(particleArray);

// 애니메이션 준비 완료가 되면, 이전 프레임을 클리어한 후 그림
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].draw();
        particleArray[i].update();
    }
    connect();
    requestAnimationFrame(animate);
}

animate();

// 선 연결
function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particleArray.length; a++) {
        for (let b = a; b < particleArray.length; b++) {
            let dx = particleArray[a].x - particleArray[b].x;
            let dy = particleArray[a].y - particleArray[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy); // 루트 씌우기
            opacityValue = 1 - (distance/50);

            if (distance < 50) {
                ctx.strokeStyle = 'rgba(153, 209, 244,' + opacityValue + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particleArray[a].x, particleArray[a].y);
                ctx.lineTo(particleArray[b].x, particleArray[b].y);
                ctx.stroke();
            }
        }
    }
}