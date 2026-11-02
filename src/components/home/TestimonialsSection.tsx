import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Aditya Deshmukh',
      role: 'Cloud Solutions Associate at Wipro',
      location: 'Pune, Maharashtra',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      course: 'AWS Certified Solutions Architect (SAA-C03)',
      comment:
        'Dakshata’s recommendation wizard prevented me from spending ₹25,000 on an overpriced local institute. It guided me to the official AWS Coursera specialization with an affiliate discount of ₹3,499. Passed my exam in 8 weeks!',
      rating: 5,
    },
    {
      name: 'Vikram Gurjar',
      role: 'Solar EPC Contractor & Entrepreneur',
      location: 'Jaipur, Rajasthan',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
      course: 'Surya Mitra Solar PV Installer (Skill India)',
      comment:
        'I discovered the 100% free Surya Mitra government course through Dakshata. The training on net-metering and rooftop inverter sizing helped me start my own solar installation business with state DISCOM accreditation.',
      rating: 5,
    },
    {
      name: 'Sneha Roy',
      role: 'Business Intelligence Analyst',
      location: 'Bengaluru, Karnataka',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
      course: 'Google Data Analytics Professional Certificate',
      comment:
        'Coming from a non-engineering commerce background, the skill-gap analyzer mapped out exactly what SQL and Power BI projects I needed. The side-by-side comparison made choosing between IBM and Google effortless.',
      rating: 5,
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-indigo-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-saffron-600 dark:text-saffron-400">
            Student Success Stories
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-indigo-950 dark:text-white mt-1">
            Real Careers Transformed Across India
          </h2>
          <p className="text-sand-600 dark:text-sand-400 text-xs sm:text-sm mt-2">
            Thousands of learners trust Dakshata to discover verified, cost-effective courses and trade certifications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-sand-50 dark:bg-indigo-900/50 rounded-2xl p-6 border border-sand-200 dark:border-indigo-800 flex flex-col justify-between shadow-sm hover:shadow-dakshata transition-all"
            >
              <div>
                <div className="flex items-center gap-1 text-saffron-500 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-saffron-500" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-sand-700 dark:text-sand-200 leading-relaxed italic relative">
                  <Quote className="w-6 h-6 text-sand-300 dark:text-indigo-700/60 absolute -top-3 -left-2 -z-0 opacity-40" />
                  <span className="relative z-10">"{item.comment}"</span>
                </p>

                <div className="mt-4 pt-3 border-t border-sand-200 dark:border-indigo-800 text-[11px] text-saffron-700 dark:text-saffron-400 font-semibold">
                  Course taken: {item.course}
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-saffron-500"
                />
                <div>
                  <div className="flex items-center gap-1 font-serif font-bold text-sm text-indigo-950 dark:text-white">
                    <span>{item.name}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <p className="text-[11px] text-sand-500 dark:text-sand-400">{item.role}</p>
                  <p className="text-[10px] text-sand-400">{item.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

