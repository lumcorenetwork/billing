import '../globals.css';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import AuthGuard from '../components/AuthGuard';

export const metadata = {
  title: 'LumeCore Staff Panel',
  description: 'Modern staff portal dashboard for LumeCore',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0f172a] text-[#f8fafc] min-h-screen flex flex-col">
        <TopBar />
        <div className="flex flex-1 min-h-0">
          <AuthGuard>
            <Sidebar />
            <main className="flex-1 p-8 bg-[#0f172a]">
              {children}
            </main>
          </AuthGuard>
        </div>
      </body>
    </html>
  );
}
