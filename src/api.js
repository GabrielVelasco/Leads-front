const API_BASE = 'https://leads-mng-fadxajdpe2hfajg3.brazilsouth-01.azurewebsites.net';

export async function getLeads() {
    const res = await fetch(`${API_BASE}/leads/`);
    if (!res.ok) throw new Error('Falha ao buscar leads');
    return res.json();
}

export async function createLead(data) {
    const res = await fetch(`${API_BASE}/leads/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const error = await res.json();
        throw error;
    }
    return res.json();
}

export async function getLeadById(id) {
    const res = await fetch(`${API_BASE}/leads/${id}/`);
    if (!res.ok) {
        const error = await res.json();
        throw error;
    }
    return res.json();
}
