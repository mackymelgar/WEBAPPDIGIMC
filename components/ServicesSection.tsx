import { motion } from 'motion/react';
import { 
  FileText, 
  Heart, 
  GraduationCap, 
  Building2, 
  Users, 
  Shield,
  Briefcase,
  Home,
  Trees
} from 'lucide-react';
import { Card } from './ui/card';

const services = [
  {
    icon: FileText,
    title: 'Business Permits',
    description: 'Apply for business licenses, permits, and renewals online',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Heart,
    title: 'Health Services',
    description: 'Access healthcare programs, vaccination schedules, and medical assistance',
    color: 'from-red-500 to-pink-600',
  },
  {
    icon: GraduationCap,
    title: 'Education',
    description: 'School enrollment, scholarship programs, and educational resources',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: Building2,
    title: 'Building Permits',
    description: 'Construction permits, zoning clearances, and building inspections',
    color: 'from-orange-500 to-orange-600',
  },
  {
    icon: Users,
    title: 'Community Programs',
    description: 'Social services, livelihood programs, and community development',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: Shield,
    title: 'Public Safety',
    description: 'Emergency services, disaster preparedness, and safety programs',
    color: 'from-yellow-500 to-yellow-600',
  },
  {
    icon: Briefcase,
    title: 'Employment',
    description: 'Job opportunities, career development, and employment assistance',
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    icon: Home,
    title: 'Housing',
    description: 'Socialized housing programs, relocation assistance, and home loans',
    color: 'from-teal-500 to-teal-600',
  },
  {
    icon: Trees,
    title: 'Environment',
    description: 'Environmental protection, waste management, and green initiatives',
    color: 'from-emerald-500 to-emerald-600',
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-blue-600 mb-2"
          >
            What We Offer
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-900 mb-4"
          >
            City Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Comprehensive government services designed to make your life easier. 
            Access permits, programs, and assistance all in one place.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 border-transparent hover:border-blue-100">
                <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <service.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
