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

const TransporterHome = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "See deals",
      description: "Find your best trips",
      icon: PackagePlus,
      path: "/transport",
      color: "from-green-600 to-green-700"
    },
    // {
    //   title: "",
    //   description: "Find bulk deal opportunities",
    //   icon: TrendingUp,
    //   path: "/farmerbestdeals",
    //   color: "from-emerald-600 to-emerald-700"
    // },
    {
      title: "DashBoard",
      description: "Track your deals here",
      icon: LineChart,
      path: "/transporterDashboard",
      color: "from-green-700 to-emerald-800"
    },
    // {
    //   title: "Dashboard",
    //   description: "Manage your business",
    //   icon: LayoutDashboard,
    //   path: "/retailerDashboard",
    //   color: "from-emerald-700 to-green-800"
    // }
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
    <div className="min-h-screen bg-gradient-to-b relative from-green-50 to-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Section with Floating Icon */}
        <motion.div 
          className="text-center mb-8 top-0 relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="absolute left-1/2 -top-6 transform -translate-x-1/2"
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
            <Sprout className="w-12 h-12 text-green-600" />
          </motion.div>
          
          <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-2">
            Welcome back, Transporter!
          </h1>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Manage your transport business effectively 
          </motion.p>
        </motion.div>

        {/* Action Cards Grid */}
        <motion.div 
          className="grid grid-cols-2 mt-20 gap-4 mb-8"
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
              className="relative group"
            >
              <button
                onClick={() => navigate(action.path)}
                className="w-full text-left focus:outline-none"
              >
                <div className={`
                  p-4 rounded-xl shadow-md
                  bg-gradient-to-r ${action.color}
                  transform transition-all duration-300
                  group-hover:shadow-lg
                  relative overflow-hidden
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

                  <div className="relative z-10">
                    <div className="flex items-center mb-2">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <action.icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <h3 className="text-lg font-bold text-white ml-2">
                        {action.title}
                      </h3>
                    </div>
                    <p className="text-green-50 text-sm mb-2">
                      {action.description}
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
          ))}
        </motion.div>

   

        {/* Animated Stats Section */}
        {/* <motion.div
          variants={statsVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-xl shadow-md p-6"
        >
          <motion.h2 
            className="text-xl font-semibold text-gray-900 mb-4 text-center"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Quick Stats
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "12", label: "Active Listings" },
              { value: "₹45K", label: "Weekly Revenue" },
              { value: "8", label: "Pending Deals" },
              { value: "95%", label: "Success Rate" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <motion.div 
                  className="text-2xl font-bold text-green-600"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-xs text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div> */}
      </div>
    </div>
  );
};

export default TransporterHome;