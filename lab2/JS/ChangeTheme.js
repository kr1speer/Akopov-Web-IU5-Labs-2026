document.addEventListener('DOMContentLoaded', () => {

    const themeSelect = document.getElementById('themeToggle');
    if (themeSelect) {
        themeSelect.addEventListener('change', (event) => {
            const selectedTheme = event.target.value;
            if (selectedTheme === 'light') {
                document.body.classList.add('light-theme');
            } else {
                document.body.classList.remove('light-theme');
            }
        });
    }


    const btnDisplayColor = document.getElementById('btn_display_color');
    const outputElement = document.getElementById('result');

    if (btnDisplayColor && outputElement) {
        btnDisplayColor.addEventListener('click', () => {
            outputElement.classList.toggle('alt-color');
        });
    }
});
