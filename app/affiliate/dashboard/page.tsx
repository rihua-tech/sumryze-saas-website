'use client';


import React, { useState } from 'react'; // ✅ FIXED
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { QRCodeCanvas } from 'qrcode.react';


const user = {
  name: 'Alex Doe',
  email: 'alex@example.com',
  payoutEmail: 'paypal@example.com',
};


export default function AffiliateDashboard() {
  const referralCode = 'yourname'; // TODO: dynamically pull this from auth
  const referralUrl = `https://sumryze.com/?ref=${referralCode}`;

  const [payoutEmail, setPayoutEmail] = useState(user.payoutEmail);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <main className="max-w-screen-lg mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">Affiliate Dashboard</h1>
      <p className="text-center text-gray-600 mb-10">
        Welcome back! Here's everything you need to grow and earn faster.
      </p>


      {/* 🔗 Referral Link */}
      <div className="bg-white shadow rounded-xl p-6 mb-10">
        <h2 className="text-lg font-semibold mb-2">Your Unique Referral Link</h2>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <Input readOnly value={referralUrl} className="flex-1 text-sm" />
          <Button onClick={() => navigator.clipboard.writeText(referralUrl)}>
            Copy
          </Button>
        </div>
        <div className="mt-6 text-center">
          <QRCodeCanvas value={referralUrl} size={128} />
        </div>
      </div>

      {/* 📊 Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { title: 'Clicks', value: 1250, icon: '🧭' },
          { title: 'Signups', value: 143, icon: '✍️' },
          { title: 'Conversions', value: 51, icon: '✅' },
          { title: 'Earnings', value: '$1,340', icon: '💰' },
        ].map((stat) => (
          <div key={stat.title} className="bg-white p-5 rounded-xl shadow text-center">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <p className="text-sm text-gray-500">{stat.title}</p>
            <p className="text-2xl font-bold text-indigo-700">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* 💵 Payout Info */}
      <div className="bg-white shadow rounded-xl p-6 mb-12">
        <h2 className="text-lg font-semibold mb-4">💵 Payout Info</h2>
        <p className="text-sm mb-2">
          <span className="inline-block mr-2">📅</span>
          <span className="text-gray-600">Next Payout:</span>{' '}
          <span className="text-indigo-600 font-semibold">Aug 15, 2025</span>
        </p>
        <p className="text-sm">
          <span className="inline-block mr-2">📬</span>
          <span className="text-gray-600">Payment Method:</span>{' '}
          <span className="text-indigo-600 font-semibold">PayPal</span>{' '}
          <button className="ml-2 text-xs text-blue-600 underline hover:text-blue-800 transition">
            (change)
          </button>
        </p>
      </div>

      {/* 📚 Affiliate Resources */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: 'Landing Pages',
            desc: 'High-converting pages with preloaded affiliate links.',
            href: '/affiliate/resources/landing-pages',
            icon: '🎁',
            cta: 'Open Landing Pages →',
          },
          {
            title: 'Email Templates',
            desc: 'Proven email copy to convert leads.',
            href: '/downloads/email-templates.zip',
            icon: '⚡',
            cta: 'Download Templates →',
          },
          {
            title: 'Social Media Kit',
            desc: 'Graphics and captions ready to post.',
            href: '/downloads/social-kit.zip',
            icon: '🌟',
            cta: 'Get Media Kit →',
          },
          {
            title: 'Performance Dashboard',
            desc: 'Track your clicks, earnings, and conversions.',
            href: '/affiliate/performance',
            icon: '📈',
            cta: 'View Dashboard →',
          },
          {
            title: 'Dedicated Support',
            desc: 'Talk with a real affiliate manager.',
            href: '/contact',
            icon: '🤝',
            cta: 'Contact Support →',
          },
          {
            title: 'Exclusive Bonuses',
            desc: 'Get rewards for top performance.',
            href: '/affiliate/bonuses',
            icon: '🏆',
            cta: 'See Bonuses →',
          },
        ].map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="bg-white p-6 rounded-xl shadow hover:shadow-md transition group"
            aria-label={item.title}
          >
            <div className="text-3xl mb-3">{item.icon}</div>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600 mt-2">{item.desc}</p>
            <div className="mt-2 text-sm text-indigo-600 font-medium group-hover:underline">
              {item.cta}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
