import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { 
  Weight, 
  Calculator, 
  Save, 
  Settings,
  DollarSign,
  Info,
  AlertTriangle
} from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

interface WeightSettings {
  baseWeight: number;
  baseCost: number;
  additionalWeightCost: number;
}

export function WeightSettings() {
  const [settings, setSettings] = useState<WeightSettings>({
    baseWeight: 1.0,
    baseCost: 25.0,
    additionalWeightCost: 5.0
  });

  const [tempSettings, setTempSettings] = useState<WeightSettings>({...settings});
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const validateSettings = (): boolean => {
    const newErrors: string[] = [];

    if (tempSettings.baseWeight <= 0) {
      newErrors.push('الوزن الأساسي يجب أن يكون أكبر من 0');
    }

    if (tempSettings.baseCost < 0) {
      newErrors.push('التكلفة الأساسية لا يمكن أن تكون سالبة');
    }

    if (tempSettings.additionalWeightCost < 0) {
      newErrors.push('تكلفة الكيلو الإضافي لا يمكن أن تكون سالبة');
    }

    if (tempSettings.baseWeight > 50) {
      newErrors.push('الوزن الأساسي لا يجب أن يتجاوز 50 كجم');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSave = async () => {
    if (!validateSettings()) {
      return;
    }

    setIsSaving(true);
    
    // محاكاة عملية الحفظ
    setTimeout(() => {
      setSettings({...tempSettings});
      setLastSaved(new Date());
      setIsSaving(false);
      setErrors([]);
    }, 1000);
  };

  const handleReset = () => {
    setTempSettings({...settings});
    setErrors([]);
  };

  const calculateExampleCost = (weight: number): number => {
    if (weight <= tempSettings.baseWeight) {
      return tempSettings.baseCost;
    } else {
      const additionalWeight = weight - tempSettings.baseWeight;
      return tempSettings.baseCost + (additionalWeight * tempSettings.additionalWeightCost);
    }
  };

  const hasChanges = () => {
    return JSON.stringify(settings) !== JSON.stringify(tempSettings);
  };

  const formatCurrency = (amount: number): string => {
    return `${amount.toFixed(2)} ريال`;
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>إعدادات الوزن وتكلفة الشحن</h1>
        <p className="text-muted-foreground">
          تكوين تكلفة الشحن بناءً على وزن الطرود
        </p>
      </div>

      {/* معلومات الإعدادات الحالية */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-800 flex items-center">
            <Info className="h-5 w-5 mr-2" />
            الإعدادات الحالية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-700">{settings.baseWeight} كجم</div>
              <p className="text-sm text-blue-600">الوزن الأساسي</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-700">{formatCurrency(settings.baseCost)}</div>
              <p className="text-sm text-blue-600">التكلفة الأساسية</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-700">{formatCurrency(settings.additionalWeightCost)}</div>
              <p className="text-sm text-blue-600">تكلفة كل كجم إضافي</p>
            </div>
          </div>
          {lastSaved && (
            <p className="text-xs text-blue-600 mt-4 text-center">
              آخر تحديث: {formatDate(lastSaved)}
            </p>
          )}
        </CardContent>
      </Card>

      {/* نموذج تعديل الإعدادات */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            تعديل إعدادات التكلفة
          </CardTitle>
          <CardDescription>
            قم بتعديل إعدادات حساب تكلفة الشحن بناءً على الوزن
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* رسائل الخطأ */}
          {errors.length > 0 && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <ul className="list-disc list-inside space-y-1">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {/* إعدادات التكلفة الأساسية */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Weight className="h-5 w-5 text-blue-600" />
              <h3 className="font-medium">الإعدادات الأساسية</h3>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="baseWeight" className="flex items-center">
                  <Weight className="h-4 w-4 mr-2" />
                  الوزن الأساسي (كجم)
                </Label>
                <Input
                  id="baseWeight"
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="50"
                  value={tempSettings.baseWeight}
                  onChange={(e) => setTempSettings({
                    ...tempSettings,
                    baseWeight: parseFloat(e.target.value) || 0
                  })}
                  placeholder="0.0"
                  className="text-right"
                />
                <p className="text-xs text-muted-foreground">
                  من 0 كجم إلى {tempSettings.baseWeight} كجم
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="baseCost" className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2" />
                  التكلفة الأساسية (ريال)
                </Label>
                <Input
                  id="baseCost"
                  type="number"
                  step="0.01"
                  min="0"
                  value={tempSettings.baseCost}
                  onChange={(e) => setTempSettings({
                    ...tempSettings,
                    baseCost: parseFloat(e.target.value) || 0
                  })}
                  placeholder="0.00"
                  className="text-right"
                />
                <p className="text-xs text-muted-foreground">
                  التكلفة للوزن الأساسي
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* إعدادات الوزن الإضافي */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Calculator className="h-5 w-5 text-orange-600" />
              <h3 className="font-medium">الوزن الإضافي</h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalWeightCost" className="flex items-center">
                <DollarSign className="h-4 w-4 mr-2" />
                تكلفة كل كجم إضافي (ريال)
              </Label>
              <Input
                id="additionalWeightCost"
                type="number"
                step="0.01"
                min="0"
                value={tempSettings.additionalWeightCost}
                onChange={(e) => setTempSettings({
                  ...tempSettings,
                  additionalWeightCost: parseFloat(e.target.value) || 0
                })}
                placeholder="0.00"
                className="text-right max-w-md"
              />
              <p className="text-xs text-muted-foreground">
                التكلفة لكل كيلوجرام إضافي فوق الوزن الأساسي
              </p>
            </div>
          </div>

          <Separator />

          {/* أمثلة على الحساب */}
          <div className="space-y-4">
            <h3 className="font-medium flex items-center">
              <Calculator className="h-5 w-5 mr-2 text-green-600" />
              أمثلة على حساب التكلفة
            </h3>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[0.5, 1.0, 2.5, 5.0].map((weight) => (
                <div key={weight} className="p-4 border rounded-lg bg-green-50">
                  <div className="text-center">
                    <div className="font-bold text-lg">{weight} كجم</div>
                    <div className="text-green-700 font-medium">
                      {formatCurrency(calculateExampleCost(weight))}
                    </div>
                    {weight <= tempSettings.baseWeight ? (
                      <Badge variant="secondary" className="mt-1">وزن أساسي</Badge>
                    ) : (
                      <Badge variant="outline" className="mt-1">
                        +{(weight - tempSettings.baseWeight).toFixed(1)} كجم
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* أزرار الحفظ */}
          <div className="flex justify-between pt-4">
            <Button 
              variant="outline" 
              onClick={handleReset}
              disabled={!hasChanges()}
            >
              إعادة تعيين
            </Button>
            
            <Button 
              onClick={handleSave}
              disabled={!hasChanges() || isSaving}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  جاري الحفظ...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  حفظ الإعدادات
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* معلومات إضافية */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="text-yellow-800">ملاحظات مهمة</CardTitle>
        </CardHeader>
        <CardContent className="text-yellow-700">
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>سيتم تطبيق الإعدادات الجديدة على جميع الطلبات المستقبلية</li>
            <li>الطلبات الحالية ستحتفظ بالإعدادات المحفوظة وقت إنشائها</li>
            <li>تأكد من مراجعة الأمثلة قبل الحفظ للتأكد من صحة الحسابات</li>
            <li>يمكن تعديل هذه الإعدادات في أي وقت من قبل المديرين فقط</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}