import React from "react";

const SponsorDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-white shadow-md p-4 text-center text-xl font-bold">
        Sponsor Dashboard
      </header>
      <main className="max-w-4xl mx-auto mt-6 p-4 bg-white shadow rounded-lg">
        <h2 className="text-lg font-semibold">Welcome, Sponsor</h2>
        <p className="text-gray-600 mt-2">Manage your recipient's health updates and reports.</p>
        <div className="mt-4 space-y-3">
          <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
            View Health Reports
          </button>
          <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
            Manage Subscription
          </button>
          <button className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600">
            Set Notifications
          </button>
        </div>
      </main>
    </div>
  );
};

export default SponsorDashboard;
