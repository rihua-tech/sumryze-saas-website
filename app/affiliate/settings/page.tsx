'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AffiliateSettings() {
  const [email, setEmail] = useState('paypal@example.com');
  const [editing, setEditing] = useState(false);

  return (
    <main className="max-w-screen-md mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">⚙️ Account Settings</h1>

      <div className="bg-white rounded-xl shadow p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Payout Email</label>
          {editing ? (
            <div className="flex items-center gap-2">
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
              <Button size="sm" onClick={() => setEditing(false)}>Save</Button>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <span className="text-sm text-indigo-600">{email}</span>
              <Button size="sm" variant="ghost" onClick={() => setEditing(true)}>Change</Button>
            </div>
          )}
        </div>

        <Button variant="destructive" size="sm" onClick={() => alert('TODO: Cancel Account')}>
          ❌ Cancel Affiliate Account
        </Button>
      </div>
    </main>
  );
}
