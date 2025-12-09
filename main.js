
const urlParams = new URLSearchParams(window.location.search);
const currentEventID = urlParams.get('event');
const contentDiv = document.getElementById('app-content');
const titleDiv = document.getElementById('page-title');
const toastContainer = document.getElementById('toast-container');

let currentLang = localStorage.getItem('lang') || 'et';


const translations = {
    en: {
        appName: "GiftOS",
        welcome: "Welcome to GiftOS",
        tagline: "Just works.",
        createEvent: "Create New Event",
        enterCode: "Have an invite code? Enter the URL directly in the browser",
        newEvent: "New Event",
        setupEvent: "Setup Event",
        adminText: "You will be the administrator",
        eventName: "New Event Name",
        hostEmail: "Host Email",
        hostPass: "Host Password",
        generateEvent: "Create event",
        back: "Back",
        fillFields: "Please fill all fields",
        login: "Login",
        cancel: "Cancel",
        incorrectPass: "Incorrect Password",
        closeShuffle: "Close & Shuffle Pairs",
        eventClosed: "Event is Closed",
        joinExchange: "Join the Exchange",
        displayName: "Your Display Name",
        yourEmail: "Your Email",
        yourWishlist: "Your Wish",
        userPin: "Create a 4-digit PIN (Remember it!)",
        submitEntry: "Submit Entry",
        pairsMade: "Pairs are made!",
        enterEmailPin: "Enter your email and PIN to see who you are gifting to.",
        checkEmail: "Your Email",
        checkPin: "Your 4-digit PIN",
        revealTarget: "Reveal My Pair",
        assignedTo: "You are gifting to:",
        theirWish: "Their Wish",
        minTwoPeople: "Need at least 2 people!",
        matchingComplete: "Matching Complete!",
        loading: "Loading...",
        copyLink: "Link copied to clipboard",
        invalidEmail: "Invalid email",
        pinInvalid: "PIN must be 4 digits",
        pinWeak: "Choose a stronger PIN (no repeats/sequences)",
        editProfile: "Edit Profile",
        saveChanges: "Save Changes",
        removeParticipant: "Remove",
        confirmRemove: "Are you sure you want to remove",
        eventSettings: "Event Settings",
        deleteEvent: "Delete Event",
        resetParticipants: "Reset Participants",
        exportCSV: "Export CSV",
        exportJSON: "Export JSON",
        revealBlocked: "Reveal is blocked until",
        revealAt: "Reveal At (optional)",
        setDeadline: "Set Close Date/Time (optional)",
        autoMatchToggle: "Auto-match at close",
        previewMatching: "Preview Matching",
        dryRunNotice: "This is a preview and won't save until you confirm.",
        emailText: "Email",
        nameText: "Name",
        pinText: "PIN",
        wishesText: "Wishes",
        assignedToText: "Assigned to",
        actionText: "Action",
        participantsText: "Participants",
        openById: "Open Event by ID",
        enterEventId: "Enter Event ID",
        adminAccessOnlyText: "Admin access only",
        statusText: "Status",
        statusOpenText: "Open",
        statusClosedText: "Closed"
    },
    et: {
        appName: "GiftOS",
        welcome: "Tere tulemast GiftOS-i",
        tagline: "Lihtne ja töötab.",
        createEvent: "Loo uus üritus",
        enterCode: "On kutsekood? Sisesta see otse siia!",
        newEvent: "Uus üritus",
        setupEvent: "Seadista üritus",
        adminText: "Te olete administraator",
        eventName: "Uue ürituse nimi",
        hostEmail: "Administraatori e-post",
        hostPass: "Administraatori parool",
        generateEvent: "Loo üritus",
        back: "Tagasi",
        fillFields: "Palun täida kõik väljad",
        login: "Logi sisse",
        cancel: "Tühista",
        incorrectPass: "Vale parool",
        closeShuffle: "Sulge & Sega paarid",
        eventClosed: "Üritus on suletud",
        joinExchange: "Liitu",
        displayName: "Sinu nimi",
        yourEmail: "Sinu e-post",
        yourWishlist: "Sinu soov",
        userPin: "Loo 4-kohaline PIN (Jäta meelde!)",
        submitEntry: "Esita soov",
        pairsMade: "Paarid on loodud!",
        enterEmailPin: "Sisesta oma e-post ja PIN, et näha kellele kingid",
        checkEmail: "Sinu e-post",
        checkPin: "Sinu 4-kohaline PIN",
        revealTarget: "Näita kingisaajat",
        assignedTo: "Sa kingid:",
        theirWish: "Tema soov",
        minTwoPeople: "Vaja vähemalt 2 inimest!",
        matchingComplete: "Paaride määramine lõpetatud!",
        loading: "Laadimine...",
        copyLink: "Link kopeeritud lõikelauale",
        invalidEmail: "Vigane e-post",
        pinInvalid: "PIN peab olema 4 numbrit",
        pinWeak: "Vali tugevam PIN (ei tohi olla kordused/järjestused)",
        editProfile: "Muuda profiili",
        saveChanges: "Salvesta",
        removeParticipant: "Eemalda",
        confirmRemove: "Oled kindel, et soovid eemaldada?",
        eventSettings: "Ürituse sätted",
        deleteEvent: "Kustuta üritus",
        resetParticipants: "Lähtesta osalejad",
        exportCSV: "Ekspordi CSV",
        exportJSON: "Ekspordi JSON",
        revealBlocked: "Avamine on blokeeritud kuni",
        revealAt: "Avamise aeg (valikuline)",
        setDeadline: "Sea sulgemise kuupäev/kellaaeg (valikuline)",
        autoMatchToggle: "Automaatne paarimine sulgemisel",
        previewMatching: "Eelvaade paarimisest",
        dryRunNotice: "See on eelvaade ja ei salvestu enne kinnitamist.",
        emailText: "E-post",
        nameText: "Nimi",
        pinText: "PIN",
        wishesText: "Soovid",
        assignedToText: "Määratud",
        actionText: "Tegevus",
        participantsText: "Osalejad",
        openById: "Ava üritus ID-ga",
        enterEventId: "Sisesta ürituse ID",
        adminAccessOnlyText: "Ainult administraatori sissepääs",
        statusText: "Staatus",
        statusOpenText: "Lahti",
        statusClosedText: "Kinni"

    }
};


