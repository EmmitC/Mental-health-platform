"use client";

import { useState } from "react";
import { adminUsers, type AdminUser } from "../data/counselorMock";
import type { Page } from "@/lib/nav";
import { toast } from "../components/Toast";

interface AdminUsersProps {
  navigate: (page: Page) => void;
}

const statusBadge: Record<AdminUser["status"], string> = {
  Active: "bg-sageL text-sage",
  Inactive: "bg-sand text-slateM",
  Suspended: "bg-crisisL text-crisis",
};

export default function AdminUsers({ navigate: _navigate }: AdminUsersProps) {
  const [users, setUsers] = useState(adminUsers);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"All" | AdminUser["status"]>("All");

  const filtered = users
    .filter((u) => filterStatus === "All" || u.status === filterStatus)
    .filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    );

  const suspend = (id: string) =>
    setUsers((prev) => prev.map((u) => u.id === id ? { ...u, status: "Suspended" as const } : u));
  const activate = (id: string) =>
    setUsers((prev) => prev.map((u) => u.id === id ? { ...u, status: "Active" as const } : u));

  return (
    <div className="min-h-screen bg-cream pb-20 lg:pb-8">
      <div className="px-5 lg:px-8 py-6 border-b border-border">
        <h1 className="font-display text-2xl md:text-3xl font-[400] text-slate mb-4">Users</h1>

        <div className="flex flex-wrap gap-3 items-center">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="border border-border rounded-xl px-4 py-2.5 text-sm bg-cream outline-none transition-colors focus:border-sage w-72"
          />
          <div className="flex gap-2">
            {(["All", "Active", "Inactive", "Suspended"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilterStatus(f)}
                className={`px-3 py-1.5 rounded-full text-sm font-[500] transition-all ${
                  filterStatus === f ? "bg-sage text-cream" : "bg-sand border border-border text-slateM hover:border-sageMid"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 lg:px-8 py-6">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 text-xs font-[600] text-slateL uppercase tracking-wide">User</th>
                <th className="text-left py-3 text-xs font-[600] text-slateL uppercase tracking-wide">Joined</th>
                <th className="text-left py-3 text-xs font-[600] text-slateL uppercase tracking-wide">Sessions</th>
                <th className="text-left py-3 text-xs font-[600] text-slateL uppercase tracking-wide">Status</th>
                <th className="text-right py-3 text-xs font-[600] text-slateL uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-sand/50 transition-colors">
                  <td className="py-4 pr-4">
                    <p className="font-[500] text-slate text-sm">{u.name}</p>
                    <p className="text-slateL text-xs">{u.email}</p>
                  </td>
                  <td className="py-4 pr-4 text-slateM text-sm">{u.joinedDate}</td>
                  <td className="py-4 pr-4">
                    <span className="font-display text-xl font-[300] text-slate">{u.totalSessions}</span>
                  </td>
                  <td className="py-4 pr-4">
                    <span className={`text-xs font-[500] px-2.5 py-1 rounded-full ${statusBadge[u.status]}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex gap-2 justify-end">
                      {u.status === "Active" ? (
                        <button
                          onClick={() => suspend(u.id)}
                          className="text-xs font-[500] text-amber border border-amber/30 px-3 py-1.5 rounded-lg hover:bg-amberL transition-all"
                        >
                          Suspend
                        </button>
                      ) : (
                        <button
                          onClick={() => activate(u.id)}
                          className="text-xs font-[500] text-sage border border-sageMid px-3 py-1.5 rounded-lg hover:bg-sageL transition-all"
                        >
                          Activate
                        </button>
                      )}
                      <button onClick={() => toast("Opening user record")} className="text-xs font-[500] text-slateM border border-border px-3 py-1.5 rounded-lg hover:bg-sand transition-all">
                        View</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">

            <p className="text-slateM text-sm">No users found.</p>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between text-sm text-slateM">
          <p>Showing {filtered.length} of {users.length} users</p>
          <div className="flex gap-1">
            <button onClick={() => toast("Showing previous page")} className="px-3 py-1.5 border border-border rounded-lg hover:bg-sand transition-all">Previous</button>
            <button onClick={() => toast("Showing next page")} className="px-3 py-1.5 border border-border rounded-lg hover:bg-sand transition-all">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
