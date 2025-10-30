import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion, AnimatePresence } from "motion/react";
import { AllServicesExplorer } from "./AllServicesExplorer";

const heroSlides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1640556409699-eab69072fec8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwaGFsbCUyMGJ1aWxkaW5nfGVufDF8fHx8MTc2MTY2OTg4MXww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "City Hall Complex",
    location: "Capitol Drive, Malaybalay City",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1569292567777-e5d61a759322?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBwZW9wbGV8ZW58MXx8fHwxNzYxNzUwNTAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Community Services",
    location: "Serving the People",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1502818364365-08cda033fee1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWJsaWMlMjB0cmFuc3BvcnRhdGlvbnxlbnwxfHx8fDE3NjE3Nzc3OTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Public Infrastructure",
    location: "Building Tomorrow",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + heroSlides.length) % heroSlides.length,
    );
  };

  const currentImage = heroSlides[currentSlide];

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Left Side - Hero Image/Carousel */}
      <div className="absolute left-0 top-0 h-full w-full lg:w-[55%] bg-gradient-to-br from-blue-900 to-purple-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative h-full w-full"
          >
            <ImageWithFallback
              src={currentImage.image}
              alt={currentImage.title}
              className="h-full w-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Image Info */}
            <div className="absolute bottom-32 left-8 text-white z-10">
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-white mb-2"
              >
                {currentImage.title}
              </motion.h2>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2 text-white/90"
              >
                <MapPin className="h-4 w-4" />
                <span className="text-sm">
                  {currentImage.location}
                </span>
              </motion.div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-8 left-8 flex items-center gap-4 z-10">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-sm border-white/30 hover:bg-white/20 text-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-sm border-white/30 hover:bg-white/20 text-white"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>

              {/* Progress Bar */}
              <div className="flex-1 max-w-xs">
                <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-300"
                    style={{
                      width: `${((currentSlide + 1) / heroSlides.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Slide Counter */}
              <div className="text-white">
                <span className="text-2xl">
                  0{currentSlide + 1}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right Side - Content */}
      <div className="absolute right-0 top-0 h-full w-full lg:w-[45%] bg-white lg:rounded-l-3xl overflow-y-auto">
        <div className="pt-24 pb-12 px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-gray-600 mb-2 italic">
              Your Gateway to
            </p>
            <h1 className="text-gray-900 mb-4">
              Malaybalay City
              <br />
              Government Services
            </h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              The City of Malaybalay is committed to providing
              efficient, transparent, and accessible government
              services to all residents. From business permits
              to health services, education programs, and
              community development initiatives - we're here to
              serve you with excellence and dedication.
            </p>

            {/* Service Cards */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <ServiceCard
                image="https://images.unsplash.com/photo-1603189751032-7d5b09d9c8ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBvZmZpY2V8ZW58MXx8fHwxNzYxNzA0MDMyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                title="Business Permits"
                delay={0.4}
              />
              <ServiceCard
                image="https://images.unsplash.com/photo-1624727828489-a1e03b79bba8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwaGVhbHRoJTIwc2VydmljZXN8ZW58MXx8fHwxNzYxNzc3Nzk4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                title="Health Services"
                delay={0.5}
              />
              <ServiceCard
                image="https://images.unsplash.com/photo-1665492095698-8ea8406cdf2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjBzY2hvb2x8ZW58MXx8fHwxNzYxNzc3Nzk4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                title="Education Programs"
                delay={0.6}
              />
              <ServiceCard
                image="https://images.unsplash.com/photo-1502818364365-08cda033fee1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWJsaWMlMjB0cmFuc3BvcnRhdGlvbnxlbnwxfHx8fDE3NjE3Nzc3OTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                title="Transportation"
                delay={0.7}
              />
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Button
                onClick={() => setIsServicesOpen(true)}
                className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 px-8 py-6 rounded-full group"
              >
                EXPLORE ALL SERVICES
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* All Services Explorer */}
      <AllServicesExplorer
        isOpen={isServicesOpen}
        onOpenChange={setIsServicesOpen}
      />

    </div>
  );
}

interface ServiceCardProps {
  image: string;
  title: string;
  delay: number;
}

function ServiceCard({
  image,
  title,
  delay,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className="group relative overflow-hidden rounded-2xl aspect-[4/5] cursor-pointer"
    >
      <ImageWithFallback
        src={image}
        alt={title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white">{title}</h3>
      </div>
    </motion.div>
  );
}