function t(key) {
    return translations[currentLang][key] || key;
}

function tTableName(index)
{
    switch (index)
    {
        case 0:
            return t('nameText');
            break;
        case 1:
            return t('emailText');
            break;
        case 2:
            return t('pinText');
            break;
        case 3:
            return t('wishesText');
            break;
        case 4:
            return t('assignedToText');
            break;
        case 5:
            return t('actionText');
            break;

    }
}


document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const saved = localStorage.getItem('darkMode') === 'true';
    if (saved) document.documentElement.classList.add('dark-mode');
    if (themeToggle) {
        themeToggle.checked = saved;
        themeToggle.addEventListener('change', (e) => {
            const on = e.target.checked;
            if (on) document.documentElement.classList.add('dark-mode');
            else document.documentElement.classList.remove('dark-mode');
            localStorage.setItem('darkMode', on);
        });
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const langSelect = document.getElementById('lang-select');
    if (langSelect) {
        langSelect.value = currentLang;
        langSelect.addEventListener('change', (e) => {
            currentLang = e.target.value;
            localStorage.setItem('lang', currentLang);
            location.reload();
        });
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const copyBtn = document.getElementById('copy-link-btn');
    const shareBtn = document.getElementById('share-btn');

    function showShareButtonsIfEvent() {
        if (!copyBtn || !shareBtn) return;

        if (!currentEventID) {
            copyBtn.style.display = 'none';
            shareBtn.style.display = 'none';
            return;
        }

        copyBtn.style.display = 'inline-block';
        shareBtn.style.display = 'inline-block';
    }

    if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
            const link = `${location.origin}${location.pathname}?event=${currentEventID}`;
            try {
                await navigator.clipboard.writeText(link);
                showToast(t('copyLink'));
            } catch {
                const tmp = document.createElement('input');
                document.body.appendChild(tmp);
                tmp.value = link;
                tmp.select();
                document.execCommand('copy');
                tmp.remove();
                showToast(t('copyLink'));
            }
        });
    }

    if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
            const link = `${location.origin}${location.pathname}?event=${currentEventID}`;

            if (navigator.share) {
                try {
                    await navigator.share({
                        title: t('appName'),
                        text: t('joinExchange'),
                        url: link
                    });
                } catch {}
            } else {
                try {
                    await navigator.clipboard.writeText(link);
                    showToast(t('copyLink'));
                } catch {}
            }
        });
    }

    showShareButtonsIfEvent();
});


