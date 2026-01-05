import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeMode = 'light' | 'dark' | 'system';
export type ThemeColor = 'blue' | 'green' | 'purple' | 'orange' | 'red';
export type ContainerType = 'full' | 'boxed';
export type SidebarType = 'full' | 'mini';
export type BorderRadius = 0 | 4 | 7 | 12;

interface ThemeState {
  mode: ThemeMode;
  color: ThemeColor;
  container: ContainerType;
  sidebar: SidebarType;
  borderRadius: BorderRadius;
  setMode: (mode: ThemeMode) => void;
  setColor: (color: ThemeColor) => void;
  setContainer: (container: ContainerType) => void;
  setSidebar: (sidebar: SidebarType) => void;
  setBorderRadius: (radius: BorderRadius) => void;
  resetToDefaults: () => void;
}

const defaultState = {
  mode: 'light' as ThemeMode,
  color: 'blue' as ThemeColor,
  container: 'full' as ContainerType,
  sidebar: 'full' as SidebarType,
  borderRadius: 7 as BorderRadius,
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      ...defaultState,
      setMode: (mode) => set({ mode }),
      setColor: (color) => set({ color }),
      setContainer: (container) => set({ container }),
      setSidebar: (sidebar) => set({ sidebar }),
      setBorderRadius: (borderRadius) => set({ borderRadius }),
      resetToDefaults: () => set(defaultState),
    }),
    {
      name: 'admin-theme-preferences',
    }
  )
);
