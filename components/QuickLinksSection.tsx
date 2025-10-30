import { motion } from 'motion/react';
import { FileCheck, Bell, Phone, MapPin, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

const quickLinks = [
  {
    icon: FileCheck,
    title: 'Track Application',
    description: 'Check your permit or document status',
    action: 'Track',
  },
  {
    icon: Bell,
    title: 'Announcements',
    description: 'Latest updates and news',
    action: 'View All',
  },
  {
    icon: Phone,
    title: 'Contact Us',
    description: '24/7 hotline and support',
    action: 'Call Now',
  },
];

const officeHours = [
  { day: 'Monday - Friday', hours: '8:00 AM - 5:00 PM' },
  { day: 'Saturday', hours: '8:00 AM - 12:00 PM' },
  { day: 'Sunday & Holidays', hours: 'Closed' },
];

export function QuickLinksSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div className="lg:col-span-2">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gray-900 mb-6"
            >
              Quick Access
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                        <link.icon className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-gray-900 mb-1">{link.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">
                          {link.description}
                        </p>
                        <Button variant="link" className="p-0 h-auto text-blue-600">
                          {link.action} →
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Office Hours & Contact */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 bg-gradient-to-br from-blue-600 to-blue-800 text-white mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-5 w-5" />
                  <h3 className="text-white">Office Hours</h3>
                </div>
                <div className="space-y-3">
                  {officeHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-blue-100">{schedule.day}</span>
                      <span className="text-white">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <h3 className="text-gray-900">Visit Us</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Capitol Drive, Malaybalay City
                  <br />
                  Bukidnon, Philippines 8700
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>(088) 813-5791</span>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    Get Directions
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
