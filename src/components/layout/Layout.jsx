import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors justify-center">
      <div className="flex w-full max-w-[1600px]">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main role="main" aria-label="Main content" className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
