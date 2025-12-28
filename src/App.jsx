import { useState, useEffect } from 'react';
import { getLeads, createLead } from './api';

export default function App() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    try {
      setLoading(true);
      const data = await getLeads();
      setLeads(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar leads');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const newLead = await createLead(form);
      setLeads([...leads, newLead]);
      setForm({ name: '', email: '', phone: '' });
    } catch (err) {
      if (err.detail) {
        setError(err.detail.map(d => d.msg).join(', '));
      } else {
        setError('Erro ao criar lead');
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container">
      <h1>Leads Manager</h1>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Nome"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="tel"
          placeholder="Telefone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
        />
        <button type="submit" disabled={submitting}>
          {submitting ? 'Salvando...' : 'Adicionar Lead'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {/* Lista de Leads */}
      {loading ? (
        <p>Carregando...</p>
      ) : leads.length === 0 ? (
        <p>Nenhum lead cadastrado.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