function showToast(msg, timeout = 2500) {
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerText = msg;
    toastContainer.appendChild(el);
    setTimeout(() => el.classList.add('visible'), 10);
    setTimeout(() => el.classList.remove('visible'), timeout);
    setTimeout(() => el.remove(), timeout + 300);
}


document.addEventListener('DOMContentLoaded', () => {
    if (currentEventID) {
        checkEventStatus(currentEventID);
    } else {
        renderLanding();
    }
});

function renderLanding() {
    titleDiv.innerText = t('appName');
    contentDiv.innerHTML = `
        <div style="text-align: center; padding-top: 20px;">
            <h1>${t('welcome')}</h1>
            <p>${t('tagline')}</p>
            <br>

            <button onclick="renderCreateEvent()">${t('createEvent')}</button>

            <div style="margin-top: 20px;">
                <p style="font-size: 13px;">${t('enterCode')}</p>

                <input 
                    type="text" 
                    id="manualEventIdInput" 
                    placeholder="${t('enterEventId')}"
                    style="margin-top:6px; text-align:center;"
                >

                <br>

                <button 
                    id="btn-confirm"
                    style="margin-top:8px;"
                    onclick="openEventById()"
                >
                    ${t('openById')}
                </button>
            </div>

            <div id="landing-participant-count" style="margin-top:12px; font-size:14px; color:var(--muted)"></div>
        </div>
    `;
}


// Date setting for later
//        <div style="margin-top:8px;">
//            <label>${t('setDeadline')}</label><br>
//            <input type="datetime-local" id="hostCloseAt"/>
//        </div>
//        <div style="margin-top:6px;">
//            <label><input type="checkbox" id="hostAutoMatch" /> ${t('autoMatchToggle')}</label>
//        </div>

function renderCreateEvent() {
    titleDiv.innerText = t('newEvent');
    contentDiv.innerHTML = `
        <h1>${t('setupEvent')}</h1>
        <p>${t('adminText')}</p>
        <input type="text" id="hostEventName" placeholder="${t('eventName')}">
        <input type="email" id="hostEmail" placeholder="${t('hostEmail')}">
        <input type="password" id="hostPass" placeholder="${t('hostPass')}">

        <button onclick="createNewGiftEvent()">${t('generateEvent')}</button>
        <button class="secondary" onclick="renderLanding()" style="margin-top: 10px;">${t('back')}</button>
    `;
}


async function createNewGiftEvent() {
    const name = document.getElementById('hostEventName').value;
    const email = document.getElementById('hostEmail').value;
    const pass = document.getElementById('hostPass').value;

    if (!name || !email || !pass) return alert(t('fillFields'));


    const eventId = Math.random().toString(36).substring(2, 9);

    const closeVal = document.getElementById('hostCloseAt')?.value;
    const autoMatch = document.getElementById('hostAutoMatch')?.checked || false;
    const closingAt = closeVal ? new Date(closeVal) : null;

    try {
        await db.collection('events').doc(eventId).set({
            name,
            hostEmail: email,
            hostPass: pass,
            status: 'open',
            createdAt: new Date(),
            closingAt: closingAt ? closingAt : null,
            autoMatch: autoMatch
        });


        window.location.search = `?event=${eventId}`;
    } catch (error) {
        console.error(error);
        alert(t('fillFields'));
    }
}

