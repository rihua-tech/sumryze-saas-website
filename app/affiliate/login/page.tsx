'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function AffiliateLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // ✅ Replace with your actual login logic (e.g. Supabase, Firebase, API)
      console.log('Logging in with:', form);

      // Simulate success
      await new Promise((res) => setTimeout(res, 1200));
      router.push('/affiliate/dashboard');
    } catch (err) {
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-md mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold mb-6 text-center">Affiliate Login</h1>

      <form onSubmit={handleLogin} className="space-y-5 bg-white p-6 rounded-xl shadow">
        <div>
          <label htmlFor="email" className="block mb-1 font-medium text-sm">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 font-medium text-sm">
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            value={form.password}
            onChange={handleChange}
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Logging in...' : 'Log In'}
        </Button>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don't have an account?{' '}
          <Link href="/affiliate/signup" className="text-indigo-600 hover:underline">
            Sign up here
          </Link>
        </p>
      </form>
    </main>
  );
}
