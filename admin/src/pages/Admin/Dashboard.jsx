import React, { useContext, useEffect, useState } from "react";
import AdminContext from "../../context/adminContext";
import { assets } from "../../assets/assets";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const { getDashboardData, aToken } = useContext(AdminContext);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    setLoading(true);
    const data = await getDashboardData();
    if (data) {
      setDashboardData(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (aToken) {
      fetchDashboardData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aToken]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-500"></div>
      </div>
    );
  }

  if (!dashboardData) {
    return <div className="p-8 text-center text-gray-500">Failed to load dashboard data</div>;
  }

  // --- Chart Data Preparation ---
  const lineChartData = {
    labels: dashboardData.last7DaysAppointments.map((item) => {
      const date = new Date(item.date);
      return date.toLocaleDateString("en-US", {
        weekday: "short",
      });
    }),
    datasets: [
      {
        label: "Appointments",
        data: dashboardData.last7DaysAppointments.map((item) => item.count),
        fill: true,
        backgroundColor: "rgba(99, 102, 241, 0.1)", // Indigo-100/200
        borderColor: "rgba(99, 102, 241, 1)", // Indigo-500
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#fff",
        pointBorderColor: "rgba(99, 102, 241, 1)",
        pointBorderWidth: 2,
      },
    ],
  };

  const pieChartData = {
    labels: ["Pending", "Completed", "Cancelled"],
    datasets: [
      {
        data: [
          dashboardData.statusDistribution.pending,
          dashboardData.statusDistribution.completed,
          dashboardData.statusDistribution.cancelled,
        ],
        backgroundColor: [
          "#fbbf24", // Amber-400
          "#34d399", // Emerald-400
          "#f87171", // Red-400
        ],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Cleaner look without default legend
      },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.9)",
        padding: 12,
        cornerRadius: 8,
      }
    },
    scales: {
        x: { grid: { display: false } },
        y: { grid: { borderDash: [4, 4], color: '#f3f4f6' }, min: 0, ticks: { stepSize: 1 } }
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8 bg-gray-50 min-h-screen">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
           <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
           <p className="text-gray-500 text-sm mt-1">Welcome back, Administrator</p>
        </div>
        <div className="mt-4 md:mt-0">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                Generate Report
            </button>
        </div>
      </div>

      {/* 2. KPI Cards (Styled like screenshot) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        
        {/* Card 1: Doctors */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
             <img src={assets.doctor_icon} alt="doctors" className="w-8 h-8 object-contain opacity-80" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{dashboardData.totalDoctors}</h2>
            <p className="text-gray-500 text-sm font-medium">Doctors</p>
          </div>
        </div>

        {/* Card 2: Appointments */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
            <img src={assets.appointments_icon} alt="appointments" className="w-7 h-7 object-contain opacity-80" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{dashboardData.totalAppointments}</h2>
            <p className="text-gray-500 text-sm font-medium">Appointments</p>
          </div>
        </div>

        {/* Card 3: Patients */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600">
            <img src={assets.patients_icon} alt="patients" className="w-7 h-7 object-contain opacity-80" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{dashboardData.totalPatients}</h2>
            <p className="text-gray-500 text-sm font-medium">Patients</p>
          </div>
        </div>

        {/* Card 4: Today's Appt */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
            <img src={assets.appointment_icon} alt="today" className="w-7 h-7 object-contain opacity-80" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{dashboardData.todaysAppointments}</h2>
            <p className="text-gray-500 text-sm font-medium">Today's Bookings</p>
          </div>
        </div>

         {/* Card 5: Revenue */}
         <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-orange-50 rounded-lg flex items-center justify-center text-orange-600">
             <img src={assets.earning_icon} alt="revenue" className="w-7 h-7 object-contain opacity-80" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">₹{dashboardData.totalRevenue}</h2>
            <p className="text-gray-500 text-sm font-medium">Total Revenue</p>
          </div>
        </div>

      </div>

      {/* 3. Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Line Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
           <div className="flex justify-between items-center mb-6">
             <h3 className="font-semibold text-gray-800">Appointment Analytics</h3>
             <select className="bg-gray-50 border border-gray-200 text-xs rounded-md px-2 py-1 outline-none text-gray-600">
                <option>Last 7 Days</option>
             </select>
           </div>
           <div className="h-72">
             <Line data={lineChartData} options={chartOptions} />
           </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex flex-col">
            <h3 className="font-semibold text-gray-800 mb-6">Status Distribution</h3>
            <div className="flex-1 flex items-center justify-center relative h-52">
                <Pie data={pieChartData} options={{...chartOptions, plugins: { legend: { display: true, position: 'bottom', labels: { usePointStyle: true, boxWidth: 8 } } } }} />
            </div>
        </div>
      </div>

      {/* 4. Bottom Section: Recent Bookings */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
             <h3 className="font-semibold text-gray-800">Latest Bookings</h3>
             <p className="text-blue-600 text-sm cursor-pointer hover:underline">View All</p>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Patient Name</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Doctor</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Date</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {dashboardData.recentAppointments.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 text-sm font-medium text-gray-800">{item.patientName}</td>
                            <td className="px-6 py-4 text-sm text-gray-600 flex items-center gap-2">
                                {/* Assuming doctor image might not be in recentAppointments, otherwise add img here */}
                                {item.doctorName}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">{item.date} <span className="text-xs text-gray-400 ml-1">{item.time}</span></td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                                    ${item.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                                      item.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 
                                      'bg-yellow-100 text-yellow-800'}`}>
                                    {item.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;