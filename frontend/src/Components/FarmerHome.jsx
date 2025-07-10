import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PackagePlus, 
  TrendingUp, 
  LineChart, 
  LayoutDashboard,
  ArrowRight,
  Sprout
} from 'lucide-react';

const FarmerHome = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Post Stock",
      description: "List your produce instantly",
      icon: PackagePlus,
      path: "/farmerstock",
      color: "from-green-600 to-green-700"
    },
    {
      title: "Best Deals",
      description: "Find bulk deal opportunities",
      icon: TrendingUp,
      path: "/farmerbestdeals",
      color: "from-emerald-600 to-emerald-700"
    },
    {
      title: "Insights",
      description: "Market trends & predictions",
      icon: LineChart,
      path: "/farmerinsight",
      color: "from-green-700 to-emerald-800"
    },
    {
      title: "Dashboard",
      description: "Manage your business",
      icon: LayoutDashboard,
      path: "/farmerdashbaord",
      color: "from-emerald-700 to-green-800"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const statsVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b relative flex-auto from-green-100 to-green-200 py-4 sm:py-8 px-2 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section with Floating Icon */}
        <motion.div 
          className="text-center mb-8 sm:mb-12 top-0 relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="absolute left-1/2 -top-4 sm:-top-6 transform -translate-x-1/2"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sprout className="w-8 h-8 sm:w-12 sm:h-12 text-green-600" />
          </motion.div>
          
          <h1 className="text-2xl pt-6 sm:text-3xl lg:text-4xl font-bold text-gray-900 mt-6 sm:mt-8 mb-2">
            Welcome back, Farmer!
          </h1>
          <motion.p 
            className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Manage your agricultural business efficiently
          </motion.p>
        </motion.div>

        {/* Action Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {actions.map((action, index) => (
            <motion.div
              key={action.title}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative group h-full"
            >
              <button
                onClick={() => navigate(action.path)}
                className="w-full h-full text-left focus:outline-none"
              >
                <div className={`
                  p-6 sm:p-8 rounded-xl shadow-md
                  bg-gradient-to-r ${action.color}
                  transform transition-all duration-300
                  group-hover:shadow-lg
                  relative overflow-hidden
                  h-full flex flex-col
                `}>
                  {/* Animated Background Pattern */}
                  <motion.div 
                    className="absolute inset-0 opacity-10"
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                    style={{
                      backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)',
                      backgroundSize: '20px 20px'
                    }}
                  />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center mb-4">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="p-2 rounded-lg bg-white/10"
                      >
                        <action.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </motion.div>
                      <h3 className="text-lg sm:text-xl font-bold text-white ml-3">
                        {action.title}
                      </h3>
                    </div>
                    <p className="text-green-50 text-sm sm:text-base mb-4 flex-grow">
                      {action.description}
                    </p>
                    <motion.div 
                      className="flex items-center text-white text-sm sm:text-base font-medium mt-auto"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <span>Get Started</span>
                      <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.div>
                  </div>

                  {/* Interactive Hover Effect */}
                  <motion.div
                    className="absolute inset-0 bg-white opacity-0"
                    whileHover={{ opacity: 0.1 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
              </button>
            </motion.div>
          ))}
          
        </motion.div>
         <motion.div
                      key={"Dashboard"}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative group lg:px-48"
                    >
                      <button
                        onClick={() => navigate("/transporterDemand")}
                        className="w-full text-left focus:outline-none"
                      >
                        <div className={`
                          p-4 rounded-xl shadow-md
                          bg-gradient-to-r from-emerald-700 to-green-800
                          transform transition-all duration-300
                          group-hover:shadow-lg
                          relative overflow-hidden
                        `}>
                          {/* Animated Background Pattern */}
                          <motion.div 
                            className="absolute inset-0  opacity-10"
                            animate={{
                              backgroundPosition: ['0% 0%', '100% 100%'],
                            }}
                            transition={{
                              duration: 20,
                              repeat: Infinity,
                              repeatType: "reverse"
                            }}
                            style={{
                              backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)',
                              backgroundSize: '20px 20px'
                            }}
                          />
        
                          <div className="relative z-10">
                            <div className="flex items-center mb-2">
                              <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                              >
                                <LayoutDashboard className="w-6 h-6 text-white" />
                              </motion.div>
                              <h3 className="text-lg font-bold text-white ml-2">
                                Transport Demand
                              </h3>
                            </div>
                            <p className="text-green-50 text-sm mb-2">
                            Access Transport here 
                            </p>
                            <motion.div 
                              className="flex items-center text-white text-sm font-medium"
                              whileHover={{ x: 5 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <span>Get Started</span>
                              <ArrowRight className="ml-1 w-4 h-4" />
                            </motion.div>
                          </div>
        
                          {/* Interactive Hover Effect */}
                          <motion.div
                            className="absolute inset-0 bg-white opacity-0"
                            whileHover={{ opacity: 0.1 }}
                            transition={{ duration: 0.2 }}
                          />
                        </div>
                      </button>
                    </motion.div>
        
      </div>
    </div>
  );
};

export default FarmerHome;