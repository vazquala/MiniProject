const SUPABASE_URL = "https://cfpcraawckozzryynteb.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcGNyYWF3Y2tvenpyeXludGViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0MDQ5OTQsImV4cCI6MjA5MTk4MDk5NH0.T_iB24IHz_stoCgh4pVuOjzospkgDr1IpTlbuJxFF0g";
const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function loadEntries() {
    const {data, error} = await db
        .from('movies')
        .select('*')
        .order('created_at', {ascending: false});

    if (error) {
        console.error(error);
        return;
    }

    let html = "";
    data.forEach(entry => {
        html += `<div class="entry">
                      <strong>${entry.name}'s favorite</strong>
                      <p>${entry.message}</p>
                      
                </div>`
    });
    document.querySelector('#entries').innerHTML = html;
}

document.querySelector("#guest-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const nameValue = document.querySelector("#name-input").value;
    const msgValue = document.querySelector("#msg-input").value;

    const {error} = await db
        .from('movies')
        .insert([{name : nameValue, message : msgValue}]);

    if (error) {
        alert("Error:" + error.message);
        return;
    }

    document.querySelector("#name-input").value = "";
    document.querySelector("#msg-input").value = "";

    loadEntries();
});

loadEntries();