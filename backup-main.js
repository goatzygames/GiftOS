// /source/main.js

// --- Global State ---
const urlParams = new URLSearchParams(window.location.search);
const currentEventID = urlParams.get('event');
const contentDiv = document.getElementById('app-content');
const titleDiv = document.getElementById('page-title');

// --- Translations ---
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
        matchingComplete: "Matching Complete! Users can now login to see their target.",
        loading: "Loading..."
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
        yourWishlist: "Sinu soov",
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
        loading: "Laadimine..."
    }
};

// --- Current language ---
let currentLang = localStorage.getItem('lang') || 'et';

// --- Helper function to get translation ---
function t(key) {
    return translations[currentLang][key] || key;
}

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

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    if (currentEventID) {
        checkEventStatus(currentEventID);
    } else {
        renderLanding();
    }
});

// --- View: Landing Page ---
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
        </div>
    `;
}

// --- View: Create Event (Host) ---
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

// --- Create Event ---
async function createNewGiftEvent() {
    const name = document.getElementById('hostEventName').value;
    const email = document.getElementById('hostEmail').value;
    const pass = document.getElementById('hostPass').value;

    if (!name || !email || !pass) return alert(t('fillFields'));

    const eventId = Math.random().toString(36).substring(2, 9);

    try {
        await db.collection('events').doc(eventId).set({
            name,
            hostEmail: email,
            hostPass: pass,
            status: 'open',
            createdAt: new Date()
        });

        window.location.search = `?event=${eventId}`;
    } catch (error) {
        console.error(error);
        alert(t('fillFields')); // fallback
    }
}

// --- Check Event Status ---
async function checkEventStatus(eventId) {
    const doc = await db.collection('events').doc(eventId).get();
    if (!doc.exists) {
        contentDiv.innerHTML = `<h1>404</h1><p>${t('fillFields')}</p><button onclick="window.location.href='index.html'">${t('back')}</button>`;
        return;
    }

    const data = doc.data();
    titleDiv.innerText = data.name;
    renderEventDashboard(data, eventId);
}

// --- Event Dashboard ---
function renderEventDashboard(eventData, eventId) {
    contentDiv.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
            <h1>${eventData.name}</h1>
            <span class="admin-badge" style="cursor:pointer;" onclick="renderAdminLogin('${eventId}')">${t('login')}</span>
        </div>
        <p>Status: <strong>${eventData.status.toUpperCase()}</strong></p>
        <hr>
    `;

    if (eventData.status === 'open') {
        contentDiv.innerHTML += `
            <h3>${t('joinExchange')}</h3>
            <div id="joinForm">
                <input type="text" id="userName" placeholder="${t('displayName')}">
                <input type="email" id="userEmail" placeholder="${t('yourEmail')}">
                <textarea id="userWish" placeholder="${t('yourWishlist')}" rows="3"></textarea>
                <input type="text" id="userPin" placeholder="${t('userPin')}" maxlength="4">
                <button onclick="submitParticipant('${eventId}')">${t('submitEntry')}</button>
            </div>
        `;
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
}

// --- Submit Participant ---
async function submitParticipant(eventId) {
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value.toLowerCase().trim();
    const wish = document.getElementById('userWish').value;
    const pin = document.getElementById('userPin').value;

    if (!name || !email || !wish || pin.length < 4) return alert(`${t('fillFields')} PIN must be 4 digits.`);

    const participantRef = db.collection('events').doc(eventId).collection('participants').doc(email);
    const doc = await participantRef.get();
    if (doc.exists) return alert(t('fillFields'));

    await participantRef.set({ name, email, wish, pin, assignedTarget: null });
    alert(t('matchingComplete'));
    location.reload();
}

// --- Admin Login ---
function renderAdminLogin(eventId) {
    contentDiv.innerHTML = `
        <h1>${t('login')}</h1>
        <input type="password" id="adminPassInput" placeholder="${t('hostPass')}">
        <button onclick="verifyAdmin('${eventId}')">${t('login')}</button>
        <button class="secondary" onclick="location.reload()" style="margin-top:10px;">${t('cancel')}</button>
    `;
}

async function verifyAdmin(eventId) {
    const pass = document.getElementById('adminPassInput').value;
    const doc = await db.collection('events').doc(eventId).get();

    if (doc.data().hostPass === pass) {
        renderAdminPanel(eventId, doc.data());
    } else {
        alert(t('incorrectPass'));
    }
}

// --- Admin Panel ---
async function renderAdminPanel(eventId, eventData) {
    const snapshot = await db.collection('events').doc(eventId).collection('participants').get();
    const participants = snapshot.docs.map(d => d.data());

    contentDiv.innerHTML = `
        <h1>${t('login')}</h1>
        <div class="card">
            <p><strong>${t('displayName')}:</strong> ${participants.length}</p>
            <p><strong>Status:</strong> ${eventData.status}</p>
        </div>

        <h3>${t('displayName')}</h3>
        <div style="max-height: 200px; overflow-y: scroll; background: rgba(255,255,255,0.4); padding: 10px; border-radius: 8px; margin-bottom: 20px;">
            ${participants.map(p => `<div>• ${p.name} (${p.email})</div>`).join('')}
        </div>

        ${eventData.status === 'open' 
            ? `<button class="danger" onclick="runMatchingAlgorithm('${eventId}')">${t('closeShuffle')}</button>` 
            : `<button class="secondary" disabled>${t('eventClosed')}</button>`
        }
    `;
}

// --- Matching Algorithm ---
async function runMatchingAlgorithm(eventId) {
    if (!confirm(t('closeShuffle'))) return;

    const eventRef = db.collection('events').doc(eventId);
    const partsSnapshot = await eventRef.collection('participants').get();
    let parts = partsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    if (parts.length < 2) return alert(t('minTwoPeople'));

    for (let i = parts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [parts[i], parts[j]] = [parts[j], parts[i]];
    }

    const batch = db.batch();
    for (let i = 0; i < parts.length; i++) {
        const giver = parts[i];
        const receiver = parts[(i + 1) % parts.length];
        const giverRef = eventRef.collection('participants').doc(giver.id);
        batch.update(giverRef, { assignedTarget: { name: receiver.name, wish: receiver.wish } });
    }

    batch.update(eventRef, { status: 'matched' });
    await batch.commit();
    alert(t('matchingComplete'));
    location.reload();
}

// --- Reveal Target ---
async function revealTarget(eventId) {
    const email = document.getElementById('checkEmail').value.toLowerCase().trim();
    const pin = document.getElementById('checkPin').value;
    const resultDiv = document.getElementById('revealResult');

    if (!email || !pin) return;

    const doc = await db.collection('events').doc(eventId).collection('participants').doc(email).get();
    if (!doc.exists) return alert(t('fillFields'));

    const data = doc.data();
    if (data.pin !== pin) return alert(t('incorrectPass'));
    if (!data.assignedTarget) return alert(t('pairsMade'));

    resultDiv.innerHTML = `
        <div class="pair-reveal">
            <h2>${t('assignedTo')}</h2>
            <h1 style="color:var(--accent);">${data.assignedTarget.name}</h1>
            <p><strong>${t('theirWish')}:</strong><br>${data.assignedTarget.wish}</p>
        </div>
    `;
}
