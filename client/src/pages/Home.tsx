// Design: Neon Operacional — referência atualizada com acesso VIP, painel central compacto e controles roxos de alto contraste.
import { FormEvent, useMemo, useState } from "react";
import { ArrowUpCircle, Crosshair, Cpu, Eye, Layers, LockKeyhole, LogIn, MousePointer2, Radio, Target, Zap } from "lucide-react";

type Feature = { id: string; name: string; icon: typeof Zap; group: "headshot" | "injection" };

const features: Feature[] = [
  { id: "hs_rage", name: "HS Pescoço Rage", icon: Zap, group: "headshot" },
  { id: "hs_pescoco", name: "HS Pescoço", icon: Crosshair, group: "headshot" },
  { id: "hs_alto", name: "HS Alto", icon: ArrowUpCircle, group: "headshot" },
  { id: "hs_combo", name: "HS Alto + Pescoço", icon: Layers, group: "headshot" },
  { id: "aimbot", name: "Aimbot (Direct Head)", icon: Eye, group: "injection" },
  { id: "aim_assist", name: "Aim Assist (Suave)", icon: MousePointer2, group: "injection" },
];

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [active, setActive] = useState<Record<string, boolean>>({});
  const [notice, setNotice] = useState("Aguardando uma ação do operador");
  const activeCount = useMemo(() => Object.values(active).filter(Boolean).length, [active]);

  function validateKey(event: FormEvent) {
    event.preventDefault();
    if (key.trim() === "ADMIN123") {
      setError("");
      setLoggedIn(true);
      setNotice("Acesso VIP autorizado nesta sessão");
    } else setError("Key inválida. Solicite acesso ao administrador.");
  }

  function toggleFeature(feature: Feature) {
    const nextValue = !active[feature.id];
    setActive((current) => {
      const next = { ...current, [feature.id]: nextValue };
      if (nextValue && feature.group === "headshot") features.filter((item) => item.group === "headshot" && item.id !== feature.id).forEach((item) => { next[item.id] = false; });
      if (nextValue && feature.id === "aimbot") features.filter((item) => item.group === "headshot").forEach((item) => { next[item.id] = false; });
      return next;
    });
    setNotice(`${feature.name} ${nextValue ? "ativado" : "desativado"} · configuração local`);
  }

  if (!loggedIn) return (
    <main className="auth-screen">
      <div className="galaxy-bg" aria-hidden="true" />
      <section className="login-box" aria-labelledby="login-title">
        <div className="login-brand"><img src="/manus-storage/sarinha-mark_265ada7f.png" alt="" /><span>SARINHA<br /><b>PROXY</b></span></div>
        <div className="auth-divider" />
        <div className="vip-heading"><LockKeyhole size={16} /><span>ACESSO VIP</span></div>
        <h1 id="login-title">Entre no<br /><em>seu painel.</em></h1>
        <p className="auth-copy">Insira sua chave de acesso para abrir o centro de controle.</p>
        <form onSubmit={validateKey}>
          <label className="sr-only" htmlFor="key-input">Chave de acesso</label>
          <input id="key-input" className="key-input" value={key} onChange={(event) => setKey(event.target.value)} placeholder="INSIRA SUA KEY AQUI..." autoComplete="off" />
          <button className="login-button" type="submit"><LogIn size={17} /> ENTRAR NO PAINEL</button>
        </form>
        {error && <p className="auth-error" role="alert">{error}</p>}
        <p className="auth-footnote">A chave de demonstração local é <span>ADMIN123</span>.</p>
      </section>
    </main>
  );

  return (
    <main className="dashboard-screen">
      <div className="galaxy-bg" aria-hidden="true" />
      <header className="dashboard-header">
        <div className="dashboard-brand"><div className="dashboard-mark"><img src="/manus-storage/sarinha-mark_265ada7f.png" alt="" /></div><div><span>SARINHA</span><strong>PROXY</strong></div></div>
        <div className="session-state"><i /> SESSION ACTIVE <span>·</span> {String(activeCount).padStart(2, "0")} ACTIVE</div>
      </header>
      <section className="dashboard-intro"><span className="eyebrow">CONTROL PANEL / VIP ACCESS</span><h1>Configuração<br /><em>de recursos.</em></h1><p>Selecione um módulo para ajustar o estado da sessão local.</p></section>
      <section className="panel" aria-label="Painel de recursos">
        <FeatureSection title="Headshot Systems" icon={<Target size={16} />} features={features.filter((item) => item.group === "headshot")} active={active} onToggle={toggleFeature} />
        <FeatureSection title="Advanced Injection" icon={<Cpu size={16} />} features={features.filter((item) => item.group === "injection")} active={active} onToggle={toggleFeature} />
      </section>
      <footer className="dashboard-footer"><div><Radio size={14} /><span>{notice}</span></div><span>SYNC PENDING · LOCAL JSON</span><b>v2.0.0</b></footer>
    </main>
  );
}

function FeatureSection({ title, icon, features, active, onToggle }: { title: string; icon: React.ReactNode; features: Feature[]; active: Record<string, boolean>; onToggle: (feature: Feature) => void }) {
  return <div className="feature-section"><div className="section-title">{icon}<span>{title}</span><small>{features.length.toString().padStart(2, "0")} MODULES</small></div>{features.map((feature) => { const Icon = feature.icon; return <button type="button" className={`feature-card ${active[feature.id] ? "active" : ""}`} key={feature.id} onClick={() => onToggle(feature)}><span className="feature-info"><Icon size={18} /><span>{feature.name}</span></span><span className={`mini-switch ${active[feature.id] ? "on" : ""}`}><span /></span></button>; })}</div>;
}
