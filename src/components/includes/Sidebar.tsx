import { NavLink } from 'react-router';
import { Moon, Sun } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { Text, useLanguage } from '../../containers/Language';
import { navItems } from '../../nav';
import { useTheme } from '../../hooks';

function ThemeToggle({ dark, toggle }: ReturnType<typeof useTheme>) {
  const { t } = useLanguage();
  return (
    <button
      onClick={toggle}
      aria-label={t('theme_toggle')}
      title={t('theme_toggle')}
      className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-full bg-white/5 text-white/70 ring-1 ring-white/10 transition hover:rotate-12 hover:text-white"
    >
      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}

export function Sidebar() {
  const theme = useTheme();

  return (
    <>
      {/* Desktop: the classic left rail */}
      <aside className="sticky top-0 z-20 hidden h-dvh w-60 shrink-0 flex-col bg-ink px-4 py-6 text-white md:flex">
        <NavLink to="/" className="group mb-10 flex items-center gap-3 px-2">
          <span className="grid size-10 place-items-center rounded-xl bg-linear-to-br from-sky to-deep font-black tracking-tighter shadow-lg shadow-deep/40 transition group-hover:rotate-6">
            PdR
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-bold">Pedro del Río</span>
            <span className="block font-mono text-[11px] text-white/40">@pedelriomarron</span>
          </span>
        </NavLink>

        <nav>
          <ul className="flex flex-col gap-1">
            {navItems.map(({ text, url, icon: Icon, color }) => (
              <li key={url}>
                <NavLink
                  end
                  to={url}
                  style={{ '--c': color } as React.CSSProperties}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-300
                    ${isActive ? 'bg-white/[0.06] text-white' : 'text-white/55 hover:bg-white/[0.03] hover:text-white'}`}
                >
                  {({ isActive }) => <>
                    <Icon className="size-[18px] transition-transform duration-300 group-hover:scale-110" style={{ color: isActive ? color : undefined }} />
                    <Text tid={text} />
                    {/* the 2020 colored underline, now a glowing bar */}
                    <span
                      className={`absolute inset-x-3 -bottom-px h-0.5 origin-left rounded-full bg-(--c) shadow-[0_0_12px_var(--c)] transition-transform duration-500 ease-(--ease-out-expo) ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'}`}
                    />
                  </>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto flex items-center justify-between gap-2 px-1">
          <LanguageSelector />
          <ThemeToggle {...theme} />
        </div>
      </aside>

      {/* Mobile: bottom bar like the original, now floating glass */}
      <div className="fixed top-3 right-3 z-30 flex items-center gap-2 rounded-full bg-ink/80 p-1 backdrop-blur-xl md:hidden">
        <LanguageSelector />
        <ThemeToggle {...theme} />
      </div>
      <nav className="fixed inset-x-3 bottom-3 z-30 rounded-2xl bg-ink/85 px-1 py-1.5 shadow-2xl shadow-black/40 ring-1 ring-white/10 backdrop-blur-xl md:hidden">
        <ul className="flex">
          {navItems.map(({ text, url, icon: Icon, color }) => (
            <li key={url} className="flex-1">
              <NavLink end to={url} className={({ isActive }) => `flex flex-col items-center gap-1 rounded-xl py-1.5 text-[10px] font-medium transition ${isActive ? 'bg-white/[0.08] text-white' : 'text-white/50'}`}>
                {({ isActive }) => <>
                  <Icon className="size-5" style={{ color: isActive ? color : undefined }} />
                  <span className="max-w-full truncate px-0.5"><Text tid={text} /></span>
                </>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