async function checkEventStatus(eventId) {
    const docRef = db.collection('events').doc(eventId);
    const doc = await docRef.get();
    if (!doc.exists) {
        contentDiv.innerHTML = `<h1>404</h1><p>${t('fillFields')}</p><button onclick="window.location.href='index.html'">${t('back')}</button>`;
        return;
    }

    const data = doc.data();
    titleDiv.innerText = data.name;

    if (data.closingAt && data.status === 'open') {
        const closingDate = data.closingAt.toDate ? data.closingAt.toDate() : new Date(data.closingAt);
        if (Date.now() >= closingDate.getTime() && data.autoMatch) {

            try {
                await runMatchingAlgorithm(eventId, /*auto*/ true);
            } catch (e) {
                console.warn('Auto-match failed or not run', e);
            }

            const newDoc = await docRef.get();
            renderEventDashboard(newDoc.data(), eventId);
            return;
        }
    }

    renderEventDashboard(data, eventId);


    attachParticipantCountListener(eventId);
}

async function loadAdminParticipants(eventId) {
    const listDiv = document.getElementById('adminParticipantList');
    if (!listDiv) return;

    const snap = await db.collection('events')
        .doc(eventId)
        .collection('participants')
        .get();

    if (snap.empty) {
        listDiv.innerHTML = "<p>No participants yet.</p>";
        return;
    }

    let html = `<table class="admin-table">
    <thead>
        <tr>
            <th>${tTableName(0)}</th>
            <th>${tTableName(1)}</th>
            <th>${tTableName(2)}</th>
            <th>${tTableName(3)}</th>
            <th>${tTableName(4)}</th>
            <th>${tTableName(5)}</th>
        </tr>
    </thead>
    <tbody>
`;


    snap.forEach(doc => {
    const p = doc.data();
    html += `
        <tr>
            <td>${p.name}</td>
            <td>${p.email}</td>
            <td>${p.pin}</td>
            <td class="wish-list">${(p.wish || []).join('<br>')}</td>
            <td>${p.assignedTarget || '-'}</td>
            <td class="admin-action">
                <button onclick="adminRemoveParticipant('${eventId}', '${p.email}')" id="btn-cancel">
                    ${t('removeParticipant')}
                </button>
            </td>
        </tr>
    `;
});


    html += `</tbody></table>`;
    listDiv.innerHTML = html;
}

async function adminRemoveParticipant(eventId, email) {
    if (!confirm(`${t('confirmRemove')} ${email}?`)) return;

    await db.collection('events')
        .doc(eventId)
        .collection('participants')
        .doc(email)
        .delete();

    showToast(t('removeParticipant'));
    loadAdminParticipants(eventId);
}



let participantCountUnsub = null;
function attachParticipantCountListener(eventId) {
    if (participantCountUnsub) participantCountUnsub();

    const partsRef = db.collection('events').doc(eventId).collection('participants');
    participantCountUnsub = partsRef.onSnapshot(snap => {
        const count = snap.size;
 
        const landingCountEl = document.getElementById('landing-participant-count');
        if (landingCountEl) landingCountEl.innerText = `${count} participants so far`;

        const eventHeader = contentDiv.querySelector('p');
        if (eventHeader) {

        }
    });
}


