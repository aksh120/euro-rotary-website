export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-luxury-black text-white selection:bg-luxury-gold selection:text-black">
            {children}
        </div>
    );
}
