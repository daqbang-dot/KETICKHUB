document.addEventListener('DOMContentLoaded', () => {
    const ideaForm = document.getElementById('idea-form');
    const ideaGrid = document.getElementById('idea-grid');

    // Load data lama dari DB
    const savedIdeas = KETICK_DB.get('ideas');
    savedIdeas.forEach(idea => renderIdea(idea));

    function renderIdea(data) {
        const div = document.createElement('div');
        div.className = 'bg-[#1E293B] border border-slate-700/50 rounded-lg p-5 shadow-lg transition-all';
        div.innerHTML = `
            <h3 class="font-mono text-amber-400 font-semibold">${data.name}</h3>
            <p class="text-sm text-slate-400 mb-4">${data.desc}</p>
            <div class="text-xs font-mono text-slate-500">Target: RM ${data.fund}</div>
        `;
        ideaGrid.prepend(div);
    }

    ideaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newIdea = {
            name: document.getElementById('input-name').value,
            desc: document.getElementById('input-desc').value,
            fund: document.getElementById('input-fund').value || '0'
        };

        KETICK_DB.save('ideas', newIdea); // SIMPAN KE DB
        renderIdea(newIdea);
        ideaForm.reset();
    });
});
