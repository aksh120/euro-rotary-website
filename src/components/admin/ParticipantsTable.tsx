"use client";
import { useState } from "react";
import { Settings, Edit, Trash2, Check, X } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

interface Participant {
  id: string;
  full_name: string;
  email: string;
  gender: string;
  age: string;
  bib_number: string | null;
  status: "pending" | "confirmed";
  [key: string]: any;
}

interface ParticipantsTableProps {
  participants: Participant[];
  loading: boolean;
  onRefresh: () => void;
  limit?: number;
}

export function ParticipantsTable({
  participants,
  loading,
  onRefresh,
  limit,
}: ParticipantsTableProps) {
  const [activeRowId, setActiveRowId] = useState<string | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingParticipant, setEditingParticipant] =
    useState<Participant | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const toggleActionMenu = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveRowId(activeRowId === id ? null : id);
  };

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this participant? This action cannot be undone.",
      )
    )
      return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/participants/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete");
      }
      onRefresh();
      setActiveRowId(null);
    } catch (err: any) {
      console.error(err);
      alert(`Error: ${err.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditClick = (participant: Participant) => {
    setEditingParticipant(participant);
    setIsEditOpen(true);
    setActiveRowId(null);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingParticipant) return;

    try {
      const res = await fetch(
        `/api/admin/participants/${editingParticipant.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            full_name: editingParticipant.full_name,
            email: editingParticipant.email,
            gender: editingParticipant.gender,
            age: editingParticipant.age,
            bib_number: editingParticipant.bib_number,
            status: editingParticipant.status,
          }),
        },
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update");
      }

      setIsEditOpen(false);
      onRefresh();
    } catch (err: any) {
      console.error(err);
      alert(`Error: ${err.message}`);
    }
  };

  const displayData = limit ? participants.slice(0, limit) : participants;

  return (
    <>
      <div className="overflow-x-auto min-h-[300px]">
        <table className="w-full text-left min-w-[800px]">
          <thead className="bg-black/40 text-[10px] uppercase font-mono tracking-wider text-luxury-silver/60">
            <tr>
              <th className="px-6 py-4 font-normal">Participant</th>
              <th className="px-6 py-4 font-normal">Details</th>
              <th className="px-6 py-4 font-normal">Bib Assignment</th>
              <th className="px-6 py-4 font-normal">Status</th>
              <th className="px-6 py-4 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-20 text-luxury-silver/40 animate-pulse"
                >
                  Establishing uplink...
                </td>
              </tr>
            ) : displayData.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-20 text-luxury-silver/40"
                >
                  No signal found. (0 Records)
                </td>
              </tr>
            ) : (
              displayData.map((p) => (
                <tr
                  key={p.id}
                  className="group hover:bg-white/[0.02] transition-colors relative"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center text-xs font-bold text-luxury-gold border border-white/5">
                        {p.full_name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm group-hover:text-luxury-gold transition-colors">
                          {p.full_name}
                        </p>
                        <p className="text-luxury-silver/30 text-xs">
                          {p.email || "No email"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-luxury-silver/60">
                      <p>
                        <span className="text-white/20 uppercase tracking-wide mr-2">
                          Sex:
                        </span>{" "}
                        {p.gender}
                      </p>
                      <p>
                        <span className="text-white/20 uppercase tracking-wide mr-2">
                          Age:
                        </span>{" "}
                        {p.age || "N/A"}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-luxury-gold text-sm bg-luxury-gold/5 px-2 py-1 rounded border border-luxury-gold/10">
                      #{p.bib_number || "---"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wide border ${
                        p.status === "confirmed"
                          ? "bg-green-500/5 text-green-400 border-green-500/20"
                          : "bg-yellow-500/5 text-yellow-400 border-yellow-500/20"
                      }`}
                    >
                      <span
                        className={`w-1 h-1 rounded-full ${
                          p.status === "confirmed"
                            ? "bg-green-400"
                            : "bg-yellow-400"
                        } animate-pulse`}
                      />
                      {p.status === "confirmed"
                        ? "Verified"
                        : "Pending Payment"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right relative">
                    <button
                      className={`text-luxury-silver/40 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg active:bg-white/10 ${
                        activeRowId === p.id ? "text-white bg-white/5" : ""
                      }`}
                      onClick={(e) => toggleActionMenu(p.id, e)}
                    >
                      <Settings size={16} />
                    </button>

                    {}
                    {activeRowId === p.id && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setActiveRowId(null)}
                        />
                        <div className="absolute right-12 top-2 w-32 bg-[#111] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                          <button
                            onClick={() => handleEditClick(p)}
                            className="flex items-center gap-2 w-full px-4 py-2 text-xs text-luxury-silver hover:text-white hover:bg-white/5 text-left transition-colors"
                          >
                            <Edit size={12} /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="flex items-center gap-2 w-full px-4 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 text-left border-t border-white/5 transition-colors"
                          >
                            <Trash2 size={12} /> Delete
                          </button>
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {}
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Configuration"
      >
        {editingParticipant && (
          <form onSubmit={handleSaveEdit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-luxury-silver/60 tracking-wider">
                Full Name
              </label>
              <input
                type="text"
                value={editingParticipant.full_name}
                onChange={(e) =>
                  setEditingParticipant({
                    ...editingParticipant,
                    full_name: e.target.value,
                  })
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-luxury-gold/50 focus:ring-1 focus:ring-luxury-gold/20 outline-none transition-all placeholder:text-white/20"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-luxury-silver/60 tracking-wider">
                  Age
                </label>
                <input
                  type="number"
                  value={editingParticipant.age || ""}
                  onChange={(e) =>
                    setEditingParticipant({
                      ...editingParticipant,
                      age: e.target.value,
                    })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-luxury-gold/50 focus:ring-1 focus:ring-luxury-gold/20 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-luxury-silver/60 tracking-wider">
                  Gender
                </label>
                <select
                  value={editingParticipant.gender}
                  onChange={(e) =>
                    setEditingParticipant({
                      ...editingParticipant,
                      gender: e.target.value,
                    })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-luxury-gold/50 focus:ring-1 focus:ring-luxury-gold/20 outline-none transition-all appearance-none"
                >
                  <option value="male" className="bg-black">
                    Male
                  </option>
                  <option value="female" className="bg-black">
                    Female
                  </option>
                  <option value="other" className="bg-black">
                    Other
                  </option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-luxury-silver/60 tracking-wider">
                Bib Number
              </label>
              <input
                type="text"
                value={editingParticipant.bib_number || ""}
                onChange={(e) =>
                  setEditingParticipant({
                    ...editingParticipant,
                    bib_number: e.target.value,
                  })
                }
                placeholder="Auto-assigned if empty"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-luxury-gold/50 focus:ring-1 focus:ring-luxury-gold/20 outline-none transition-all placeholder:text-white/20"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-luxury-silver/60 tracking-wider">
                Status
              </label>
              <select
                value={editingParticipant.status}
                onChange={(e) =>
                  setEditingParticipant({
                    ...editingParticipant,
                    status: e.target.value as "pending" | "confirmed",
                  })
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-luxury-gold/50 focus:ring-1 focus:ring-luxury-gold/20 outline-none transition-all appearance-none"
              >
                <option value="pending" className="bg-black">
                  Pending Payment
                </option>
                <option value="confirmed" className="bg-black text-green-400">
                  Verified / Paid
                </option>
              </select>
            </div>

            <div className="pt-6 flex justify-end gap-3 border-t border-white/5 mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditOpen(false)}
                className="border-white/10 text-luxury-silver hover:bg-white/5 hover:text-white px-6"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-luxury-gold text-black font-semibold hover:bg-yellow-500 px-6 shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all"
              >
                Save Changes
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
}
