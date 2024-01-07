var progressBars = document.querySelectorAll(".skill-progress > div");



function initialiseBar(bar) {
    bar.setAttribute("data-visited", false);
    bar.style.width = 0 + '%';
}

for (var bar of progressBars) {
    initialiseBar(bar);
}



function fillBar(bar) {

    var currentWidth = 0;
    var targetWidth = bar.getAttribute("data-bar-width");
    var interval = setInterval(function () {
        if (currentWidth >= targetWidth) {
            clearInterval(interval);
            return;
        }
        currentWidth++;
        bar.style.width = currentWidth + '%';
    }, 5);

}



function checkScroll() {

    for (let bar of progressBars) {
        var barCoordinates = bar.getBoundingClientRect();
        if ((bar.getAttribute("data-visited") == "false") &&
            (barCoordinates.top <= (window.innerHeight - barCoordinates.height))) {
            bar.setAttribute("data-visited", true);
            fillBar(bar);
        } else if (barCoordinates.top > window.innerHeight) {
            bar.setAttribute("data-visited", false);
            initialiseBar(bar);
        }

    }
}



window.addEventListener("scroll", checkScroll);



var modals = document.querySelectorAll(".modal");
var closeButtons = document.querySelectorAll(".close");

function openModal(projectIndex) {
    modals[projectIndex].style.display = "block";
}


for (var i = 0; i < closeButtons.length; i++) {
    closeButtons[i].onclick = function() {
        var modal = this.parentElement.parentElement;
        modal.style.display = "none";
    };
}


document.getElementById("portfolio-container").addEventListener("click", function(e) {
    var clickedElement = e.target;
    if (clickedElement.tagName === "IMG") {
        var projectContainer = clickedElement.closest(".portfolio-image-container");
        if (projectContainer) {
            var projectIndex = Array.from(projectContainer.parentNode.children).indexOf(projectContainer);
            openModal(projectIndex);
        }
    }
});
