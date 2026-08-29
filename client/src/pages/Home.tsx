// Design: Neon Operacional adaptado à referência — login compacto, aviso de manutenção e validação real via Sasarinha Manager.
import { FormEvent, useEffect, useMemo, useState } from "react";
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
const managerUrl = (import.meta.env.VITE_KEY_MANAGER_API_URL as string | undefined)?.replace(/\/$/, "") ?? "";
const OFFLINE_MESSAGE = "Keys pausadas para manutenção. Tenha paciência, a Sasarinha Mods está trabalhando.";

export default function Home() {
  const [managerOnline, setManagerOnline] = useState<boolean | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [active, setActive] = useState<Record<string, boolean>>({});
  const [notice, setNotice] = useState("Aguardando uma ação do operador");
  const activeCount = useMemo(() => Object.values(active).filter(Boolean).length, [active]);

  useEffect(() => {
    let cancelled = false;
    async function checkManager() {
      if (!managerUrl) { setManagerOnline(null); return; }
      try {
        const response = await fetch(`${managerUrl}/api/trpc/appStatus`, { headers: { accept: "application/json" } });
        if (!response.ok) throw new Error("status");
        const payload = await response.json();
        const online = payload?.result?.data?.json?.isOnline ?? payload?.result?.data?.isOnline;
        if (!cancelled) setManagerOnline(typeof online === "boolean" ? online : null);
      } catch { if (!cancelled) setManagerOnline(null); }
    }
    checkManager();
    const timer = window.setInterval(checkManager, 30000);
    return () => { cancelled = true; window.clearInterval(timer); };
  }, []);

  async function validateKey(event: FormEvent) {
    event.preventDefault();
    setError("");
    if (!managerUrl) { setError("O sistema de keys ainda não está conectado ao site."); return; }
    try {
      const response = await fetch(`${managerUrl}/api/trpc/access.loginWithKey`, { method: "POST", headers: { "content-type": "application/json", accept: "application/json" }, body: JSON.stringify({ accessKey: key.trim(), appVersion: "1.1.1" }) });
      const payload = await response.json().catch(() => null);
      if (!response.ok) throw new Error(payload?.error?.json?.message ?? payload?.error?.message ?? "Key inválida ou indisponível.");
      setLoggedIn(true);
      setNotice("Key validada e acesso autorizado nesta sessão");
    } catch (validationError) {
      setError(validationError instanceof Error ? validationError.message : "Não foi possível validar a key.");
    }
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

  if (!loggedIn) return <main className="auth-screen"><div className="galaxy-bg" aria-hidden="true" />{managerOnline === false && <OfflineBanner ownerAccess />}
    <section className="login-box" aria-labelledby="login-title"><div className="login-brand"><img src="/manus-storage/sarinha-mark_265ada7f.png" alt="" /><span>SARINHA<br /><b>PROXY</b></span></div><div className="auth-divider" /><div className="vip-heading"><LockKeyhole size={16} /><span>ACESSO PRIVADO</span></div><h1 id="login-title">Entre no<br /><em>seu painel.</em></h1><p className="auth-copy">Digite sua key para continuar.</p><form onSubmit={validateKey}><label className="sr-only" htmlFor="key-input">Key de acesso</label><input id="key-input" className="key-input" value={key} onChange={(event) => setKey(event.target.value)} placeholder="INSIRA SUA KEY AQUI..." autoComplete="off" /><button className="login-button" type="submit"><LogIn size={17} /> ENTRAR NO PAINEL</button></form>{error && <p className="auth-error" role="alert">{error}</p>}<p className="auth-footnote">Validação segura pelo Sasarinha Manager.</p></section>
  </main>;

  return <main className="dashboard-screen"><div className="galaxy-bg" aria-hidden="true" />{managerOnline === false && <OfflineBanner ownerAccess />}
    <header className="dashboard-header"><div className="dashboard-brand"><div className="dashboard-mark"><img src="/manus-storage/sarinha-mark_265ada7f.png" alt="" /></div><div><span>SARINHA</span><strong>PROXY</strong></div></div><div className="session-state"><i /> SESSION ACTIVE <span>·</span> {String(activeCount).padStart(2, "0")} ACTIVE</div></header>
    <section className="dashboard-intro"><span className="eyebrow">CONTROL PANEL / PRIVATE ACCESS</span><h1>Configuração<br /><em>de recursos.</em></h1><p>Selecione um módulo para ajustar o estado da sessão local.</p></section>
    <section className="panel" aria-label="Painel de recursos"><FeatureSection title="Headshot Systems" icon={<Target size={16} />} features={features.filter((item) => item.group === "headshot")} active={active} onToggle={toggleFeature} /><FeatureSection title="Advanced Injection" icon={<Cpu size={16} />} features={features.filter((item) => item.group === "injection")} active={active} onToggle={toggleFeature} /></section>
    <footer className="dashboard-footer"><div><Radio size={14} /><span>{notice}</span></div><span>{managerOnline === false ? "OFFLINE · KEYS PAUSADAS" : "KEY VALIDADA · LOCAL JSON"}</span><b>v2.0.0</b></footer>
  </main>;
}

function OfflineBanner({ ownerAccess }: { ownerAccess: boolean }) { return <aside className="offline-banner" role="status"><strong>OFFLINE</strong><p>{OFFLINE_MESSAGE}</p>{ownerAccess && <p>O acesso do dono continua disponível.</p>}</aside>; }
function FeatureSection({ title, icon, features, active, onToggle }: { title: string; icon: React.ReactNode; features: Feature[]; active: Record<string, boolean>; onToggle: (feature: Feature) => void }) { return <div className="feature-section"><div className="section-title">{icon}<span>{title}</span><small>{features.length.toString().padStart(2, "0")} MODULES</small></div>{features.map((feature) => { const Icon = feature.icon; return <button type="button" className={`feature-card ${active[feature.id] ? "active" : ""}`} key={feature.id} onClick={() => onToggle(feature)}><span className="feature-info"><Icon size={18} /><span>{feature.name}</span></span><span className={`mini-switch ${active[feature.id] ? "on" : ""}`}><span /></span></button>; })}</div>; }
