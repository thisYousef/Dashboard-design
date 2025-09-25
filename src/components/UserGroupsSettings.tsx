import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  Shield,
  Settings,
  Eye,
  Save,
  X
} from 'lucide-react';
import { Separator } from './ui/separator';

// أنواع الصلاحيات المطلوبة
const permissionTypes = [
  { id: 'permissions', name: 'الصلاحيات', description: 'إدارة صلاحيات المستخدمين والمجموعات' },
  { id: 'settings', name: 'الاعدادات', description: 'إعدادات النظام العامة' },
  { id: 'banks', name: 'البنوك', description: 'إدارة الحسابات البنكية' },
  { id: 'warehouses', name: 'الخزن', description: 'إدارة المخازن والمستودعات' },
  { id: 'branches', name: 'الأفرع', description: 'إدارة فروع الشركة' },
  { id: 'employees', name: 'الموظفين', description: 'إدارة موظفي النظام' },
  { id: 'merchants', name: 'التجار', description: 'إدارة حسابات التجار' },
  { id: 'couriers', name: 'المناديب', description: 'إدارة مناديب التوصيل' },
  { id: 'governorates', name: 'المحافظات', description: 'إدارة المحافظات' },
  { id: 'cities', name: 'المدن', description: 'إدارة المدن والمناطق' },
  { id: 'orders', name: 'الطلبات', description: 'إدارة طلبات الشحن' },
  { id: 'accounts', name: 'الحسابات', description: 'إدارة الحسابات المالية' },
  { id: 'order_reports', name: 'تقارير الطلبات', description: 'عرض وإدارة تقارير الطلبات' }
];

// العمليات المتاحة لكل نوع صلاحية
const operations = [
  { id: 'view', name: 'عرض', description: 'إمكانية عرض البيانات فقط' },
  { id: 'add', name: 'اضافة', description: 'إمكانية إضافة بيانات جديدة' },
  { id: 'edit', name: 'تعديل', description: 'إمكانية تعديل البيانات الموجودة' },
  { id: 'delete', name: 'حذف', description: 'إمكانية حذف البيانات' }
];

const userGroups = [
  {
    id: '1',
    name: 'مديري النظام',
    description: 'صلا��يات كاملة لإدارة النظام',
    userCount: 3,
    permissions: {
      permissions: ['view', 'add', 'edit', 'delete'],
      settings: ['view', 'add', 'edit', 'delete'],
      banks: ['view', 'add', 'edit', 'delete'],
      warehouses: ['view', 'add', 'edit', 'delete'],
      branches: ['view', 'add', 'edit', 'delete'],
      employees: ['view', 'add', 'edit', 'delete'],
      merchants: ['view', 'add', 'edit', 'delete'],
      couriers: ['view', 'add', 'edit', 'delete'],
      governorates: ['view', 'add', 'edit', 'delete'],
      cities: ['view', 'add', 'edit', 'delete'],
      orders: ['view', 'add', 'edit', 'delete'],
      accounts: ['view', 'add', 'edit', 'delete'],
      order_reports: ['view', 'add', 'edit', 'delete']
    }
  },
  {
    id: '2',
    name: 'التجار',
    description: 'التجار وأصحاب المتاجر',
    userCount: 45,
    permissions: {
      permissions: [],
      settings: [],
      banks: [],
      warehouses: [],
      branches: [],
      employees: [],
      merchants: ['view'],
      couriers: ['view'],
      governorates: ['view'],
      cities: ['view'],
      orders: ['view', 'add', 'edit'],
      accounts: ['view'],
      order_reports: ['view']
    }
  },
  {
    id: '3',
    name: 'مندوبو التوصيل',
    description: 'مندوبو توصيل الطلبات',
    userCount: 23,
    permissions: {
      permissions: [],
      settings: [],
      banks: [],
      warehouses: [],
      branches: [],
      employees: [],
      merchants: [],
      couriers: ['view'],
      governorates: ['view'],
      cities: ['view'],
      orders: ['view', 'edit'],
      accounts: [],
      order_reports: []
    }
  },
  {
    id: '4',
    name: 'المحاسبين',
    description: 'قسم المحاسبة والمالية',
    userCount: 5,
    permissions: {
      permissions: [],
      settings: [],
      banks: ['view', 'add', 'edit'],
      warehouses: ['view'],
      branches: ['view'],
      employees: ['view'],
      merchants: ['view'],
      couriers: ['view'],
      governorates: ['view'],
      cities: ['view'],
      orders: ['view'],
      accounts: ['view', 'add', 'edit', 'delete'],
      order_reports: ['view', 'add']
    }
  }
];

