let canvaslist = document.querySelector('.canvaslist ul');

canvaslist.onscroll = function () {
    progressBar()
};

function progressBar() {
    var winScroll = document.body.scrollTop || canvaslist.scrollTop;
    console.log(winScroll)
    var height = canvaslist.scrollHeight - canvaslist.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementsByClassName("progress-bar")[0].style.width = scrolled + "%";
}