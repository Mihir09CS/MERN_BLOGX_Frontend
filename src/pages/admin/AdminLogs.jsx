import React, { useEffect, useState } from "react";
import { adminAPI } from "../../api/axios";
import { ADMIN_ENDPOINTS } from "../../api/endpoints";

export default function AdminLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const { data } = await adminAPI.get(ADMIN_ENDPOINTS.LOGS);
      setLogs(data.logs || data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load activity logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  if (loading) {
    return <div className="p-6">Loading activity logs…</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Activity Logs</h1>

      <div className="overflow-x-auto bg-white border rounded-lg shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="px-4 py-3 text-left">Admin</th>
              <th className="px-4 py-3 text-left">Action</th>
              <th className="px-4 py-3 text-left">Target</th>
              <th className="px-4 py-3 text-left">Metadata</th>
              <th className="px-4 py-3 text-left">Timestamp</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr key={log._id} className="border-t hover:bg-slate-50">
                <td className="px-4 py-3">{log.admin?.email || "—"}</td>

                <td className="px-4 py-3 font-medium">{log.action}</td>

                <td className="px-4 py-3">
                  {log.targetType}
                  {log.targetId && (
                    <span className="text-xs text-slate-500">
                      {" "}
                      ({log.targetId})
                    </span>
                  )}
                </td>

                <td className="px-4 py-3 max-w-sm text-xs text-slate-600">
                  {log.metadata ? JSON.stringify(log.metadata) : "—"}
                </td>

                <td className="px-4 py-3">
                  {new Date(log.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}

            {logs.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="px-4 py-6 text-center text-slate-500"
                >
                  No activity logs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
