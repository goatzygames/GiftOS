
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
        editProfile: "Edit profile",
        editProfileSubText: " ",
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
        statusClosedText: "Closed",
        logoutText: "Log out",
        gotoAdminPanelText: "Go to Admin view",
        eventIsClosedText: "Event is closed!",
        eventIsOpenText: "Event is open!"
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
        editProfile: "Muuda profiili", // Updated from "Muuda profiili" to "Logi sisse" for consistency with "Log in"
        editProfileSubText: " ", // Added
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
        statusClosedText: "Kinni",
        logoutText: "Logi välja",
        gotoAdminPanelText: "Mine Adminni vaatesse",
        eventIsClosedText: "Üritus on lõppenud!",
        eventIsOpenText: "Üritus on veel lahti!"

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
        checkCurrentUser();
    } else {
        renderLanding();
    }
});

function renderLanding() {
    
    const idPart = currentEventID ? ` -- ${currentEventID}` : '';
    const appNameWithID = `${t('appName')}${idPart}`;

    // guard DOM nodes
    if (titleDiv) titleDiv.innerText = appNameWithID;
    if (!contentDiv) return;

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
                    style="margin-top:6px; text-align:center;">

                <br>

                <button 
                    id="btn-confirm"
                    style="margin-top:8px;"
                    onclick="openEventById()">
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

    attachParticipantCountListener(eventId);

    // Renders the generic dashboard first
    renderEventDashboard(data, eventId);

    // NOW checks if we know the user, passing the status (open/closed)
    checkCurrentUser(data.status); 

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
            <td style="display:flex; align-items:center; gap:8px;">
    <img 
    src="${p.avatarUrl || `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(p.email)}`}" 
    style="width:32px;height:32px;border-radius:50%;object-fit:cover;">

            ${p.name}
            </td>

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


// --- Start of added global variable ---
let globalEventHostEmail = null;
// --- End of added global variable ---

function renderEventDashboard(eventData, eventId) {
    // --- Start of Host Email update and Title change ---
    globalEventHostEmail = eventData.hostEmail; // Store host email globally for later check
    
    // Clear the original title bar and use the content area for a big title
    titleDiv.innerText = t('appName'); 
    // --- End of Host Email update and Title change ---

    contentDiv.innerHTML = `
        <div style="text-align: center; margin-bottom: 25px;">
            <h1 style="font-size: 36px; margin-bottom: 5px;">${eventData.name}</h1>
            <h2 style="margin-bottom: 5px;">${eventID}</h2>
            <p>Status: <strong>${(eventData.status||'open').toUpperCase()}</strong></p>
        </div>
        <hr>
    `;

    // The rest of the content remains the same...
    
    if (eventData.closingAt) {
        const closingDate = eventData.closingAt.toDate ? eventData.closingAt.toDate() : new Date(eventData.closingAt);
        contentDiv.innerHTML += `<p>${t('setDeadline')}: <strong>${closingDate.toLocaleString(currentLang)}</strong></p>`;
    }
    if (eventData.revealAt) {
        const revealDate = eventData.revealAt.toDate ? eventData.revealAt.toDate() : new Date(eventData.revealAt);
        contentDiv.innerHTML += `<p>${t('revealAt')}: <strong>${revealDate.toLocaleString(currentLang)}</strong></p>`;
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
            <div style="margin-top:10px;"><button class="secondary" onclick="renderEditProfile('${eventId}')">${t('login')}</button></div>
        `;

        attachJoinFormValidationListeners();
    } else {
        contentDiv.innerHTML += `
            <h3>${t('pairsMade')}</h3>
            <p>${t('enterEmailPin')}</p>
            <br>
            <div style="margin-top:10px;"><button class="secondary" onclick="renderEditProfile('${eventId}')">${t('login')}</button></div>
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


    if (!name || !email || !wishRaw || pin.length < 4)
        return alert(`${t('fillFields')} ${t('pinInvalid')}`);

    if (!isPinStrong(pin)) return alert(t('pinWeak'));

    const participantRef = db.collection('events')
        .doc(eventId)
        .collection('participants')
        .doc(email);

    const doc = await participantRef.get();
    if (doc.exists)
        return alert("This email already joined the event.");

    const avatarSeed = email + eventId;
    const avatarUrl = `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(avatarSeed)}`;

    const wishes = wishRaw.split('\n').map(s => s.trim()).filter(Boolean);

    await participantRef.set({
        name,
        email,
        wish: wishes,
        pin,
        assignedTarget: null,
        avatarUrl: avatarUrl,
        createdAt: new Date()
    });

    // Save login info locally
    localStorage.setItem('giftOS_currentUser', JSON.stringify({
        eventId,
        email,
        pin
    }));

    showToast(t('matchingComplete'));
    location.reload();

}

function renderParticipantDashboard(eventId, participantData, eventStatus, isAdmin = false) {
    const contentDiv = document.getElementById('app-content');
    
    let actionButtons = '';
    let adminButton = '';

    // --- Start of Admin Button Logic ---
    if (isAdmin) {
        adminButton = `
            <div style="margin-top: 15px; border-top: 1px solid rgba(0,0,0,0.1); padding-top: 15px;">
                <button onclick="renderAdminPanel('${eventId}', {})" class="danger">
                    ${t('gotoAdminPanelText')}
                </button>
            </div>
        `;
    }
    // --- End of Admin Button Logic ---

    if (eventStatus === 'open') {
        actionButtons = `
            <div style="background: rgba(0,0,0,0.05); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <p><strong>${t('statusText')}:</strong> ${t('eventIsOpenText')}</p>
                <button onclick="enableDirectEditMode('${eventId}', '${participantData.email}')" style="width:100%">${t('editProfile')}</button>
            </div>
        `;
    } else {
        actionButtons = `
             <div style="background: var(--primary-color); color: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <p style="margin-bottom:10px;">${t('eventIsClosedText')}</p>
                <button 
                    onclick="revealTargetDirectly('${eventId}', '${participantData.email}', '${participantData.pin}')" 
                    style="background: white; color: black; font-weight: bold; width:100%; border:none;">
                    ${t('revealTarget')}
                </button>
            </div>
        `;
    }

    // Note: The big event name is now handled by renderEventDashboard which runs first.
    contentDiv.innerHTML = `
        <div style="text-align: center; animation: fadeIn 0.5s;">
            <div style="position: relative; display: inline-block;" class="avatar-interactive">
                <img src="${participantData.avatarUrl}" 
                    style="width:120px; height:120px; border-radius:50%; object-fit:cover; border: 4px solid var(--accent); box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                <div style="position: absolute; bottom: 5px; right: 5px; background: white; border-radius: 50%; padding: 5px;">
                    🟢
                </div>
            </div>
            
            <h2 style="margin-top: 15px;">Hello, ${participantData.name}!</h2>
            <p style="color: var(--text-secondary); margin-bottom: 20px;">${participantData.email}</p>

            ${actionButtons}

            <details style="text-align: left; margin-bottom: 20px; border: 1px solid #ccc; padding: 10px; border-radius: 8px;" class="fade-in-up">
                <summary style="cursor: pointer; font-weight: bold;">${t('yourWishlist')}</summary>
                <ul style="margin-top: 10px; padding-left: 20px;">
                    ${participantData.wish.map(w => `<li>${w}</li>`).join('')}
                </ul>
            </details>

            ${adminButton}

            <br>
            
            <button class="secondary" onclick="logoutCurrentUser()">${t('logoutText')}</button>
        </div>
    `;
}


async function checkCurrentUser(eventStatus = 'open') {
    const userData = JSON.parse(localStorage.getItem('giftOS_currentUser'));
    if (!userData) return;

    const { eventId, email, pin } = userData;

    if (currentEventID !== eventId) return;

    const participantRef = db.collection('events')
        .doc(eventId)
        .collection('participants')
        .doc(email);

    const doc = await participantRef.get();
    
    if (!doc.exists || doc.data().pin !== pin) {
        localStorage.removeItem('giftOS_currentUser');
        return;
    }

    // --- Start of Admin Check ---
    const isAdmin = email === globalEventHostEmail;
    // --- End of Admin Check ---

    const data = doc.data();
    // Pass the isAdmin flag to the dashboard renderer
    renderParticipantDashboard(eventId, data, eventStatus, isAdmin);
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
        <p>${t('editProfileSubText')}</p>
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
    
    // --- START OF FIX: Successful login redirects to Participant Dashboard ---

    // 1. Save login info locally
    localStorage.setItem('giftOS_currentUser', JSON.stringify({
        eventId,
        email,
        pin
    }));

    // 2. Fetch event data to get status and host email for admin check
    const eventDoc = await db.collection('events').doc(eventId).get();
    const eventData = eventDoc.data();
    
    // 3. Determine if the user is the admin
    const isAdmin = email === eventData.hostEmail;

    // 4. Render the participant dashboard
    renderParticipantDashboard(eventId, data, eventData.status, isAdmin);

    // Show a success toast, since they just authenticated
    showToast(t('login')); 
    
    // --- END OF FIX ---


    // Old code (kept for reference, but now commented/deleted):
    /*
    contentDiv.innerHTML = `
        <h1>${t('editProfile')}</h1>
        <input type="text" id="editName" value="${data.name}" placeholder="${t('displayName')}">
        <textarea id="editWish" rows="3">${data.wish.join('\n')}</textarea>
        <button onclick="saveProfileChanges('${eventId}', '${email}')">${t('saveChanges')}</button>
        <button class="secondary" onclick="renderEventDashboard({status:'open', name:''}, '${eventId}')" style="margin-top:10px;">${t('cancel')}</button>
    `;
    */
}

async function saveProfileChanges(eventId, email) {
    const name = document.getElementById('editName').value;
    const wishRaw = document.getElementById('editWish').value;

    const wishes = wishRaw.split('\n').map(s => s.trim()).filter(Boolean);
    if (!name || wishes.length === 0) return alert(t('fillFields'));

    const participantRef = db.collection('events')
        .doc(eventId)
        .collection('participants')
        .doc(email);

    let updateData = { name, wish: wishes };

    await participantRef.update(updateData);

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
            <img 
    src="${targetData.avatarUrl || 'default-avatar.png'}" 
    style="width:80px;height:80px;border-radius:50%;object-fit:cover;margin-bottom:8px;"
>

<h1>${targetData.name}</h1>

            <p><strong>${t('theirWish')}:</strong></p>
            <p>${targetData.wish.join('<br>')}</p>
        </div>
    `;

    triggerConfetti();
}

function logoutCurrentUser() {
    localStorage.removeItem('giftOS_currentUser');
    location.reload();
}

async function revealTargetDirectly(eventId, email, pin) {
    const contentDiv = document.getElementById('app-content');
    contentDiv.innerHTML = `<h3>${t('loading')}</h3>`;

    const eventRef = db.collection('events').doc(eventId);
    const eventDoc = await eventRef.get();
    
    // 1. Check Event Timers (Reveal Block)
    const eventData = eventDoc.data();
    if (eventData.revealAt) {
        const revealDate = eventData.revealAt.toDate ? eventData.revealAt.toDate() : new Date(eventData.revealAt);
        if (Date.now() < revealDate.getTime()) {
            location.reload(); // Reload to show dashboard again
            return alert(`${t('revealBlocked')} ${revealDate.toLocaleString()}`);
        }
    }

    // 2. Get Participant Data
    const pRef = eventRef.collection('participants').doc(email);
    const pDoc = await pRef.get();
    const me = pDoc.data();

    // 3. Security Check
    if (me.pin !== pin) {
        alert(t('incorrectPass'));
        location.reload();
        return;
    }

    // 4. Get Target Data
    if (!me.assignedTarget) {
         contentDiv.innerHTML = `<h3>Error</h3><p>No target assigned yet. Ask admin to shuffle pairs.</p><button onclick="location.reload()">${t('back')}</button>`;
         return;
    }

    const targetDoc = await eventRef.collection('participants').doc(me.assignedTarget).get();
    const target = targetDoc.data();

    // 5. Render The Big Reveal (With Avatars!)
    contentDiv.innerHTML = `
        <div style="text-align: center;">
            <h1>${t('assignedTo')}</h1>
            
            <div style="margin: 30px 0;">
                <img src="${target.avatarUrl}" 
                     style="width:150px; height:150px; border-radius:50%; object-fit:cover; border: 5px solid #FFD700; animation: popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
                <h2 style="font-size: 2em; margin-top: 15px; color: var(--primary-color);">${target.name}</h2>
            </div>

            <div style="background: rgba(0,0,0,0.03); padding: 20px; border-radius: 10px; text-align: left;">
                <h3 style="border-bottom: 1px solid #ccc; padding-bottom: 10px;">${t('theirWish')}</h3>
                <ul style="font-size: 1.1em; line-height: 1.6;">
                    ${target.wish.map(w => `<li>${w}</li>`).join('')}
                </ul>
            </div>

            <br>
            <button onclick="location.reload()">${t('back')}</button>
        </div>
        
        <style>
            @keyframes popIn {
                0% { transform: scale(0); opacity: 0; }
                100% { transform: scale(1); opacity: 1; }
            }
        </style>
    `;

    triggerConfetti();
}

async function enableDirectEditMode(eventId, email) {
    const contentDiv = document.getElementById('app-content');
    contentDiv.innerHTML = `<h3>${t('loading')}</h3>`;

    // Fetch fresh data to ensure we don't overwrite with old local data
    const docRef = db.collection('events').doc(eventId).collection('participants').doc(email);
    const doc = await docRef.get();
    
    if (!doc.exists) {
        alert("User not found");
        return location.reload();
    }

    const data = doc.data();

    contentDiv.innerHTML = `
        <h1>${t('editProfile')}</h1>
        
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:20px; justify-content:center;">
             <img src="${data.avatarUrl}" style="width:50px; height:50px; border-radius:50%;">
             <span style="color:var(--muted);">${data.email}</span>
        </div>

        <input type="text" id="editName" value="${data.name}" placeholder="${t('displayName')}">
        <textarea id="editWish" rows="5" placeholder="${t('yourWishlist')}">${data.wish.join('\n')}</textarea>
        
        <button onclick="saveProfileChanges('${eventId}', '${email}')">${t('saveChanges')}</button>
        
        <button class="secondary" onclick="location.reload()" style="margin-top:10px;">${t('cancel')}</button>
    `;
}


function triggerConfetti() {

    const numPieces = 25; 
    const colors = ['#ff3b30', '#ff9500', '#ffcc00', '#4cd964', '#5ac8fa', '#007aff', '#ff2d55'];
    const container = document.createElement('div');
    container.className = 'confetti-container';
    document.body.appendChild(container);

    const createBurst = (side) => {
        for (let i = 0; i < numPieces; i++) {
            const piece = document.createElement('div');
            piece.className = 'confetti-piece';
            
            piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            piece.style.setProperty('--burst-offset', (Math.random() * 50) + 'vw');
            piece.style.setProperty('--burst-angle', (Math.random() * 90 - 45) + 'deg');
            piece.style.animationDuration = (Math.random() * 0.5 + 1.2) + 's';
            piece.style.animationDelay = (Math.random() * 0.2) + 's';

            if (side === 'left') {
                piece.classList.add('confetti-left-burst');
                piece.style.left = '0';
            } else {
                piece.classList.add('confetti-right-burst');
                piece.style.right = '0';
            }
            container.appendChild(piece);
        }
    }

    createBurst('left');
    createBurst('right');

    // Cleanup after animation ends (faster cleanup time)
    setTimeout(() => {
        container.remove();
    }, 2000); // Remove container after 2 seconds
}

/**
 * Renders the final result card with the target's name, avatar, and wishes.
 * @param {object} targetData - The full data object of the target participant.
 * @param {string} giverName - The name of the current user (giver).
 * @param {string} eventId - The event ID.
 */
function renderRevealResult(targetData, giverName, eventId) {
    const contentDiv = document.getElementById('app-content');
    
    // Set a consistent default avatar if URL is missing
    const avatarUrl = targetData.avatarUrl || `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(targetData.email)}`;
    
    // Clear the whole content area for a dramatic reveal
    contentDiv.innerHTML = `
        <div class="pair-reveal reveal-card">
            <h1 style="font-size: 24px;">🎉 ${t('assignedTo')} ${targetData.name}! 🎉</h1>
            
            <div style="margin: 20px 0; display: flex; flex-direction: column; align-items: center;">
                <img src="${avatarUrl}" 
                     style="width: 150px; height: 150px; border-radius: 50%; object-fit: cover; border: 5px solid var(--accent); margin-bottom: 15px;"
                     onerror="this.src='https://avatars.dicebear.com/api/identicon/${encodeURIComponent(me.email)}.svg';">
                <h3 style="color: var(--text-primary); margin: 0;">${targetData.name}</h3>
                <p style="color: var(--text-secondary); margin: 5px 0 0 0;">${targetData.email}</p>
            </div>

            <details style="text-align: left; margin-bottom: 20px; border: 1px solid #ddd; padding: 10px; border-radius: 8px; background: white;">
                <summary style="cursor: pointer; font-weight: bold; color: var(--text-primary);">${t('theirWish')}</summary>
                <ul style="margin-top: 10px; padding-left: 20px; list-style-type: none;">
                    ${targetData.wish.map(w => `<li style="margin-bottom: 5px;">${w}</li>`).join('')}
                </ul>
            </details>
            
            <button class="secondary" onclick="logoutCurrentUser()">${t('logoutText')}</button>
        </div>
    `;
    
    // Trigger confetti animation on successful reveal
    if (typeof triggerConfetti === 'function') {
        triggerConfetti();
    }
}



