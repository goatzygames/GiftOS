
// /source/main.js

// --- Global State ---
const urlParams = new URLSearchParams(window.location.search);
const currentEventID = urlParams.get('event');
const contentDiv = document.getElementById('app-content');
const titleDiv = document.getElementById('page-title');

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
    titleDiv.innerText = "GiftOS";
    contentDiv.innerHTML = `
        <div style="text-align: center; padding-top: 20px;">
            <h1>Welcome to GiftOS</h1>
            <p>The privacy-focused, clean way to manage Secret Santa events.</p>
            <br>
            <button onclick="renderCreateEvent()">Create New Event</button>
            <div style="margin-top: 15px;">
                <p style="font-size: 13px;">Have an invite code? Enter the URL directly.</p>
            </div>
        </div>
    `;
}

// --- View: Create Event (Host) ---
function renderCreateEvent() {
    titleDiv.innerText = "New Event";
    contentDiv.innerHTML = `
        <h1>Setup Event</h1>
        <p>You will be the administrator.</p>
        <input type="text" id="hostEventName" placeholder="Event Name (e.g. Office Party)">
        <input type="email" id="hostEmail" placeholder="Your Email (Admin Login)">
        <input type="password" id="hostPass" placeholder="Create Admin Password">
        <button onclick="createNewGiftEvent()">Generate Event Space</button>
        <button class="secondary" onclick="renderLanding()" style="margin-top: 10px;">Back</button>
    `;
}

async function createNewGiftEvent() {
    const name = document.getElementById('hostEventName').value;
    const email = document.getElementById('hostEmail').value;
    const pass = document.getElementById('hostPass').value;

    if (!name || !email || !pass) return alert("Please fill all fields");

    // Create a random Event ID
    const eventId = Math.random().toString(36).substring(2, 9);

    try {
        await db.collection('events').doc(eventId).set({
            name: name,
            hostEmail: email,
            hostPass: pass,
            status: 'open', // open, matched
            createdAt: new Date()
        });
        
        // Redirect to the new event
        window.location.search = `?event=${eventId}`;
    } catch (error) {
        console.error(error);
        alert("Error creating event");
    }
}

// --- Logic: Check Event Status ---
async function checkEventStatus(eventId) {
    const doc = await db.collection('events').doc(eventId).get();
    if (!doc.exists) {
        contentDiv.innerHTML = `<h1>404</h1><p>Event not found.</p><button onclick="window.location.href='index.html'">Go Home</button>`;
        return;
    }
    
    const data = doc.data();
    titleDiv.innerText = data.name;
    
    // Determine which view to show
    renderEventDashboard(data, eventId);
}

