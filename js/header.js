function initHeader() {

    const topBar = document.getElementById("topBar");
    const header = document.getElementById("mainHeader");
    const spacer = document.getElementById("headerSpacer");

    if (!topBar || !header || !spacer) return;

    function updateLayout() {
        const topBarHeight = topBar.offsetHeight;
        const headerHeight = header.offsetHeight;

        spacer.style.height = headerHeight + "px";

        if (window.pageYOffset > 50) {
            topBar.style.transform = "translateY(-100%)";
            header.style.top = "0px";
        } else {
            topBar.style.transform = "translateY(0)";
            header.style.top = topBarHeight + "px";
        }
    }

    window.addEventListener("scroll", updateLayout);
    window.addEventListener("resize", updateLayout);

    updateLayout();
}

document.getElementById("like-icon").addEventListener("click", function () {
    window.location.href = "wishlist.html";
});

let likeIcon = document.getElementById("like-icon");

if (likeIcon) {
    likeIcon.addEventListener("click", function () {
        window.location.href = "wishlist.html";
    });
}