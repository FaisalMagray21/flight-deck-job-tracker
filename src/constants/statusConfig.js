// statusConfig.js — har status ki styling info ek hi jagah
// Isse age components mein hardcode nahi karna padega baar baar

const STATUS_CONFIG = {
  Applied: {
    label: "APPLIED",
    dotColor: "#FBBF24",       // amber
    textLight: "#B45309",
    textDark: "#FBBF24",
    bgTint: "rgba(251, 191, 36, 0.12)",
  },
  Interview: {
    label: "INTERVIEW",
    dotColor: "#38BDF8",       // sky blue
    textLight: "#0369A1",
    textDark: "#38BDF8",
    bgTint: "rgba(56, 189, 248, 0.12)",
  },
  Offer: {
    label: "OFFER",
    dotColor: "#34D399",       // jade green
    textLight: "#047857",
    textDark: "#34D399",
    bgTint: "rgba(52, 211, 153, 0.12)",
  },
  Rejected: {
    label: "REJECTED",
    dotColor: "#F87171",       // rose red
    textLight: "#B91C1C",
    textDark: "#F87171",
    bgTint: "rgba(248, 113, 113, 0.12)",
  },
};

// Sirf status ki list chahiye ho to (dropdown banane ke liye)
const STATUS_LIST = ["Applied", "Interview", "Offer", "Rejected"];