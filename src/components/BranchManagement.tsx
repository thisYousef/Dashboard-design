import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Badge } from './ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  MoreHorizontal,
  Building,
  Power,
  PowerOff,
  Calendar,
  MapPin
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  manager: string;
  createdDate: string;
  isActive: boolean;
}

export function BranchManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingBranch, setIsAddingBranch] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [newBranch, setNewBranch] = useState({
    name: '',
    address: '',
    phone: '',
    manager: ''
  });

  const [branches, setBranches] = useState<Branch[]>([
    {
      id: '1',
      name: 'الفرع الرئيسي - الرياض',
      address: 'شارع الملك فهد، حي العليا، الرياض',
      phone: '+966112345678',
      manager: 'أحمد محمد العلي',
      createdDate: '2023-01-15',
      isActive: true
    },
    {
      id: '2',
      name: 'فرع جدة',
      address: 'شارع التحلية، حي الروضة، جدة',
      phone: '+966126789012',
      manager: 'فاطمة سعد الأحمد',
      createdDate: '2023-03-20',
      isActive: true
    },
    {
      id: '3',
      name: 'فرع الدمام',
      address: 'شارع الخبر، حي الفيصلية، الدمام',
      phone: '+966138901234',
      manager: 'خالد عبدالله المطيري',
      createdDate: '2023-06-10',
      isActive: false
    },
    {
      id: '4',
      name: 'فرع الطائف',
      address: 'شارع الملك عبدالعزيز، حي الشفا، الطائف',
      phone: '+966127456789',
      manager: 'نورا حسن الزهراني',
      createdDate: '2023-09-05',
      isActive: true
    }
  ]);

  const filteredBranches = branches.filter(branch =>
    branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    branch.manager.toLowerCase().includes(searchQuery.toLowerCase()) ||
    branch.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleStatus = (branchId: string) => {
    setBranches(branches.map(branch =>
      branch.id === branchId
        ? { ...branch, isActive: !branch.isActive }
        : branch
    ));
  };

  const handleAddBranch = () => {
    if (newBranch.name.trim() && newBranch.address.trim() && newBranch.manager.trim()) {
      const branch: Branch = {
        id: Date.now().toString(),
        ...newBranch,
        createdDate: new Date().toISOString().split('T')[0],
        isActive: true
      };
      setBranches([...branches, branch]);
      setNewBranch({ name: '', address: '', phone: '', manager: '' });
      setIsAddingBranch(false);
    }
  };

  const handleEditBranch = () => {
    if (editingBranch) {
      setBranches(branches.map(branch =>
        branch.id === editingBranch.id ? editingBranch : branch
      ));
      setEditingBranch(null);
    }
  };

  const handleDeleteBranch = (branchId: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الفرع؟')) {
      setBranches(branches.filter(branch => branch.id !== branchId));
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getActiveBranchesCount = () => branches.filter(branch => branch.isActive).length;
  const getInactiveBranchesCount = () => branches.filter(branch => !branch.isActive).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>إدارة الفروع</h1>
          <p className="text-muted-foreground">
            إدارة وتنظيم الفروع وحالاتها
          </p>
        </div>
        <Dialog open={isAddingBranch} onOpenChange={setIsAddingBranch}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              إضافة فرع جديد
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>إضافة فرع جديد</DialogTitle>
              <DialogDescription>
                أدخل بيانات الفرع الجديد
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="branchName">اسم الفرع</Label>
                <Input
                  id="branchName"
                  value={newBranch.name}
                  onChange={(e) => setNewBranch({...newBranch, name: e.target.value})}
                  placeholder="أدخل اسم الفرع"
                  className="text-right"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="branchAddress">العنوان</Label>
                <Input
                  id="branchAddress"
                  value={newBranch.address}
                  onChange={(e) => setNewBranch({...newBranch, address: e.target.value})}
                  placeholder="أدخل عنوان الفرع"
                  className="text-right"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="branchPhone">رقم الهاتف</Label>
                <Input
                  id="branchPhone"
                  value={newBranch.phone}
                  onChange={(e) => setNewBranch({...newBranch, phone: e.target.value})}
                  placeholder="+966501234567"
                  className="text-right"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="branchManager">مدير الفرع</Label>
                <Input
                  id="branchManager"
                  value={newBranch.manager}
                  onChange={(e) => setNewBranch({...newBranch, manager: e.target.value})}
                  placeholder="أدخل اسم مدير الفرع"
                  className="text-right"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddingBranch(false)}>
                إلغاء
              </Button>
              <Button onClick={handleAddBranch}>
                إضافة الفرع
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الفروع</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{branches.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">الفروع النشطة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{getActiveBranchesCount()}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">الفروع غير النشطة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{getInactiveBranchesCount()}</div>
          </CardContent>
        </Card>
      </div>

      {/* جدول الفروع */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة الفروع</CardTitle>
          <CardDescription>
            إدارة جميع فروع الشركة
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 space-x-reverse mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="البحث عن فرع..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-8 text-right"
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">اسم الفرع</TableHead>
                  <TableHead className="text-right">مدير الفرع</TableHead>
                  <TableHead className="text-right">العنوان</TableHead>
                  <TableHead className="text-right">رقم الهاتف</TableHead>
                  <TableHead className="text-right">تاريخ الإضافة</TableHead>
                  <TableHead className="text-center">الحالة</TableHead>
                  <TableHead className="text-center">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBranches.map((branch) => (
                  <TableRow key={branch.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-2 text-blue-600" />
                        {branch.name}
                      </div>
                    </TableCell>
                    <TableCell>{branch.manager}</TableCell>
                    <TableCell className="max-w-xs truncate" title={branch.address}>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                        {branch.address}
                      </div>
                    </TableCell>
                    <TableCell>{branch.phone}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        {formatDate(branch.createdDate)}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleStatus(branch.id)}
                          className={`${
                            branch.isActive 
                              ? 'text-green-600 hover:text-green-700 hover:bg-green-50' 
                              : 'text-red-600 hover:text-red-700 hover:bg-red-50'
                          }`}
                        >
                          {branch.isActive ? (
                            <Power className="h-4 w-4 mr-1" />
                          ) : (
                            <PowerOff className="h-4 w-4 mr-1" />
                          )}
                        </Button>
                        <Badge variant={branch.isActive ? 'default' : 'secondary'}>
                          {branch.isActive ? 'نشط' : 'غير نشط'}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => setEditingBranch(branch)}>
                            <Edit className="mr-2 h-4 w-4" />
                            تعديل البيانات
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleStatus(branch.id)}>
                            {branch.isActive ? (
                              <>
                                <PowerOff className="mr-2 h-4 w-4" />
                                إلغاء التفعيل
                              </>
                            ) : (
                              <>
                                <Power className="mr-2 h-4 w-4" />
                                تفعيل الفرع
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDeleteBranch(branch.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            حذف الفرع
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredBranches.length === 0 && (
            <div className="text-center py-8">
              <Building className="mx-auto h-12 w-12 text-gray-400" />
              <p className="text-muted-foreground mt-2">لا توجد فروع تطابق البحث</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* نافذة تعديل الفرع */}
      <Dialog open={!!editingBranch} onOpenChange={() => setEditingBranch(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تعديل بيانات الفرع</DialogTitle>
            <DialogDescription>
              تعديل بيانات الفرع المحدد
            </DialogDescription>
          </DialogHeader>
          {editingBranch && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="editBranchName">اسم الفرع</Label>
                <Input
                  id="editBranchName"
                  value={editingBranch.name}
                  onChange={(e) => setEditingBranch({...editingBranch, name: e.target.value})}
                  className="text-right"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editBranchAddress">العنوان</Label>
                <Input
                  id="editBranchAddress"
                  value={editingBranch.address}
                  onChange={(e) => setEditingBranch({...editingBranch, address: e.target.value})}
                  className="text-right"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editBranchPhone">رقم الهاتف</Label>
                <Input
                  id="editBranchPhone"
                  value={editingBranch.phone}
                  onChange={(e) => setEditingBranch({...editingBranch, phone: e.target.value})}
                  className="text-right"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editBranchManager">مدير الفرع</Label>
                <Input
                  id="editBranchManager"
                  value={editingBranch.manager}
                  onChange={(e) => setEditingBranch({...editingBranch, manager: e.target.value})}
                  className="text-right"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingBranch(null)}>
              إلغاء
            </Button>
            <Button onClick={handleEditBranch}>
              حفظ التغييرات
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}