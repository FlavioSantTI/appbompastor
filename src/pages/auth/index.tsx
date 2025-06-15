
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2, User } from 'lucide-react';

const AuthPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Preencha todos os campos.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { error } = await signIn(email, password);
      if (error) throw error;
    } catch (err: any) {
      setError(err.message || 'Falha ao realizar login.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Preencha todos os campos.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { error } = await signUp(email, password);
      if (error) throw error;
      setError('Cadastro bem-sucedido. Verifique seu e-mail!');
    } catch (err: any) {
      setError(err.message || 'Falha ao realizar cadastro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-indigo-100 dark:from-background dark:to-background">
      <div className="w-full max-w-sm mx-auto flex flex-col items-center justify-center px-4 py-10 relative animate-fade-in">
        <div className="bg-white dark:bg-card rounded-2xl shadow-lg w-full p-8 pt-6 border border-blue-100 dark:border-blue-900/50 flex flex-col items-center">
          
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex p-2 bg-blue-100 rounded-full text-blue-600 shadow-sm">
              <User className="w-6 h-6" />
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-blue-800 dark:text-white ml-1 tracking-tight">{tab === 'signup' ? 'Cadastro' : 'Entrar'}</h1>
          </div>
          <p className="text-base text-muted-foreground mb-6">
            {tab === 'signup' ? "Crie sua conta e participe" : "Bem-vindo de volta!"}
          </p>

          <div className="flex w-full mb-7">
            <button
              type="button"
              className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-colors ${tab === 'login'
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-white'
                : 'bg-transparent text-muted-foreground hover:bg-muted/50'
                }`}
              onClick={() => setTab('login')}
            >
              Login
            </button>
            <button
              type="button"
              className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-colors ${tab === 'signup'
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-white'
                : 'bg-transparent text-muted-foreground hover:bg-muted/50'
                }`}
              onClick={() => setTab('signup')}
            >
              Cadastro
            </button>
          </div>
          
          {tab === 'login' && (
            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="username"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={loading}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  disabled={loading}
                  className="mt-1"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  tabIndex={-1}
                  className="text-xs text-blue-500 hover:underline focus:outline-none"
                  disabled={loading}
                >
                  Esqueceu a senha?
                </button>
              </div>
              {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}
              <Button
                type="submit"
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold h-11 rounded-xl mt-2"
                disabled={loading}
              >
                {loading && <Loader2 className="animate-spin mr-2 w-5 h-5" />}
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          )}

          {tab === 'signup' && (
            <form onSubmit={handleSignup} className="w-full space-y-4">
              <div>
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  autoComplete="username"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={loading}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="signup-password">Senha</Label>
                <Input
                  id="signup-password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Crie uma senha"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  disabled={loading}
                  className="mt-1"
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}
              <Button
                type="submit"
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold h-11 rounded-xl mt-2"
                disabled={loading}
              >
                {loading && <Loader2 className="animate-spin mr-2 w-5 h-5" />}
                {loading ? "Cadastrando..." : "Cadastrar"}
              </Button>
            </form>
          )}

        </div>
        <p className="mt-10 text-xs text-muted-foreground text-center max-w-xs select-none">
          © {new Date().getFullYear()} - Seu evento brilhando em cada detalhe
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
