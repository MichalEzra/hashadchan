import axios from "axios";

export const adminService = {
  getCandidates: () => axios.get("/api/admin/candidates"),
  deleteCandidate: (id: number) => axios.delete(`/api/admin/candidates/${id}`),
  // וכו' גם לשדכנים ולהורים
  getMatchmakers: () => axios.get("/api/admin/matchmakers"),
  deleteMatchmakers: (id: number) => axios.delete(`/api/admin/matchmakers/${id}`),

  getParents: () => axios.get("/api/admin/parents"),
  deleteParents: (id: number) => axios.delete(`/api/admin/parents/${id}`),
};