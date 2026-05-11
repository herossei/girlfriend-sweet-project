const Buttons = document.querySelectorAll('.Buttons');

Buttons.forEach(button => {
    const buttonId = button.id;
    const pageUrl = `Pages/${buttonId}/index.html`;

    button.addEventListener('click', () => {
        window.location.href = pageUrl;
    });
});