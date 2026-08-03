const scriptURL = 'https://script.google.com/macros/s/AKfycbwtucDOGOqCIf3CHyOPVBrQb8At7X0RuT9MS00K6n3PzUjxuBlrmbUh774YXp8KBetCHQ/exec';

document.addEventListener("DOMContentLoaded", function () {
    const regForm = document.getElementById("regForm");
    const tournamentSelect = document.getElementById("tournament");
    const teamNameGroup = document.getElementById("team-name-group");
    const squadMembersSection = document.getElementById("squad-members-section");

    tournamentSelect.addEventListener("change", function () {
        if (this.value === "solo-rampage") {
            teamNameGroup.style.display = "none";
            document.getElementById("teamName").required = false;
            squadMembersSection.style.display = "none";
            setRequiredSquad(false);
        } else {
            teamNameGroup.style.display = "block";
            document.getElementById("teamName").required = true;
            squadMembersSection.style.display = "block";
            setRequiredSquad(true);
        }
    });

    function setRequiredSquad(status) {
        document.getElementById("member2Name").required = status;
        document.getElementById("member2Uid").required = status;
        document.getElementById("member3Name").required = status;
        document.getElementById("member3Uid").required = status;
        document.getElementById("member4Name").required = status;
        document.getElementById("member4Uid").required = status;
    }

    regForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const submitBtn = document.querySelector(".btn-submit");
        submitBtn.textContent = "Submitting...";
        submitBtn.disabled = true;

        const formData = {
            tournament: tournamentSelect.options[tournamentSelect.selectedIndex].text,
            teamName: document.getElementById("teamName").value || "N/A (Solo)",
            playerName: document.getElementById("playerName").value,
            ffUid: document.getElementById("ffUid").value,
            member2Name: document.getElementById("member2Name").value || "N/A",
            member2Uid: document.getElementById("member2Uid").value || "N/A",
            member3Name: document.getElementById("member3Name").value || "N/A",
            member3Uid: document.getElementById("member3Uid").value || "N/A",
            member4Name: document.getElementById("member4Name").value || "N/A",
            member4Uid: document.getElementById("member4Uid").value || "N/A",
            whatsapp: document.getElementById("whatsapp").value
        };

        fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(() => {
            alert(`ස්තුතියි ${formData.playerName}! ඔබගේ ලියාපදිංචි කිරීම සාර්ථකයි.`);
            regForm.reset();
            submitBtn.textContent = "Confirm Registration";
            submitBtn.disabled = false;
            squadMembersSection.style.display = "block";
            teamNameGroup.style.display = "block";
            setRequiredSquad(true);
        })
        .catch(error => {
            console.error('Error!', error);
            alert('දෝෂයක් සිදු විය. කරුණාකර නැවත උත්සාහ කරන්න.');
            submitBtn.textContent = "Confirm Registration";
            submitBtn.disabled = false;
        });
    });
});