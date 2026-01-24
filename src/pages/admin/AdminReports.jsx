import React, { useEffect, useState } from "react";
import { adminAPI } from "../../api/axios";
import { ADMIN_ENDPOINTS } from "../../api/endpoints";

export default function AdminReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReports = async () => {
    try {
      setLoading(true);
      const { data } = await adminAPI.get(ADMIN_ENDPOINTS.REPORTS);
      setReports(data.reports || data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleReview = async (reportId) => {
    try {
      await adminAPI.patch(ADMIN_ENDPOINTS.REVIEW_REPORT(reportId));
      fetchReports();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to mark report as reviewed");
    }
  };

  if (loading) {
    return <div className="p-6">Loading reports…</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Blog Reports</h1>

      <div className="overflow-x-auto bg-white border rounded-lg shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="px-4 py-3 text-left">Blog</th>
              <th className="px-4 py-3 text-left">Reason</th>
              <th className="px-4 py-3 text-left">Reported By</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {reports.map((report) => (
              <tr key={report._id} className="border-t hover:bg-slate-50">
                <td className="px-4 py-3">{report.blog?.title || "—"}</td>

                <td className="px-4 py-3">{report.reason}</td>

                <td className="px-4 py-3">{report.reportedBy?.email || "—"}</td>

                <td className="px-4 py-3">
                  {report.status === "reviewed" ? (
                    <span className="text-green-600 font-medium">Reviewed</span>
                  ) : (
                    <span className="text-yellow-600 font-medium">Pending</span>
                  )}
                </td>

                <td className="px-4 py-3 text-right">
                  {report.status !== "reviewed" && (
                    <button
                      onClick={() => handleReview(report._id)}
                      className="px-3 py-1 text-xs rounded text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Mark Reviewed
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {reports.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="px-4 py-6 text-center text-slate-500"
                >
                  No reports found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
