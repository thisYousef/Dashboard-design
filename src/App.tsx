import { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { AdminDashboard } from './components/AdminDashboard';
import { MerchantDashboard } from './components/MerchantDashboard';
import { UserManagement } from './components/UserManagement';
import { CreateOrder } from './components/CreateOrder';
import { UserGroupsSettings } from './components/UserGroupsSettings';
import { RegionsManagement } from './components/RegionsManagement';
import { OrderManagement } from './components/OrderManagement';
import { AddUser } from './components/AddUser';
import { BranchManagement } from './components/BranchManagement';
import { EmployeeDashboard } from './components/EmployeeDashboard';
import { WeightSettings } from './components/WeightSettings';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'merchant' | 'delivery' | 'employee';
  username: string;
};

type Page = 
  | 'login'
  | 'admin-dashboard'
  | 'merchant-dashboard'
  | 'employee-dashboard'
  | 'user-management'
  | 'create-order'
  | 'user-groups'
  | 'regions-management'
  | 'order-management'
  | 'add-user'
  | 'branch-management'
  | 'weight-settings';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (username: string, password: string) => {
    // Mock authentication
    let mockUser: User;
    
    if (username === 'admin') {
      mockUser = {
        id: '1',
        name: 'أحمد محمد',
        email: 'admin@shipping.com',
        role: 'admin',
        username: username
      };
    } else if (username === 'employee') {
      mockUser = {
        id: '2',
        name: 'سارة أحمد',
        email: 'employee@shipping.com',
        role: 'employee',
        username: username
      };
    } else {
      mockUser = {
        id: '3',
        name: 'تاجر مثال',
        email: 'merchant@example.com',
        role: 'merchant',
        username: username
      };
    }
    
    setCurrentUser(mockUser);
    
    // تحديد الصفحة الرئيسية حسب الدور
    if (mockUser.role === 'admin') {
      setCurrentPage('admin-dashboard');
    } else if (mockUser.role === 'employee') {
      setCurrentPage('employee-dashboard');
    } else {
      setCurrentPage('merchant-dashboard');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('login');
  };

  if (currentPage === 'login') {
    return <Login onLogin={handleLogin} />;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'admin-dashboard':
        return <AdminDashboard onNavigate={setCurrentPage} />;
      case 'merchant-dashboard':
        return <MerchantDashboard />;
      case 'employee-dashboard':
        return <EmployeeDashboard />;
      case 'user-management':
        return <UserManagement onNavigate={setCurrentPage} />;
      case 'create-order':
        return <CreateOrder currentUser={currentUser} />;
      case 'user-groups':
        return <UserGroupsSettings />;
      case 'regions-management':
        return <RegionsManagement />;
      case 'order-management':
        return <OrderManagement />;
      case 'add-user':
        return <AddUser onBack={() => setCurrentPage('user-management')} />;
      case 'branch-management':
        return <BranchManagement />;
      case 'weight-settings':
        return <WeightSettings />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50" dir="rtl">
      <Sidebar 
        currentPage={currentPage} 
        onPageChange={setCurrentPage}
        userRole={currentUser?.role || 'admin'}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          user={currentUser}
          onLogout={handleLogout}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {renderCurrentPage()}
        </main>
      </div>
    </div>
  );
}