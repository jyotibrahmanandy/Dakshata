'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const { addToast } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Message Sent!', 'Our academic support team will reply within 24 hours.', 'success');
  };

  return (
    <div className="bg-sand-50 dark:bg-indigo-950/40 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 bg-saffron-500/15 border border-saffron-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-saffron-700 dark:text-saffron-300">
            <MessageSquare className="w-3.5 h-3.5 text-saffron-500" />
            <span>Get in Touch</span>
          </div>
          <h1 className="font-serif font-extrabold text-3xl sm:text-4xl text-indigo-950 dark:text-white">
            Contact Dakshata Team
          </h1>
          <p className="text-sand-600 dark:text-sand-400 text-xs sm:text-sm max-w-lg mx-auto">
            Need guidance on course recommendations, partner integrations, or finding a local vocational center? We’re here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details (5 cols) */}
          <div className="md:col-span-5 bg-indigo-950 text-white p-6 sm:p-8 rounded-3xl border border-indigo-900 shadow-xl space-y-6">
            <div>
              <h3 className="font-serif font-bold text-xl text-white">Office & Support</h3>
              <p className="text-xs text-sand-300 mt-1">
                Reach out directly to our student advisory and partner relations desks.
              </p>
            </div>

            <div className="space-y-4 text-xs text-sand-200">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-indigo-900 text-saffron-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-sand-400 block font-bold uppercase">General Inquiries</span>
                  <a href="mailto:support@dakshata.in" className="font-semibold hover:text-white">
                    support@dakshata.in
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-indigo-900 text-saffron-400">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-sand-400 block font-bold uppercase">Phone Helpline</span>
                  <span className="font-semibold">+91 20 4892 1090 (Mon-Sat, 9AM-6PM IST)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-indigo-900 text-saffron-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-sand-400 block font-bold uppercase">Headquarters</span>
                  <span className="font-semibold leading-relaxed block">
                    Dakshata Learning Technologies, Baner Tech Park, Pune, Maharashtra 411045
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-indigo-900/60 border border-indigo-800 text-[11px] text-sand-300 space-y-1">
              <p className="font-bold text-white">Course Provider Partnerships:</p>
              <p>For EdTech and university API catalog feed integration, email partners@dakshata.in.</p>
            </div>
          </div>

          {/* Form (7 cols) */}
          <div className="md:col-span-7 bg-white dark:bg-indigo-900/60 p-6 sm:p-8 rounded-3xl border border-sand-200 dark:border-indigo-800 shadow-sm space-y-4">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-xl text-indigo-950 dark:text-white">
                  Message Dispatched Successfully
                </h3>
                <p className="text-xs text-sand-600 dark:text-sand-400 max-w-sm mx-auto">
                  Thank you for reaching out. An academic counselor will review your inquiry and get in touch within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2 bg-saffron-500 text-indigo-950 font-bold text-xs rounded-xl"
                >
                  Send Another Note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-sand-700 dark:text-sand-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh Patel"
                    className="w-full h-10 px-3 border border-sand-300 dark:border-indigo-700 rounded-xl bg-sand-50 dark:bg-indigo-950 text-indigo-950 dark:text-white focus:outline-none focus:border-saffron-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-sand-700 dark:text-sand-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ramesh@example.com"
                    className="w-full h-10 px-3 border border-sand-300 dark:border-indigo-700 rounded-xl bg-sand-50 dark:bg-indigo-950 text-indigo-950 dark:text-white focus:outline-none focus:border-saffron-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-sand-700 dark:text-sand-300 mb-1">
                    Topic / Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Question regarding Surya Mitra Solar certification"
                    className="w-full h-10 px-3 border border-sand-300 dark:border-indigo-700 rounded-xl bg-sand-50 dark:bg-indigo-950 text-indigo-950 dark:text-white focus:outline-none focus:border-saffron-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-sand-700 dark:text-sand-300 mb-1">
                    Message Details
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you need assistance with..."
                    className="w-full p-3 border border-sand-300 dark:border-indigo-700 rounded-xl bg-sand-50 dark:bg-indigo-950 text-indigo-950 dark:text-white focus:outline-none focus:border-saffron-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-saffron-500 hover:bg-saffron-600 text-indigo-950 font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

