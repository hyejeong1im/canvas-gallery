<img width="1430" alt="canvasg" src="https://user-images.githubusercontent.com/84780174/160053398-7c4806b6-af6b-42ae-af2f-93b6d1539563.png">

<br/>
🔗 https://limhyejeong.github.io/canvasgallery/index.html

<br/><br/>

# ⛳️ 제작 의도

HTML5의 Canvas를 활용하여 만든 작업물들을 갤러리 스타일으로 정리하였다.


<br/><br/>

# 🧩 인터랙션

- 가로 스크롤
- 마우스 호버 시 프리뷰 영상 재생

<br/><br/>

# 🎨 구현 방법 & 코드
<br/>

## 1. 가로 스크롤

프로젝트를 둘러싼 ul을 -90도로 돌려 가로로 긴 오브젝트를 만들고

내부 li 태그는 정 방향으로 돌려 제대로 보일 수 있게 하였다.

```css
.canvaslist ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vh;
    transform: rotate(-90deg) translate3d(0, -100vh, 0);
    transform-origin: right top;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100vw;
    perspective: 1px;
    transform-style: preserve-3d;
}

.canvaslist ul li {
    transform: rotate(90deg) translateY(-10vh);
}
```
<br/><br/>
## 2. 프로그래스 바

프로젝트 리스트(ul) 안에서 스크롤 할 때마다

스크롤 y위치값을 화면 width값에 비례하여,

스크롤을 내릴 수록 프로그래스 바의 width가 늘어나게 만들었다.

```jsx
canvaslist.onscroll = function () {
    progressBar()
};

// progress bar
function progressBar() {
    let winScroll = document.body.scrollTop || canvaslist.scrollTop;
    let height = canvaslist.scrollHeight - canvaslist.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementsByClassName("progress-bar")[0].style.width = scrolled + "%";
}
```
<br/><br/>
## 3. 마우스 호버 시 동영상 재생

기존 mov파일을 웹에 최적화된 video 타입인

webm 형식으로 변환 후 삽입하였다.

```html
<video loop muted>
	<source src="./canvas/p5-spacefield/spacefield.webm" type="video/webm">
</video>
```

자바스크립트 **HTMLMediaElement.play()** 비디오 메소드를 사용하였다.

객체 위에 마우스를 올리면 비디오가 재생되며

마우스가 떠나면 비디오가 일시정지된다.

```jsx
videoElem.addEventListener('mouseenter', handlePlayButton, false);
videoElem.addEventListener('mouseleave', handlePlayButton, false);

async function playVideo() {
	try {
		await videoElem.play();
	} catch (err) {
		console.log(err);
	}
}
    
function handlePlayButton() {
	if (videoElem.paused) {
		playVideo();
	} else {
		videoElem.pause();
	}
}
```

해당 메소드 형식을 따르지 않으면 오류가 난다. (링크)

[HTMLMediaElement.play() - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play)
