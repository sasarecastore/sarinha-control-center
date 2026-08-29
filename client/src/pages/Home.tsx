// Design: Neon Operacional — neo-brutalismo digital, magenta pulso, ciano de telemetria, geometria técnica e movimento curto.
import { useMemo, useState } from "react";
import { Activity, ArrowUpRight, ChevronRight, CircleHelp, Gauge, Radio, ShieldCheck, Zap } from "lucide-react";

const modules = [
  {
    id: "hs_rage",
    name: "Auto Headshot (Rage)",
    description: "Assistência de mira de alta resposta",
    code: "HS-RG / 01",
    tone: "magenta",
  },
  {
    id: "antena_longa",
    name: "Antena Longa",
    description: "Alcance estendido de sinal local",
    code: "ANT-L / 02",
    tone: "cyan",
  },
];

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (value: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={`switch ${checked ? "switch-on" : ""}`}
      onClick={() => onChange(!checked)}
    >
      <span className="switch-knob" />
    </button>
  );
}

export default function Home() {
  const [active, setActive] = useState<Record<string, boolean>>({ hs_rage: false, antena_longa: false });
  const [lastAction, setLastAction] = useState("Sistema pronto para operar");

  const activeCount = useMemo(() => Object.values(active).filter(Boolean).length, [active]);
  const health = activeCount === 2 ? "Estável" : activeCount === 1 ? "Monitorado" : "Em espera";

  function toggleFeature(id: string, value: boolean) {
    setActive((current) => ({ ...current, [id]: value }));
    const module = modules.find((item) => item.id === id);
    setLastAction(`${module?.name ?? "Recurso"} ${value ? "ativado" : "desativado"}`);
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand-lockup">
          <div className="brand-mark" aria-hidden="true"><img src="/manus-storage/sarinha-mark_265ada7f.png" alt="" /></div>
          <div><span className="eyebrow">SARINHA</span><strong>CONTROL<br />CENTER</strong></div>
        </div>
        <div className="sidebar-rule" />
        <nav className="side-nav" aria-label="Navegação principal">
          <a className="nav-item active" href="#overview"><Activity size={16} /> Visão geral <ChevronRight size={14} /></a>
          <a className="nav-item" href="#modules"><Zap size={16} /> Recursos <span className="nav-count">02</span></a>
          <a className="nav-item" href="#telemetry"><Radio size={16} /> Telemetria <span className="nav-count">LIVE</span></a>
        </nav>
        <div className="sidebar-bottom">
          <div className="profile-chip"><span className="profile-dot" /><div><span className="eyebrow">OPERADOR</span><b>Sarinha local</b></div></div>
          <span className="version">BUILD 1.0.0 / LOCAL</span>
        </div>
      </aside>

      <section className="workspace" id="overview">
        <header className="topbar">
          <div><span className="eyebrow">PAINEL DE OPERAÇÕES / 28 AGO 2026</span><h1>Controle o sinal.<br /><em>Leia o estado.</em></h1></div>
          <div className="topbar-status"><span className="pulse-dot" /> <span>SESSÃO LOCAL</span><span className="status-divider" /><span className="mono">00:04:28</span></div>
        </header>

        <div className="hero-grid">
          <section className="signal-card">
            <img className="signal-art" src="/manus-storage/sarinha-control-room_6ff2a984.png" alt="" />
            <div className="signal-overlay" />
            <div className="signal-copy"><span className="eyebrow cyan-text">SINAL PRINCIPAL / 01</span><h2>Canal de operação<br /><span>em escuta.</span></h2><p>Ative os módulos abaixo para alterar o estado desta sessão local.</p></div>
            <div className="signal-footer"><span className="mono">LAT 12.04 / LON 45.12</span><span className="live-label"><span className="pulse-dot cyan" /> LIVE FEED</span></div>
          </section>
          <section className="health-card" id="telemetry">
            <div className="section-heading"><span className="eyebrow">SAÚDE DO SISTEMA</span><Gauge size={18} /></div>
            <div className="health-value"><strong>{health}</strong><span className="health-ring"><span>{activeCount}<small>/02</small></span></span></div>
            <div className="health-bar"><span style={{ width: `${Math.max(12, activeCount * 50)}%` }} /></div>
            <div className="health-meta"><span>RECURSOS ATIVOS</span><b>{String(activeCount).padStart(2, "0")}</b></div>
            <div className="health-meta"><span>LATÊNCIA LOCAL</span><b>12 MS</b></div>
          </section>
        </div>

        <section className="module-section" id="modules">
          <div className="module-heading"><div><span className="eyebrow magenta-text">MÓDULOS / 02</span><h2>Recursos disponíveis</h2></div><span className="module-caption">Toque para ativar<br />ou pausar um recurso.</span></div>
          <div className="module-list">
            {modules.map((module, index) => (
              <article className={`module-row ${active[module.id] ? "is-active" : ""} ${module.tone}`} key={module.id} style={{ animationDelay: `${index * 80}ms` }}>
                <div className="module-index">0{index + 1}</div>
                <div className="module-icon">{module.tone === "magenta" ? <Zap size={20} /> : <Radio size={20} />}</div>
                <div className="module-info"><h3>{module.name}</h3><p>{module.description}</p></div>
                <span className="module-code mono">{module.code}</span>
                <Toggle checked={Boolean(active[module.id])} onChange={(value) => toggleFeature(module.id, value)} label={`${active[module.id] ? "Desativar" : "Ativar"} ${module.name}`} />
                <span className="state-label">{active[module.id] ? "ATIVO" : "OFF"}</span>
              </article>
            ))}
          </div>
        </section>

        <footer className="activity-footer">
          <div className="activity-log"><span className="activity-icon"><ShieldCheck size={16} /></span><div><span className="eyebrow">ÚLTIMA ATIVIDADE</span><p>{lastAction}</p></div></div>
          <div className="footer-note"><CircleHelp size={15} /> <span>Os estados são armazenados apenas nesta sessão.</span></div>
          <a className="footer-link" href="#overview">DOCUMENTAÇÃO <ArrowUpRight size={14} /></a>
        </footer>
      </section>
    </main>
  );
}