function renderEventDashboard(eventData, eventId) {
    contentDiv.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
            <h1>${eventData.name}</h1>
            <div>
                <span class="admin-badge" style="cursor:pointer;" onclick="renderAdminLogin('${eventId}')">${t('login')}</span>
            </div>
        </div>
        <p>Status: <strong>${(eventData.status||'open').toUpperCase()}</strong></p>
        <hr>
    `;


    if (eventData.closingAt) {
        const closingDate = eventData.closingAt.toDate ? eventData.closingAt.toDate() : new Date(eventData.closingAt);
        contentDiv.innerHTML += `<p>${t('setDeadline')}: <strong>${closingDate.toLocaleString()}</strong></p>`;
    }
    if (eventData.revealAt) {
        const revealDate = eventData.revealAt.toDate ? eventData.revealAt.toDate() : new Date(eventData.revealAt);
        contentDiv.innerHTML += `<p>${t('revealAt')}: <strong>${revealDate.toLocaleString()}</strong></p>`;
    }

    if (eventData.status === 'open') {
        contentDiv.innerHTML += `
            <h3>${t('joinExchange')}</h3>
            <div id="joinForm">
                <input type="text" id="userName" placeholder="${t('displayName')}">
                <input type="email" id="userEmail" placeholder="${t('yourEmail')}">
                <textarea id="userWish" placeholder="${t('yourWishlist')}" rows="3"></textarea>
                <input type="text" id="userPin" placeholder="${t('userPin')}" maxlength="4">
                <button id="submitEntryBtn">${t('submitEntry')}</button>
            </div>
            <div style="margin-top:10px;"><button onclick="renderEditProfile('${eventId}')">${t('editProfile')}</button></div>
        `;

        attachJoinFormValidationListeners();
    } else {
        contentDiv.innerHTML += `
            <h3>${t('pairsMade')}</h3>
            <p>${t('enterEmailPin')}</p>
            <input type="email" id="checkEmail" placeholder="${t('checkEmail')}">
            <input type="password" id="checkPin" placeholder="${t('checkPin')}" maxlength="4">
            <button onclick="revealTarget('${eventId}')">${t('revealTarget')}</button>
            <div id="revealResult"></div>
        `;
    }


    const copyBtn = document.getElementById('copy-link-btn');
    const shareBtn = document.getElementById('share-btn');
    if (copyBtn) copyBtn.style.display = 'inline-block';
    if (shareBtn) shareBtn.style.display = 'inline-block';
}


function attachJoinFormValidationListeners() {
    const emailEl = document.getElementById('userEmail');
    const pinEl = document.getElementById('userPin');
    const submitBtn = document.getElementById('submitEntryBtn');
    if (!submitBtn) return;

    function validate() {
        const email = emailEl.value;
        const pin = pinEl.value;
        let ok = true;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) ok = false;
        if (!/^\d{4}$/.test(pin)) ok = false;
        submitBtn.disabled = !ok;
    }

    emailEl.addEventListener('input', validate);
    pinEl.addEventListener('input', (e) => {

        e.target.value = e.target.value.replace(/\D/g, '').substring(0,4);
        validate();
    });

    validate();

    submitBtn.addEventListener('click', () => {
        submitParticipant(currentEventID);
    });
}


async function submitParticipant(eventId) {
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value.toLowerCase().trim();
    const wishRaw = document.getElementById('userWish').value;
    const pin = document.getElementById('userPin').value;

    if (!name || !email || !wishRaw || pin.length < 4) return alert(`${t('fillFields')} ${t('pinInvalid')}`);


    if (!isPinStrong(pin)) return alert(t('pinWeak'));

    const wishes = wishRaw.split('\n').map(s => s.trim()).filter(Boolean);
    const participantRef = db.collection('events').doc(eventId).collection('participants').doc(email);
    const doc = await participantRef.get();
    if (doc.exists) return alert("This email already joined the event. Use Edit Profile if you need to change.");

    await participantRef.set({ name, email, wish: wishes, pin, assignedTarget: null, createdAt: new Date() });
    showToast(t('matchingComplete'));
    location.reload();
}

function isPinStrong(pin) {
    if (!/^\d{4}$/.test(pin)) return false;

    if (/^(\d)\1{3}$/.test(pin)) return false;

    const seqA = '01234567890';
    const seqB = '9876543210';
    if (seqA.includes(pin) || seqB.includes(pin)) return false;
    return true;
}

function renderEditProfile(eventId) {
    contentDiv.innerHTML = `
        <h1>${t('editProfile')}</h1>
        <p>Enter your email and PIN to edit your entry.</p>
        <input type="email" id="editEmail" placeholder="${t('yourEmail')}">
        <input type="password" id="editPin" placeholder="${t('userPin')}" maxlength="4">
        <button onclick="loadProfileForEdit('${eventId}')">${t('login')}</button>
        <button class="secondary" onclick="location.reload()" style="margin-top:10px;">${t('cancel')}</button>
    `;
}

async function loadProfileForEdit(eventId) {
    const email = document.getElementById('editEmail').value.toLowerCase().trim();
    const pin = document.getElementById('editPin').value;
    if (!email || pin.length < 4) return alert(`${t('fillFields')} ${t('pinInvalid')}`);

    const participantRef = db.collection('events').doc(eventId).collection('participants').doc(email);
    const doc = await participantRef.get();
    if (!doc.exists) return alert(t('incorrectPass'));
    const data = doc.data();
    if (data.pin !== pin) return alert(t('incorrectPass'));

    contentDiv.innerHTML = `
        <h1>${t('editProfile')}</h1>
        <input type="text" id="editName" value="${data.name}" placeholder="${t('displayName')}">
        <textarea id="editWish" rows="3">${data.wish.join('\n')}</textarea>
        <button onclick="saveProfileChanges('${eventId}', '${email}')">${t('saveChanges')}</button>
        <button class="secondary" onclick="renderEventDashboard({status:'open', name:''}, '${eventId}')" style="margin-top:10px;">${t('cancel')}</button>
    `;
}

async function saveProfileChanges(eventId, email) {
    const name = document.getElementById('editName').value;
    const wishRaw = document.getElementById('editWish').value;
    const wishes = wishRaw.split('\n').map(s => s.trim()).filter(Boolean);
    if (!name || wishes.length === 0) return alert(t('fillFields'));

    const participantRef = db.collection('events').doc(eventId).collection('participants').doc(email);
    await participantRef.update({ name, wish: wishes });
    showToast(t('saveChanges'));
    location.reload();
}

////////////////////////////////////
// Render admin panel event ////////
////////////////////////////////////
function renderAdminPanel(eventId, eventData) {
    contentDiv.innerHTML = `
        <h1>${t('eventSettings')}</h1>

        <hr>
        <h2>${t('participantsText')}</h2>

        <div id="adminParticipantList">${t('loading')}</div>

        <hr>

        <button onclick="runMatchingAlgorithm('${eventId}')" id="btn-confirm">${t('closeShuffle')}</button>
        <button onclick="resetParticipants('${eventId}')" id="btn-cancel">${t('resetParticipants')}</button>
        <button onclick="deleteEvent('${eventId}')" id="btn-cancel">${t('deleteEvent')}</button>

        <hr>


        

        <br><br>
        <button class="secondary" onclick="location.reload()">${t('back')}</button>
    `;


    loadAdminParticipants(eventId);
}

// Add this when necessary right after last <hr> element
//
//        <button onclick="exportCSV('${eventId}')">${t('exportCSV')}</button>
//        <button onclick="exportJSON('${eventId}')">${t('exportJSON')}</button>
//
// Add this as well for when date setting should come
//
//        <h3>${t('revealAt')}</h3>
//        <input type="datetime-local" id="revealTimeInput">
//        <button onclick="setRevealTime('${eventId}')">${t('saveChanges')}</button>


async function runMatchingAlgorithm(eventId, auto = false) {
    const ref = db.collection('events').doc(eventId);
    const snap = await ref.collection('participants').get();

    if (snap.size < 2) return alert(t('minTwoPeople'));

    let participants = snap.docs.map(d => d.data());

    for (let i = participants.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [participants[i], participants[j]] = [participants[j], participants[i]];
    }

    for (let i = 0; i < participants.length; i++) {
        const giver = participants[i];
        const receiver = participants[(i + 1) % participants.length];

        await ref.collection('participants')
            .doc(giver.email)
            .update({ assignedTarget: receiver.email });
    }

    await ref.update({ status: 'closed' });

    if (!auto) showToast(t('matchingComplete'));
    location.reload();
}

function renderAdminLogin(eventId) {
    contentDiv.innerHTML = `
        <h1>${t('login')}</h1>
        <p>${t('adminAccessOnlyText')}</p>
        <input type="password" id="adminPassInput" placeholder="${t('hostPass')}">
        <button onclick="adminLogin('${eventId}')">${t('login')}</button>
        <button class="secondary" onclick="location.reload()" style="margin-top:10px;">${t('cancel')}</button>
    `;
}






async function adminLogin(eventId) {
    const inputPass = document.getElementById('adminPassInput').value;
    if (!inputPass) return alert(t('fillFields'));

    const docRef = db.collection('events').doc(eventId);
    const doc = await docRef.get();
    if (!doc.exists) return alert("Event not found");

    const data = doc.data();
    if (data.hostPass !== inputPass) return alert(t('incorrectPass'));

    renderAdminPanel(eventId, data);
}



async function setRevealTime(eventId) {
    const val = document.getElementById('revealTimeInput').value;
    if (!val) return alert(t('fillFields'));

    await db.collection('events').doc(eventId).update({
        revealAt: new Date(val)
    });

    showToast(t('saveChanges'));
}

async function resetParticipants(eventId) {
    if (!confirm("Reset ALL participants?")) return;
    const ref = db.collection('events').doc(eventId);
    const snap = await ref.collection('participants').get();

    for (const doc of snap.docs) {
        await doc.ref.delete();
    }

    await ref.update({ status: 'open' });
    location.reload();
}

async function deleteEvent(eventId) {
    if (!confirm("DELETE this event PERMANENTLY?")) return;

    const ref = db.collection('events').doc(eventId);
    const snap = await ref.collection('participants').get();
    for (const doc of snap.docs) await doc.ref.delete();

    await ref.delete();
    location.href = "index.html";
}

async function exportJSON(eventId) {
    const snap = await db.collection('events').doc(eventId).collection('participants').get();
    const data = snap.docs.map(d => d.data());

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = "participants.json";
    a.click();
}

async function exportCSV(eventId) {
    const snap = await db.collection('events').doc(eventId).collection('participants').get();
    const rows = snap.docs.map(d => {
        const p = d.data();
        return `"${p.name}","${p.email}","${p.wish.join('|')}","${p.assignedTarget || ''}"`;
    });

    const csv = "Name,Email,Wish,AssignedTo\n" + rows.join("\n");
    const blob = new Blob([csv], { type: "text/csv" });

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = "participants.csv";
    a.click();
}

async function openEventById() {
    const input = document.getElementById('manualEventIdInput');
    if (!input) return;

    const eventId = input.value.trim();

    if (!eventId) {
        alert(t('fillFields'));
        return;
    }

    try {
        const docRef = db.collection('events').doc(eventId);
        const doc = await docRef.get();

        if (!doc.exists) {
            alert("Event not found");
            return;
        }

        window.location.search = `?event=${eventId}`;

    } catch (e) {
        console.error("Failed to open event by ID:", e);
        alert("Failed to open event.");
    }
}

async function revealTarget(eventId) {
    const email = document.getElementById('checkEmail').value.toLowerCase().trim();
    const pin = document.getElementById('checkPin').value;

    if (!email || pin.length < 4) {
        alert(`${t('fillFields')} ${t('pinInvalid')}`);
        return;
    }

    const eventRef = db.collection('events').doc(eventId);
    const eventDoc = await eventRef.get();

    if (!eventDoc.exists) {
        alert("Event not found");
        return;
    }

    const eventData = eventDoc.data();

    if (eventData.revealAt) {
        const revealDate = eventData.revealAt.toDate
            ? eventData.revealAt.toDate()
            : new Date(eventData.revealAt);

        if (Date.now() < revealDate.getTime()) {
            alert(`${t('revealBlocked')} ${revealDate.toLocaleString()}`);
            return;
        }
    }

    const participantRef = eventRef.collection('participants').doc(email);
    const doc = await participantRef.get();

    if (!doc.exists) {
        alert(t('incorrectPass'));
        return;
    }

    const data = doc.data();

    if (data.pin !== pin) {
        alert(t('incorrectPass'));
        return;
    }

    if (!data.assignedTarget) {
        alert("Matching not completed yet.");
        return;
    }

    const targetRef = eventRef.collection('participants').doc(data.assignedTarget);
    const targetDoc = await targetRef.get();

    if (!targetDoc.exists) {
        alert("Assigned target not found.");
        return;
    }

    const targetData = targetDoc.data();

    const resultDiv = document.getElementById('revealResult');
    if (!resultDiv) return;

    resultDiv.innerHTML = `
        <div class="pair-reveal">
            <p>${t('assignedTo')}</p>
            <h1>${targetData.name}</h1>
            <p><strong>${t('theirWish')}:</strong></p>
            <p>${targetData.wish.join('<br>')}</p>
        </div>
    `;
}


