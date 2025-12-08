// main.js
// --- Global State ---
const urlParams = new URLSearchParams(window.location.search);
const currentEventID = urlParams.get('event');
const contentDiv = document.getElementById('app-content');
const titleDiv = document.getElementById('page-title');
const toastContainer = document.getElementById('toast-container');

let currentLang = localStorage.getItem('lang') || 'et';

// --- Translations (added keys used by new UI) ---
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
        yourWishlist: "Your Wish (one per line)",
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
        matchingComplete: "Matching Complete! Users can now login to see their target.",
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
        dryRunNotice: "This is a preview and won't save until you confirm."
    },
    et: {
        appName: "GiftOS",
        welcome: "Tere tulemast GiftOS-i",
        tagline: "Lihtne ja toimiv.",
        createEvent: "Loo uus üritus",
        enterCode: "On kutsekood? Sisesta see otse aadressiribale",
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
        yourWishlist: "Sinu soov (üks rida = üks soov)",
        userPin: "Loo 4-kohaline PIN (Jäta meelde!)",
        submitEntry: "Esita soov",
        pairsMade: "Paarid on loodud!",
        enterEmailPin: "Sisesta oma e-post ja PIN, et näha, kellele kingid",
        checkEmail: "Sinu e-post",
        checkPin: "Sinu 4-kohaline PIN",
        revealTarget: "Näita kingisaajat",
        assignedTo: "Sa kingid:",
        theirWish: "Tema soov",
        minTwoPeople: "Vaja vähemalt 2 inimest!",
        matchingComplete: "Paaride määramine lõpetatud! Saate nüüd logida sisse ja näha, kellele kingi teete.",
        loading: "Laadimine...",
        copyLink: "Ling kopeeritud lõikelauale",
        invalidEmail: "Vigane e-post",
        pinInvalid: "PIN peab olema 4 numbrit",
        pinWeak: "Vali tugevam PIN (ei tohi olla kordused/järjestused)",
        editProfile: "Muuda profiili",
        saveChanges: "Salvesta",
        removeParticipant: "Eemalda",
        confirmRemove: "Oled kindel, et soovid eemaldada",
        eventSettings: "Ürituse seaded",
        deleteEvent: "Kustuta üritus",
        resetParticipants: "Lähtesta osalejad",
        exportCSV: "Ekspordi CSV",
        exportJSON: "Ekspordi JSON",
        revealBlocked: "Avamine on blokeeritud kuni",
        revealAt: "Avamise aeg (valikuline)",
        setDeadline: "Sea sulgemise kuupäev/kellaaeg (valikuline)",
        autoMatchToggle: "Automaatne paarimine sulgemisel",
        previewMatching: "Eelvaade paarimisest",
        dryRunNotice: "See on eelvaade ja ei salvestu enne kinnitamist."
    }
};

// --- Helper function to get translation ---
function t(key) {
    return translations[currentLang][key] || key;
}

// --- Theme handling ---
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

// --- Language switcher listener ---
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

// --- Share / Copy link buttons ---
document.addEventListener('DOMContentLoaded', () => {
    const copyBtn = document.getElementById('copy-link-btn');
    const shareBtn = document.getElementById('share-btn');

    function showShareButtonsIfEvent() {
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
            } catch (e) {
                // fallback
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
                    await navigator.share({ title: t('appName'), text: t('joinExchange'), url: link });
                } catch (err) {
                    // user canceled or error
                }
            } else {
                // fallback to copy
                try { await navigator.clipboard.writeText(link); showToast(t('copyLink')); } catch(e){}
            }
        });
    }

    showShareButtonsIfEvent();
});

// --- Utility: toasts ---
function showToast(msg, timeout = 2500) {
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerText = msg;
    toastContainer.appendChild(el);
    setTimeout(() => el.classList.add('visible'), 10);
    setTimeout(() => el.classList.remove('visible'), timeout);
    setTimeout(() => el.remove(), timeout + 300);
}

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    if (currentEventID) {
        checkEventStatus(currentEventID);
    } else {
        renderLanding();
        // keep live count on landing for featured events
        // nothing else required
    }
});

// --- Landing Page ---
function renderLanding() {
    titleDiv.innerText = t('appName');
    contentDiv.innerHTML = `
        <div style="text-align: center; padding-top: 20px;">
            <h1>${t('welcome')}</h1>
            <p>${t('tagline')}</p>
            <br>
            <button onclick="renderCreateEvent()">${t('createEvent')}</button>
            <div style="margin-top: 15px;">
                <p style="font-size: 13px;">${t('enterCode')}</p>
            </div>
            <div id="landing-participant-count" style="margin-top:12px; font-size:14px; color:var(--muted)"></div>
        </div>
    `;

    // show total participants across events? Instead we show a live count for currentEventID only when present.
}

