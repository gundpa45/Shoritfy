import { useId } from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme, type ThemePreference } from './theme-context';

const options = [
  { value: 'system', label: 'System', Icon: Monitor },
  { value: 'light', label: 'Light', Icon: Sun },
  { value: 'dark', label: 'Dark', Icon: Moon },
] as const;

export function ThemeSwitcher() {
  const { preference, setPreference } = useTheme();
  const name = useId();
  return (
    <fieldset className="theme-switcher">
      <legend className="sr-only">Appearance</legend>
      {options.map(({ value, label, Icon }) => (
        <label key={value} title={`${label} theme`}>
          <input type="radio" name={name} value={value} checked={preference === value} onChange={() => setPreference(value as ThemePreference)} />
          <span><Icon size={15} aria-hidden="true" /><span className="sr-only">{label}</span></span>
        </label>
      ))}
    </fieldset>
  );
}