// --- View: Event Dashboard (User & Admin Entry) ---
function renderEventDashboard(eventData, eventId) {
    contentDiv.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
            <h1>${eventData.name}</h1>
            <span class="admin-badge" style="cursor:pointer;" onclick="renderAdminLogin('${eventId}')">Host Admin</span>
        </div>
        <p>Status: <strong>${eventData.status.toUpperCase()}</strong></p>
        <hr>
    `;

    if (eventData.status === 'open') {
        contentDiv.innerHTML += `
            <h3>Join the Exchange</h3>
            <div id="joinForm">
                <input type="text" id="userName" placeholder="Your Display Name">
                <input type="email" id="userEmail" placeholder="Your Email">
                <textarea id="userWish" placeholder="Your Wishlist (be specific!)" rows="3"></textarea>
                <input type="text" id="userPin" placeholder="Create a 4-digit PIN (Important!)" maxlength="4">
                <button onclick="submitParticipant('${eventId}')">Submit Entry</button>
            </div>
        `;
    } else {
        contentDiv.innerHTML += `
            <h3>Pairs are set!</h3>
            <p>Enter your email and PIN to see who you are gifting to.</p>
            <input type="email" id="checkEmail" placeholder="Your Email">
            <input type="password" id="checkPin" placeholder="Your 4-digit PIN" maxlength="4">
            <button onclick="revealTarget('${eventId}')">Reveal My Target</button>
            <div id="revealResult"></div>
        `;
    }
}

// --- Logic: Submit Participant ---
async function submitParticipant(eventId) {
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value.toLowerCase().trim();
    const wish = document.getElementById('userWish').value;
    const pin = document.getElementById('userPin').value;

    if (!name || !email || !wish || pin.length < 4) return alert("Please fill all fields. PIN must be 4 digits.");

    const participantRef = db.collection('events').doc(eventId).collection('participants').doc(email);
    
    const doc = await participantRef.get();
    if (doc.exists) return alert("This email is already registered!");

    await participantRef.set({
        name, email, wish, pin,
        assignedTarget: null // Will be filled later
    });

    alert("You are in! Come back later when the host closes the event.");
    location.reload();
}

// --- View: Admin Login ---
function renderAdminLogin(eventId) {
    contentDiv.innerHTML = `
        <h1>Host Login</h1>
        <input type="password" id="adminPassInput" placeholder="Enter Host Password">
        <button onclick="verifyAdmin('${eventId}')">Login</button>
        <button class="secondary" onclick="location.reload()" style="margin-top:10px;">Cancel</button>
    `;
}

async function verifyAdmin(eventId) {
    const pass = document.getElementById('adminPassInput').value;
    const doc = await db.collection('events').doc(eventId).get();
    
    if (doc.data().hostPass === pass) {
        renderAdminPanel(eventId, doc.data());
    } else {
        alert("Incorrect Password");
    }
}

// --- View: Admin Panel (The Fun Stuff) ---
async function renderAdminPanel(eventId, eventData) {
    // Fetch all participants
    const snapshot = await db.collection('events').doc(eventId).collection('participants').get();
    const participants = snapshot.docs.map(d => d.data());

    contentDiv.innerHTML = `
        <h1>Admin Control</h1>
        <div class="card">
            <p><strong>Participants:</strong> ${participants.length}</p>
            <p><strong>Status:</strong> ${eventData.status}</p>
        </div>

        <h3>Participants List</h3>
        <div style="max-height: 200px; overflow-y: scroll; background: rgba(255,255,255,0.4); padding: 10px; border-radius: 8px; margin-bottom: 20px;">
            ${participants.map(p => `<div>• ${p.name} (${p.email})</div>`).join('')}
        </div>

        ${eventData.status === 'open' 
            ? `<button class="danger" onclick="runMatchingAlgorithm('${eventId}')">🎲 Close & Shuffle Pairs</button>` 
            : `<button class="secondary" disabled>Event is Closed</button>`
        }
    `;
}

// --- Logic: Hamiltonian Path Shuffle (The Core) ---
async function runMatchingAlgorithm(eventId) {
    if (!confirm("This will close submissions and assign pairs irrevokably. Continue?")) return;

    const eventRef = db.collection('events').doc(eventId);
    const partsSnapshot = await eventRef.collection('participants').get();
    let parts = partsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    if (parts.length < 2) return alert("Need at least 2 people!");

    // 1. Fisher-Yates Shuffle
    for (let i = parts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [parts[i], parts[j]] = [parts[j], parts[i]];
    }

    // 2. Hamiltonian Path Assignment (Chain)
    // P[0] -> P[1] -> P[2] ... -> P[last] -> P[0]
    const batch = db.batch();

    for (let i = 0; i < parts.length; i++) {
        const giver = parts[i];
        const receiver = parts[(i + 1) % parts.length]; // Wraps around to 0 at the end

        const giverRef = eventRef.collection('participants').doc(giver.id);
        
        batch.update(giverRef, {
            assignedTarget: {
                name: receiver.name,
                wish: receiver.wish
            }
        });
    }

    // Update Event Status
    batch.update(eventRef, { status: 'matched' });

    await batch.commit();
    alert("Matching Complete! Users can now login to see their target.");
    location.reload();
}

// --- Logic: Reveal Target (User Side) ---
async function revealTarget(eventId) {
    const email = document.getElementById('checkEmail').value.toLowerCase().trim();
    const pin = document.getElementById('checkPin').value;
    const resultDiv = document.getElementById('revealResult');

    if (!email || !pin) return;

    const doc = await db.collection('events').doc(eventId).collection('participants').doc(email).get();

    if (!doc.exists) return alert("Email not found");
    const data = doc.data();

    if (data.pin !== pin) return alert("Incorrect PIN");

    if (!data.assignedTarget) return alert("Host hasn't matched pairs yet!");

    resultDiv.innerHTML = `
        <div class="pair-reveal">
            <h2>You are gifting to:</h2>
            <h1 style="color:var(--accent);">${data.assignedTarget.name}</h1>
            <p><strong>Their Wish:</strong><br>${data.assignedTarget.wish}</p>
        </div>
    `;
}