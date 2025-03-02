// src/pages/login.tsx
import { useState, FormEvent, SetStateAction } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff } from 'lucide-react'; // For password visibility toggle
import axios from 'axios';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); // État pour gérer les erreurs
  const [loading, setLoading] = useState<boolean>(false); // État pour gérer le chargement

  /*const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Add your login logic here (e.g., API call)
    console.log('Login submitted:', { email, password });
  };*/
 const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null); // Réinitialiser les erreurs
    setLoading(true); // Activer l'état de chargement

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // Stocker le token dans localStorage ou cookies
      localStorage.setItem('token', response.data.token);
      // Rediriger vers le tableau de bord ou une autre page
      window.location.href = '/dashboard';
    } catch (error: any) {
      // Axios encapsule les erreurs dans error.response
      if (error.response) {
        setError(error.response.data.message || 'Une erreur est survenue lors de la connexion');
      } else {
        setError('Erreur serveur. Veuillez réessayer plus tard.');
      }
    } finally {
      setLoading(false); // Désactiver l'état de chargement
    }
  };
  return (
    <div
 className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/images/hero/background.jpg')" }}
      
    >
       <div className="absolute inset-0 backdrop-blur-xs bg-black/30"></div>

      <Card className="w-full max-w-md shadow-lg border border-gray-200 dark:border-gray-700 z-10">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to log in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e: { target: { value: SetStateAction<string>; }; }) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e: { target: { value: SetStateAction<string>; }; }) => setPassword(e.target.value)}
                  required
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full">
              Log In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-600 hover:underline dark:text-blue-400">
              Sign up
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;