// Watch Live button click alert
const watchLiveBtn = document.getElementById('alert-btn');
if (watchLiveBtn) {
    watchLiveBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Live streaming channel එක ළඟදීම update කරන්නම්!');
    });
}

// Tournament Register Buttons alert
const registerButtons = document.querySelectorAll('.register-click');
registerButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Registration form එක ළඟදීම website එකට add කරනවා. සුදාفن ඉන්න!');
    });
});