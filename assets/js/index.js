// Get page elements
const modal = document.getElementById("myModal");
const closeModalBtn = document.getElementsByClassName("close")[0];
const startGame = document.getElementById('start-game');

// Get modal content elements
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");

let pageUrl = ""; // Variable to store the URL

// When a user clicks a button, open the modal with dynamic content
document.querySelectorAll('.openModalBtn').forEach(button => {
    button.addEventListener('click', () => {
        const title = button.getAttribute('data-title');
        const body = button.getAttribute('data-body');
        pageUrl = button.getAttribute('data-url');
        
        // Set dynamic title and body in the modal
        modalTitle.innerText = title;
        modalBody.innerText = body;
        modal.style.display = "flex";
    });
});

// Close modal when the user clicks on close (X)
closeModalBtn.onclick = function() {
    modal.style.display = "none";
};

// Close modal if the user clicks outside the modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// Open quiz page
startGame.addEventListener('click', () => {
    if (pageUrl) {
        window.location.href = pageUrl; // Open the URL in the same window
    }
});