// --- Create Event (Host) ---
function renderCreateEvent() {
    titleDiv.innerText = t('newEvent');
    contentDiv.innerHTML = `
        <h1>${t('setupEvent')}</h1>
        <p>${t('adminText')}</p>
        <input type="text" id="hostEventName" placeholder="${t('eventName')}">
        <input type="email" id="hostEmail" placeholder="${t('hostEmail')}">
        <input type="password" id="hostPass" placeholder="${t('hostPass')}">
        <div style="margin-top:8px;">
            <label>${t('setDeadline')}</label><br>
            <input type="datetime-local" id="hostCloseAt"/>
        </div>
        <div style="margin-top:6px;">
            <label><input type="checkbox" id="hostAutoMatch" /> ${t('autoMatchToggle')}</label>
        </div>
        <button onclick="createNewGiftEvent()">${t('generateEvent')}</button>
        <button class="secondary" onclick="renderLanding()" style="margin-top: 10px;">${t('back')}</button>
    `;
}

// --- Create Event ---
async function createNewGiftEvent() {
    const name = document.getElementById('hostEventName').value;
    const email = document.getElementById('hostEmail').value;
    const pass = document.getElementById('hostPass').value;

    if (!name || !email || !pass) return alert(t('fillFields'));

    // eventId consistent with previous generation approach
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

        // navigate into event
        window.location.search = `?event=${eventId}`;
    } catch (error) {
        console.error(error);
        alert(t('fillFields')); // fallback
    }
}

// --- Check Event Status ---
async function checkEventStatus(eventId) {
    const docRef = db.collection('events').doc(eventId);
    const doc = await docRef.get();
    if (!doc.exists) {
        contentDiv.innerHTML = `<h1>404</h1><p>${t('fillFields')}</p><button onclick="window.location.href='index.html'">${t('back')}</button>`;
        return;
    }

    const data = doc.data();
    titleDiv.innerText = data.name;

    // If event has a closingAt and it's past and event is still 'open',
    // optionally auto-run matching if autoMatch is enabled.
    if (data.closingAt && data.status === 'open') {
        const closingDate = data.closingAt.toDate ? data.closingAt.toDate() : new Date(data.closingAt);
        if (Date.now() >= closingDate.getTime() && data.autoMatch) {
            // attempt to perform matching once by a client; this will call the same matching logic used by admin button.
            // We don't require host password for auto-match to avoid needing backend; it's the host's choice to enable it.
            try {
                await runMatchingAlgorithm(eventId, /*auto*/ true);
            } catch (e) {
                console.warn('Auto-match failed or not run', e);
            }
            // refresh doc
            const newDoc = await docRef.get();
            renderEventDashboard(newDoc.data(), eventId);
            return;
        }
    }

    renderEventDashboard(data, eventId);

    // set up live participant count for this event
    attachParticipantCountListener(eventId);
}

// --- Live participant count (updates landing counter or event header) ---
let participantCountUnsub = null;
function attachParticipantCountListener(eventId) {
    if (participantCountUnsub) participantCountUnsub();

    const partsRef = db.collection('events').doc(eventId).collection('participants');
    participantCountUnsub = partsRef.onSnapshot(snap => {
        const count = snap.size;
        // update event header or landing marker
        const landingCountEl = document.getElementById('landing-participant-count');
        if (landingCountEl) landingCountEl.innerText = `${count} participants so far`;
        // If on event page, update small indicator
        const eventHeader = contentDiv.querySelector('p');
        if (eventHeader) {
            // replace status line if present
            // (we re-render dashboard thoroughly when needed, so this is just best-effort)
        }
    });
}

// --- Event Dashboard ---
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

    // Show closing / reveal info
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

    // update share buttons shown earlier
    const copyBtn = document.getElementById('copy-link-btn');
    const shareBtn = document.getElementById('share-btn');
    if (copyBtn) copyBtn.style.display = 'inline-block';
    if (shareBtn) shareBtn.style.display = 'inline-block';
}

// --- Attach validation listeners for join form ---
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
        // numeric-only enforcement
        e.target.value = e.target.value.replace(/\D/g, '').substring(0,4);
        validate();
    });

    validate();

    submitBtn.addEventListener('click', () => {
        submitParticipant(currentEventID);
    });
}

// --- Submit Participant ---
async function submitParticipant(eventId) {
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value.toLowerCase().trim();
    const wishRaw = document.getElementById('userWish').value;
    const pin = document.getElementById('userPin').value;

    if (!name || !email || !wishRaw || pin.length < 4) return alert(`${t('fillFields')} ${t('pinInvalid')}`);

    // pin strength checks
    if (!isPinStrong(pin)) return alert(t('pinWeak'));

    const wishes = wishRaw.split('\n').map(s => s.trim()).filter(Boolean); // store as array
    const participantRef = db.collection('events').doc(eventId).collection('participants').doc(email);
    const doc = await participantRef.get();
    if (doc.exists) return alert("This email already joined the event. Use Edit Profile if you need to change."); // friendlier than fillFields

    await participantRef.set({ name, email, wish: wishes, pin, assignedTarget: null, createdAt: new Date() });
    showToast(t('matchingComplete'));
    location.reload();
}

// --- PIN strength helper ---
function isPinStrong(pin) {
    if (!/^\d{4}$/.test(pin)) return false;
    // disallow repeats like 0000, 1111
    if (/^(\d)\1{3}$/.test(pin)) return false;
    // disallow sequences 0123 1234 4321 etc.
    const seqA = '01234567890';
    const seqB = '9876543210';
    if (seqA.includes(pin) || seqB.includes(pin)) return false;
    return true;
}

// --- Edit Profile (participant self-edit) ---
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
    if (!email || pin.length < 4) {
    return alert(t('fillFields'));
}