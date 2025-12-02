// app/(public)/layout.js
import Layout from "@/components/Layout";
import SiteLoader from "@/components/SiteLoader";
import ScrollTop from "@/components/scrolltop";
export default function PublicLayout({ children }) {
  return <Layout>

    <SiteLoader />{children}

    <ScrollTop /></Layout>;
}
