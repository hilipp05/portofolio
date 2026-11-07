type Listener = () => void;

/**
 * Store minimal untuk useSyncExternalStore. Dipakai supaya filter proyek bisa
 * diubah dari komponen lain (daftar stack, command palette) tanpa context.
 */
export function createStore<T>(initial: T) {
  let value = initial;
  const listeners = new Set<Listener>();

  return {
    get: () => value,
    set(next: T) {
      if (Object.is(next, value)) return;
      value = next;
      listeners.forEach((listener) => listener());
    },
    subscribe(listener: Listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}

/** Teknologi yang sedang dipakai untuk menyaring daftar proyek (null = semua). */
export const filterStore = createStore<string | null>(null);

/**
 * Hash URL sebagai state. Memilih proyek memakai replaceState, jadi tombol Back
 * tidak penuh dengan riwayat klik, tetapi tautan seperti /#project-nama-proyek
 * tetap bisa dibagikan.
 */
const hashListeners = new Set<Listener>();

export const hashStore = {
  subscribe(listener: Listener) {
    hashListeners.add(listener);
    window.addEventListener("hashchange", listener);
    return () => {
      hashListeners.delete(listener);
      window.removeEventListener("hashchange", listener);
    };
  },
  get: () => window.location.hash,
  getServer: () => "",
  replace(next: string) {
    const url = next
      ? `#${next}`
      : `${window.location.pathname}${window.location.search}`;
    window.history.replaceState(null, "", url);
    hashListeners.forEach((listener) => listener());
  },
};
