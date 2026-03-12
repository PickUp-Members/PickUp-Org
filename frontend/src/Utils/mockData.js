export const mockUsers = [
  {
    id: 1,
    fullName: "Yasas Lasitha",
    email: "yasas@pickup.lk",
    role: "BUYER",
    sellerRequestStatus: "NONE",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yasas",
    address: "University of Vavuniya, Vavuniya",
    createdAt: "2026-01-20"
  },
  {
    id: 2,
    fullName: "Chamara Perera",
    email: "chamara@shop.lk",
    role: "SELLER",
    sellerRequestStatus: "APPROVED",
    businessDetails: {
      name: "Chamara's Tech Hub",
      description: "Premium electronics and gaming gear in Negombo.",
      contact: "+94 77 123 4567"
    },
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chamara",
    createdAt: "2026-02-15"
  },
  {
    id: 3,
    fullName: "Admin User",
    email: "admin@pickup.lk",
    role: "ADMIN",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
    createdAt: "2026-01-01"
  },
  {
    id: 4,
    fullName: "Saman Kumara",
    email: "saman@gmail.com",
    role: "BUYER",
    sellerRequestStatus: "PENDING", // Used for the Admin Verification Portal
    businessDetails: {
      name: "Saman's Collectibles",
      description: "Selling rare vintage coins and watches.",
      contact: "+94 71 987 6543"
    },
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Saman"
  }
];