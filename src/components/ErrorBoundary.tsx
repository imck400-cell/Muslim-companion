import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      let errorMessage = 'حدث خطأ غير متوقع في التطبيق.';
      let isQuotaError = false;

      try {
        const errorData = JSON.parse(this.state.error?.message || '{}');
        if (errorData.error === 'Quota exceeded.') {
          isQuotaError = true;
          errorMessage = 'تم تجاوز حصة الاستخدام اليومية المجانية لقاعدة البيانات (Firebase Quota Exceeded).';
        }
      } catch (e) {
        // Not a JSON error message
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 text-right" dir="rtl">
          <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 border border-slate-100">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            
            <h2 className="text-2xl font-bold text-slate-800 mb-4 text-center">عذراً، حدث خطأ</h2>
            
            <div className="bg-slate-50 p-4 rounded-2xl mb-6 text-sm text-slate-600 leading-relaxed">
              <p className="mb-2">{errorMessage}</p>
              {isQuotaError ? (
                <p>يرجى الانتظار حتى يتم تصفير الحصة اليومية (عادةً في اليوم التالي) أو التواصل مع المطور لترقية الخطة.</p>
              ) : (
                <p>يمكنك محاولة تحديث الصفحة أو العودة لاحقاً.</p>
              )}
            </div>

            <button 
              onClick={this.handleReset}
              className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              تحديث الصفحة
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
