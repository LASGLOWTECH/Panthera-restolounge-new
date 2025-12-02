// app/(public)/layout.js
import Layout from "@/components/Layout";
import ScrollTop from "@/components/scrolltop";
export default function PublicLayout({ children }) {
  return <Layout>{children}
  
  
  {/* 2. Render the component here */}
      <ScrollTop /></Layout>;
}
