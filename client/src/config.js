const env = import.meta.env;
export const store = {
  name: "Abhishek Kirana Store",
  phone: env.VITE_STORE_PHONE || "",
  whatsapp: (env.VITE_STORE_WHATSAPP || env.VITE_STORE_PHONE || "").replace(/\D/g, ""),
  address: env.VITE_STORE_ADDRESS || "Ambamoliya, Indore, Madhya Pradesh",
  hours: env.VITE_STORE_HOURS || "Mon–Sun · 8:00 AM – 10:00 PM"
};
