import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  CheckCircle2, 
  Users, 
  ArrowRight,
  ArrowLeft,
  Zap,
  Target,
  Mail,
  FileText,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { seedDemoData } from '@/lib/data';
import { cn } from '@/lib/utils';

const steps = [
  {
    title: 'Welcome to Office Brilliance',
    description: 'A unified business workspace designed to integrate your entire operational stack with absolute clarity and control.',
    icon: (
      <div className="relative group mx-auto mb-10">
        <div className="absolute inset-0 bg-accent/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
        <div className="relative w-24 h-24 bg-accent text-white rounded-[2.5rem] flex items-center justify-center shadow-2xl glow-accent mx-auto">
          <Sparkles className="w-12 h-12 fill-current" />
        </div>
      </div>
    ),
  },
  {
    title: 'Unified Communication',
    description: 'Connect your existing email infrastructure via IMAP/SMTP and synchronize team discussions through integrated chat and HD video meetings.',
    icon: (
      <div className="relative group mx-auto mb-10">
        <div className="absolute inset-0 bg-teal-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
        <div className="relative w-24 h-24 bg-teal-500 text-white rounded-[2.5rem] flex items-center justify-center shadow-2xl mx-auto">
          <Mail className="w-12 h-12" />
        </div>
      </div>
    ),
  },
  {
    title: 'Document Collaboration',
    description: 'Create and edit documents, spreadsheets, and presentations in real-time with ONLYOFFICE, directly within your secure workspace.',
    icon: (
      <div className="relative group mx-auto mb-10">
        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
        <div className="relative w-24 h-24 bg-blue-500 text-white rounded-[2.5rem] flex items-center justify-center shadow-2xl mx-auto">
          <FileText className="w-12 h-12" />
        </div>
      </div>
    ),
  },
  {
    title: 'Initialize Workspace',
    description: 'We are preparing your environment. Standard workspace modules will be initialized to assist in your transition.',
    icon: (
      <div className="relative group mx-auto mb-10">
        <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
        <div className="relative w-24 h-24 bg-emerald-500 text-white rounded-[2.5rem] flex items-center justify-center shadow-2xl mx-auto">
          <CheckCircle2 className="w-12 h-12" />
        </div>
      </div>
    ),
  }
];

export function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsFinishing(true);
      if (user) {
        await seedDemoData(user.id);
      }
      navigate('/');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden px-4">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] -mr-96 -mt-96" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px] -ml-72 -mb-72" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)', backgroundSize: '60px 60px' }} />

      <div className="w-full max-w-2xl relative z-10">
        <div className="flex justify-center mb-16">
          <div className="flex items-center gap-3 bg-white/40 dark:bg-slate-900/40 p-2 rounded-full border border-border/50 shadow-sm backdrop-blur-md">
            {steps.map((_, i) => (
              <div 
                key={i} 
                className={cn(
                  "h-2 rounded-full transition-all duration-500",
                  i === currentStep ? "w-12 bg-accent glow-accent" : "w-2 bg-muted-foreground/20"
                )} 
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card className="border-none shadow-2xl bg-white/60 dark:bg-slate-950/60 backdrop-blur-2xl rounded-[3rem] p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-20" />
              
              <CardContent className="p-0">
                {steps[currentStep].icon}
                <div className="space-y-4 mb-16">
                  <h2 className="text-4xl font-black tracking-tighter gradient-text">{steps[currentStep].title}</h2>
                  <p className="text-lg text-muted-foreground/80 font-medium leading-relaxed max-w-md mx-auto">
                    {steps[currentStep].description}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-6">
                  <Button 
                    variant="ghost" 
                    onClick={handleBack} 
                    disabled={currentStep === 0 || isFinishing}
                    className="flex-1 h-14 rounded-2xl font-black text-xs uppercase tracking-[0.2em] text-muted-foreground/60 hover:text-primary transition-all"
                  >
                    <ArrowLeft className="w-4 h-4 mr-3" />
                    Revert
                  </Button>
                  <Button 
                    onClick={handleNext} 
                    disabled={isFinishing}
                    className="flex-[2] h-14 rounded-2xl font-black text-xs uppercase tracking-[0.2em] bg-primary text-primary-foreground shadow-2xl shadow-primary/20 transition-all active:scale-95 glow-accent group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <span className="relative z-10">{isFinishing ? 'Deploying Protocols...' : (currentStep === steps.length - 1 ? 'Activate Workspace' : 'Advance Sequence')}</span>
                    {!isFinishing && currentStep !== steps.length - 1 && <ArrowRight className="ml-3 h-4 w-4 relative z-10 transition-transform group-hover:translate-x-1" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 text-center">
          <p className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.4em]">Office Brilliance Workspace Initialization Sequence</p>
        </div>
      </div>
    </div>
  );
}