export function UserGroupsSettings() {
  const [selectedGroup, setSelectedGroup] = useState(userGroups[0]);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [isEditingPermissions, setIsEditingPermissions] = useState(false);
  const [tempPermissions, setTempPermissions] = useState<any>({});

  const handleEditPermissions = () => {
    setTempPermissions(JSON.parse(JSON.stringify(selectedGroup.permissions)));
    setIsEditingPermissions(true);
  };

  const handleSavePermissions = () => {
    // هنا سيتم حفظ الصلاحيات في قاعدة البيانات
    console.log('Saving permissions:', tempPermissions);
    setIsEditingPermissions(false);
    
    // تحديث الصلاحيات في الكائن المحلي (في التطبيق الحقيقي سيكون عبر API)
    const updatedGroups = userGroups.map(group => 
      group.id === selectedGroup.id 
        ? { ...group, permissions: tempPermissions }
        : group
    );
    
    setSelectedGroup({
      ...selectedGroup,
      permissions: tempPermissions
    });
  };

  const handleCancelEdit = () => {
    setTempPermissions({});
    setIsEditingPermissions(false);
  };

  const handlePermissionChange = (permissionType: string, operation: string, checked: boolean) => {
    const currentPermissions = tempPermissions[permissionType] || [];
    
    if (checked) {
      if (!currentPermissions.includes(operation)) {
        setTempPermissions({
          ...tempPermissions,
          [permissionType]: [...currentPermissions, operation]
        });
      }
    } else {
      setTempPermissions({
        ...tempPermissions,
        [permissionType]: currentPermissions.filter((op: string) => op !== operation)
      });
    }
  };

  const handleSelectAllForType = (permissionType: string, checked: boolean) => {
    if (checked) {
      setTempPermissions({
        ...tempPermissions,
        [permissionType]: ['view', 'add', 'edit', 'delete']
      });
    } else {
      setTempPermissions({
        ...tempPermissions,
        [permissionType]: []
      });
    }
  };

  const isOperationChecked = (permissionType: string, operation: string) => {
    if (isEditingPermissions) {
      const permissions = tempPermissions[permissionType] || [];
      return permissions.includes(operation);
    } else {
      const permissions = selectedGroup.permissions[permissionType] || [];
      return permissions.includes(operation);
    }
  };

  const isAllOperationsChecked = (permissionType: string) => {
    if (isEditingPermissions) {
      const permissions = tempPermissions[permissionType] || [];
      return permissions.length === 4;
    } else {
      const permissions = selectedGroup.permissions[permissionType] || [];
      return permissions.length === 4;
    }
  };

  const handleCreateGroup = () => {
    if (newGroupName.trim()) {
      // منطق إنشاء المجموعة الجديدة
      console.log('Creating group:', {
        name: newGroupName,
        description: newGroupDescription
      });
      
      setNewGroupName('');
      setNewGroupDescription('');
      setIsCreatingGroup(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>مجموعات المستخدمين والأذونات</h1>
          <p className="text-muted-foreground">
            إدارة مجموعات المستخدمين وتحديد صلاحياتهم التفصيلية
          </p>
        </div>
        <Button 
          onClick={() => setIsCreatingGroup(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          إنشاء مجموعة جديدة
        </Button>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">إجمالي المجموعات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userGroups.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">إجمالي المستخدمين</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {userGroups.reduce((sum, group) => sum + group.userCount, 0)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">أنواع الصلاحيات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{permissionTypes.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">المجموعة الأكبر</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-base font-bold">
              {userGroups.reduce((max, group) => 
                group.userCount > max.userCount ? group : max
              ).name}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* قائمة المجموعات */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              المجموعات الموجودة
            </CardTitle>
            <CardDescription>
              اختر مجموعة لعرض أو تعديل صلاحياتها
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {userGroups.map((group) => (
              <div
                key={group.id}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedGroup.id === group.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => {
                  setSelectedGroup(group);
                  setIsEditingPermissions(false);
                }}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{group.name}</h4>
                  <Badge variant="secondary">{group.userCount}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {group.description}
                </p>
              </div>
            ))}

            {/* نموذج إنشاء مجموعة جديدة */}
            {isCreatingGroup && (
              <div className="p-3 border-2 border-dashed border-blue-300 rounded-lg space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="newGroupName">اسم المجموعة</Label>
                  <Input
                    id="newGroupName"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    placeholder="أدخل اسم المجموعة"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newGroupDescription">الوصف</Label>
                  <Input
                    id="newGroupDescription"
                    value={newGroupDescription}
                    onChange={(e) => setNewGroupDescription(e.target.value)}
                    placeholder="وصف المجموعة"
                    className="text-right"
                  />
                </div>
                <div className="flex space-x-2 space-x-reverse">
                  <Button 
                    size="sm"
                    onClick={handleCreateGroup}
                    disabled={!newGroupName.trim()}
                  >
                    إنشاء
                  </Button>
                  <Button 
                    size="sm"
                    variant="outline" 
                    onClick={() => {
                      setIsCreatingGroup(false);
                      setNewGroupName('');
                      setNewGroupDescription('');
                    }}
                  >
                    إلغاء
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* جدول الصلاحيات */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Shield className="h-5 w-5" />
                <div>
                  <CardTitle>صلاحيات المجموعة: {selectedGroup.name}</CardTitle>
                  <CardDescription>{selectedGroup.description}</CardDescription>
                </div>
              </div>
              
              <div className="flex space-x-2 space-x-reverse">
                {!isEditingPermissions ? (
                  <Button onClick={handleEditPermissions} className="bg-blue-600 hover:bg-blue-700">
                    <Edit className="h-4 w-4 mr-2" />
                    تعديل الصلاحيات
                  </Button>
                ) : (
                  <>
                    <Button onClick={handleSavePermissions} className="bg-green-600 hover:bg-green-700">
                      <Save className="h-4 w-4 mr-2" />
                      حفظ التغييرات
                    </Button>
                    <Button onClick={handleCancelEdit} variant="outline">
                      <X className="h-4 w-4 mr-2" />
                      إلغاء
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right font-medium">نوع الصلاحية</TableHead>
                    <TableHead className="text-center font-medium">الكل</TableHead>
                    <TableHead className="text-center font-medium">عرض</TableHead>
                    <TableHead className="text-center font-medium">اضافة</TableHead>
                    <TableHead className="text-center font-medium">تعديل</TableHead>
                    <TableHead className="text-center font-medium">حذف</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {permissionTypes.map((permissionType) => (
                    <TableRow key={permissionType.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{permissionType.name}</p>
                          <p className="text-sm text-muted-foreground">{permissionType.description}</p>
                        </div>
                      </TableCell>
                      
                      {/* تحديد الكل */}
                      <TableCell className="text-center">
                        <Checkbox
                          checked={isAllOperationsChecked(permissionType.id)}
                          onCheckedChange={(checked) => 
                            isEditingPermissions && handleSelectAllForType(permissionType.id, checked as boolean)
                          }
                          disabled={!isEditingPermissions}
                        />
                      </TableCell>
                      
                      {/* العمليات الفردية */}
                      {operations.map((operation) => (
                        <TableCell key={operation.id} className="text-center">
                          <Checkbox
                            checked={isOperationChecked(permissionType.id, operation.id)}
                            onCheckedChange={(checked) => 
                              isEditingPermissions && handlePermissionChange(permissionType.id, operation.id, checked as boolean)
                            }
                            disabled={!isEditingPermissions}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {!isEditingPermissions && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <Eye className="h-4 w-4 inline mr-1" />
                  وضع العرض فقط. اضغط على "تعديل الصلاحيات" لإجراء تغييرات.
                </p>
              </div>
            )}

            {isEditingPermissions && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700">
                  <Edit className="h-4 w-4 inline mr-1" />
                  وضع التعديل نشط. قم بتعديل الصلاحيات ثم اضغط "حفظ التغييرات".
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* معلومات إضافية */}
      <Card>
        <CardHeader>
          <CardTitle>معلومات المجموعة المحددة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <Label>اسم المجموعة</Label>
              <p className="font-medium mt-1">{selectedGroup.name}</p>
            </div>
            <div>
              <Label>عدد المستخدمين</Label>
              <p className="font-medium mt-1">{selectedGroup.userCount} مستخدم</p>
            </div>
            <div>
              <Label>عدد الصلاحيات النشطة</Label>
              <p className="font-medium mt-1">
                {Object.values(selectedGroup.permissions).flat().length} صلاحية
              </p>
            </div>
          </div>
          
          {selectedGroup.userCount > 0 && (
            <div className="mt-4 text-sm text-muted-foreground bg-orange-50 p-3 rounded-lg border border-orange-200">
              <strong>تنبيه:</strong> هذه المجموعة تحتوي على مستخدمين نشطين. 
              أي تغيير في الصلاحيات سيؤثر على جميع المستخدمين في هذه المجموعة.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}