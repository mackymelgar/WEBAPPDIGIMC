import { useState } from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription 
} from './ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { 
  FileText, 
  Heart, 
  GraduationCap, 
  Building2, 
  Users, 
  Shield,
  Briefcase,
  Home,
  Trees,
  Clock,
  CheckCircle,
  ArrowRight,
  Download
} from 'lucide-react';

const serviceCategories = [
  {
    id: 'business',
    name: 'Business & Permits',
    icon: FileText,
    color: 'from-blue-500 to-blue-600',
    services: [
      {
        title: 'Business Permit Application',
        description: 'Apply for new business permit or renewal',
        duration: '3-5 business days',
        requirements: [
          'DTI/SEC Registration',
          'Barangay Clearance',
          'Valid ID of Owner',
          'Location Sketch/Map',
          'Contract of Lease (if applicable)',
        ],
        steps: [
          'Submit complete requirements to Business Permits and Licensing Office',
          'Pay assessment fees',
          'Wait for inspection',
          'Claim business permit upon approval',
        ],
        fee: '₱2,000 - ₱15,000 (depending on business type)',
      },
      {
        title: "Mayor's Permit Renewal",
        description: 'Annual renewal of business permit',
        duration: '1-2 business days',
        requirements: [
          'Previous Business Permit',
          'Official Receipt of Payment',
          'Fire Safety Inspection Certificate',
          'Sanitary Permit',
        ],
        steps: [
          'Submit renewal application',
          'Pay renewal fees',
          'Claim renewed permit',
        ],
        fee: '₱1,500 - ₱10,000',
      },
      {
        title: 'Barangay Business Clearance',
        description: 'Clearance from barangay for business operations',
        duration: '1 business day',
        requirements: [
          'Business Registration',
          'Valid ID',
          'Cedula',
        ],
        steps: [
          'Go to Barangay Hall',
          'Fill out application form',
          'Pay clearance fee',
          'Receive clearance',
        ],
        fee: '₱500',
      },
    ],
  },
  {
    id: 'health',
    name: 'Health Services',
    icon: Heart,
    color: 'from-red-500 to-pink-600',
    services: [
      {
        title: 'Health Certificate',
        description: 'Medical certificate for employment or business',
        duration: '1 day',
        requirements: [
          'Valid ID',
          'Recent photo (2x2)',
          'Medical examination results',
        ],
        steps: [
          'Visit City Health Office',
          'Undergo medical examination',
          'Pay processing fee',
          'Claim certificate',
        ],
        fee: '₱150',
      },
      {
        title: 'Vaccination Services',
        description: 'Free vaccination for children and adults',
        duration: 'Walk-in',
        requirements: [
          'Immunization card (for children)',
          'Valid ID (for adults)',
        ],
        steps: [
          'Go to nearest health center',
          'Register at vaccination desk',
          'Receive vaccination',
          'Get vaccination record',
        ],
        fee: 'FREE',
      },
      {
        title: 'Maternal Health Services',
        description: 'Pre-natal and post-natal care',
        duration: 'Scheduled appointments',
        requirements: [
          'Pregnancy test results',
          'PhilHealth ID (if available)',
        ],
        steps: [
          'Register at City Health Office',
          'Schedule regular check-ups',
          'Attend prenatal classes',
        ],
        fee: 'FREE',
      },
    ],
  },
  {
    id: 'education',
    name: 'Education Programs',
    icon: GraduationCap,
    color: 'from-purple-500 to-purple-600',
    services: [
      {
        title: 'Scholarship Application',
        description: 'Financial assistance for qualified students',
        duration: 'Application period: May-June',
        requirements: [
          'Certificate of Registration',
          'Grade Report (previous semester)',
          'Certificate of Indigency',
          'Parent\'s Income Tax Return or Barangay Certification',
        ],
        steps: [
          'Submit application during enrollment period',
          'Attend interview',
          'Wait for approval',
          'Receive scholarship grant',
        ],
        fee: 'FREE (Application)',
      },
      {
        title: 'School Enrollment Assistance',
        description: 'Help with public school enrollment',
        duration: 'Enrollment period',
        requirements: [
          'Birth Certificate',
          'Report Card (for transferees)',
          'Good Moral Certificate',
        ],
        steps: [
          'Visit designated public school',
          'Submit requirements',
          'Complete enrollment form',
          'Attend orientation',
        ],
        fee: 'FREE',
      },
    ],
  },
  {
    id: 'building',
    name: 'Building & Construction',
    icon: Building2,
    color: 'from-orange-500 to-orange-600',
    services: [
      {
        title: 'Building Permit',
        description: 'Permit for construction, renovation, or demolition',
        duration: '10-20 business days',
        requirements: [
          'Lot Title/Tax Declaration',
          'Building Plans (5 sets)',
          'Structural Analysis',
          'Electrical Layout',
          'Plumbing Layout',
          'Sanitary/Septic Tank Layout',
        ],
        steps: [
          'Submit plans to Office of the Building Official',
          'Pay assessment fees',
          'Wait for plan approval',
          'Pay permit fees',
          'Claim building permit',
        ],
        fee: '₱5,000 - ₱50,000+ (depends on project)',
      },
      {
        title: 'Occupancy Permit',
        description: 'Certificate to occupy newly constructed building',
        duration: '3-5 business days',
        requirements: [
          'Building Permit',
          'As-Built Plans',
          'Final Inspection Report',
          'Fire Safety Certificate',
        ],
        steps: [
          'Request final inspection',
          'Submit as-built plans',
          'Pay occupancy permit fee',
          'Receive certificate of occupancy',
        ],
        fee: '₱1,000 - ₱5,000',
      },
    ],
  },
  {
    id: 'community',
    name: 'Community Programs',
    icon: Users,
    color: 'from-green-500 to-green-600',
    services: [
      {
        title: '4Ps (Pantawid Pamilyang Pilipino Program)',
        description: 'Conditional cash transfer program for poor families',
        duration: 'Ongoing',
        requirements: [
          'Household assessment',
          'Birth certificates of children',
          'Valid IDs of parents',
        ],
        steps: [
          'Visit MSWDO Office',
          'Fill out application form',
          'Undergo household assessment',
          'Attend family development sessions',
        ],
        fee: 'FREE',
      },
      {
        title: 'Livelihood Programs',
        description: 'Skills training and livelihood assistance',
        duration: 'Varies per program',
        requirements: [
          'Registration form',
          'Valid ID',
          'Certificate of Residency',
        ],
        steps: [
          'Attend orientation',
          'Complete training program',
          'Receive starter kit/capital',
        ],
        fee: 'FREE',
      },
    ],
  },
  {
    id: 'safety',
    name: 'Public Safety',
    icon: Shield,
    color: 'from-yellow-500 to-yellow-600',
    services: [
      {
        title: 'Fire Safety Inspection',
        description: 'Fire safety clearance for establishments',
        duration: '3-5 business days',
        requirements: [
          'Business Permit',
          'Building Plans',
          'Fire Safety equipment inventory',
        ],
        steps: [
          'Submit application to BFP',
          'Schedule inspection',
          'Comply with requirements',
          'Receive Fire Safety Inspection Certificate',
        ],
        fee: '₱500 - ₱2,000',
      },
      {
        title: 'Emergency Response',
        description: '24/7 emergency services',
        duration: 'Immediate response',
        requirements: [
          'None (Emergency hotline: 911)',
        ],
        steps: [
          'Call emergency hotline',
          'Provide location and details',
          'Wait for emergency responders',
        ],
        fee: 'FREE',
      },
    ],
  },
  {
    id: 'employment',
    name: 'Employment Services',
    icon: Briefcase,
    color: 'from-indigo-500 to-indigo-600',
    services: [
      {
        title: 'Job Placement Assistance',
        description: 'Help finding employment opportunities',
        duration: 'Ongoing',
        requirements: [
          'Resume/CV',
          'Valid ID',
          'TOR/Diploma',
        ],
        steps: [
          'Register at PESO Office',
          'Attend job fair',
          'Apply to matched positions',
        ],
        fee: 'FREE',
      },
      {
        title: 'Skills Training',
        description: 'TESDA certified training programs',
        duration: '1-6 months',
        requirements: [
          'Birth Certificate',
          'High School Diploma',
          'Valid ID',
        ],
        steps: [
          'Choose training course',
          'Submit requirements',
          'Attend training',
          'Take TESDA assessment',
        ],
        fee: 'FREE',
      },
    ],
  },
  {
    id: 'housing',
    name: 'Housing Programs',
    icon: Home,
    color: 'from-teal-500 to-teal-600',
    services: [
      {
        title: 'Socialized Housing',
        description: 'Affordable housing for low-income families',
        duration: '6-12 months',
        requirements: [
          'Certificate of Indigency',
          'Proof of Income',
          'Valid IDs',
          'Marriage Certificate',
        ],
        steps: [
          'Submit application to Housing Office',
          'Undergo background check',
          'Attend housing orientation',
          'Pay down payment',
          'Sign contract',
        ],
        fee: 'Varies per unit',
      },
    ],
  },
  {
    id: 'environment',
    name: 'Environment & Sanitation',
    icon: Trees,
    color: 'from-emerald-500 to-emerald-600',
    services: [
      {
        title: 'Waste Collection Services',
        description: 'Scheduled garbage collection',
        duration: 'Regular schedule',
        requirements: [
          'Segregated waste',
          'Proof of residency',
        ],
        steps: [
          'Segregate waste properly',
          'Place waste bins outside on collection day',
          'Follow collection schedule',
        ],
        fee: 'Included in real property tax',
      },
      {
        title: 'Tree Planting Programs',
        description: 'Community environmental initiatives',
        duration: 'Seasonal',
        requirements: [
          'Registration',
          'Attendance to orientation',
        ],
        steps: [
          'Register with Environment Office',
          'Attend tree planting activity',
          'Receive certificate of participation',
        ],
        fee: 'FREE',
      },
    ],
  },
];

