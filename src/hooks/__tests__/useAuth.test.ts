import { renderHook, act } from '@testing-library/react';
import { useAuth } from '../useAuth';

// Mock router
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() })
}));

describe('useAuth', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('deve iniciar deslogado', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.isLoggedIn).toBe(false);
  });

  it('login com credenciais válidas', () => {
    const { result } = renderHook(() => useAuth());
    act(() => {
      result.current.login('maxup', 'maxup');
    });
    expect(result.current.isLoggedIn).toBe(true);
    expect(localStorage.getItem('isLoggedIn')).toBe('true');
  });

  it('login com credenciais inválidas', () => {
    const { result } = renderHook(() => useAuth());
    act(() => {
      result.current.login('foo', 'bar');
    });
    expect(result.current.isLoggedIn).toBe(false);
    expect(localStorage.getItem('isLoggedIn')).toBeNull();
  });

  it('logout limpa o estado', () => {
    const { result } = renderHook(() => useAuth());
    act(() => {
      result.current.login('maxup', 'maxup');
      result.current.logout();
    });
    expect(result.current.isLoggedIn).toBe(false);
    expect(localStorage.getItem('isLoggedIn')).toBeNull();
  });
});