interface AllServicesExplorerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AllServicesExplorer({ isOpen, onOpenChange }: AllServicesExplorerProps) {
  const [activeTab, setActiveTab] = useState('business');

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>All City Services</SheetTitle>
          <SheetDescription>
            Browse through all available government services and their requirements
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full flex-wrap h-auto gap-2 bg-transparent p-0 mb-6">
              {serviceCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:text-white"
                  style={{
                    backgroundImage: activeTab === category.id 
                      ? `linear-gradient(to right, var(--tw-gradient-stops))` 
                      : undefined,
                  }}
                >
                  <category.icon className="h-4 w-4 mr-2" />
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {serviceCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="space-y-4">
                <div className={`p-4 rounded-xl bg-gradient-to-r ${category.color} text-white`}>
                  <div className="flex items-center gap-3 mb-2">
                    <category.icon className="h-8 w-8" />
                    <h3 className="text-white">{category.name}</h3>
                  </div>
                  <p className="text-white/90 text-sm">
                    {category.services.length} services available in this category
                  </p>
                </div>

                <Accordion type="single" collapsible className="space-y-3">
                  {category.services.map((service, index) => (
                    <AccordionItem 
                      key={index} 
                      value={`service-${index}`}
                      className="border rounded-xl overflow-hidden"
                    >
                      <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50">
                        <div className="flex items-start gap-4 text-left">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-gray-900">{service.title}</h4>
                            </div>
                            <p className="text-gray-600 text-sm">{service.description}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <Badge variant="secondary" className="text-xs">
                                <Clock className="h-3 w-3 mr-1" />
                                {service.duration}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {service.fee}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6 pt-2">
                        <div className="space-y-4">
                          {/* Requirements */}
                          <div>
                            <h5 className="text-gray-900 mb-2 flex items-center gap-2">
                              <FileText className="h-4 w-4 text-blue-600" />
                              Requirements
                            </h5>
                            <ul className="space-y-1.5">
                              {service.requirements.map((req, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                  <span>{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Steps */}
                          <div>
                            <h5 className="text-gray-900 mb-2 flex items-center gap-2">
                              <ArrowRight className="h-4 w-4 text-blue-600" />
                              Steps to Apply
                            </h5>
                            <ol className="space-y-2">
                              {service.steps.map((step, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">
                                    {idx + 1}
                                  </span>
                                  <span className="pt-0.5">{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2 pt-2">
                            <Button className="flex-1" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download Form
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}
