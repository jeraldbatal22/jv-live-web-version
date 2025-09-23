'use client';

import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import VerifyEmailOtp from './_components/verify-email-otp';
import { useMemo, useState } from 'react';
import CreatePassword from './_components/create-password';
import YourDetails from './_components/your-details';
import YourInterests from './_components/your-interests';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createAccountSchema,
  CreateAccountFormData,
  // otpSchema,
  // createPasswordSchema,
  // OtpFormData,
  // yourDetailsSchema,
} from '@/lib/validations/auth';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Check } from 'lucide-react';

const CreateAcountPage = () => {
  const [selectedTabValue, setSelectedTabValue] = useState('email-otp');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const form = useForm<CreateAccountFormData>({
    resolver: zodResolver(createAccountSchema),
      // selectedTabValue === 'email-otp'
      //   ? zodResolver(otpSchema)
      //   : selectedTabValue === 'create-password'
      //   ? zodResolver(createPasswordSchema)
      //   : selectedTabValue === 'your-details'
      //   ? zodResolver(yourDetailsSchema)
      //   : undefined,
    mode: 'onSubmit',
    defaultValues: {
      otp: '',
      password: '',
      confirmPassword: '',
      interests: [],
      username: '',
      firstName: '',
      lastName: '',
      middleName: '',
      birthday: '',
      gender: '',
    },
  });
  const { handleSubmit } = form;

  const displayProgressValue = useMemo(() => {
    switch (selectedTabValue) {
      case 'email-otp':
        return 25;
      case 'create-password':
        return 50;
      case 'your-interest':
        return 75;
      case 'your-details':
        return 100;
      default:
        return 0;
    }
  }, [selectedTabValue]);

  const onSubmit = async (data: CreateAccountFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Implement actual form submission logic
      console.log('Complete form data:', data);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextStep = () => {
    switch (selectedTabValue) {
      case 'email-otp':
        setSelectedTabValue('create-password');
        break;
      case 'create-password':
        setSelectedTabValue('your-interest');
        break;
      case 'your-interest':
        setSelectedTabValue('your-details');
        break;
      default:
        break;
    }
  };

  const handlePreviousStep = () => {
    switch (selectedTabValue) {
      case 'create-password':
        setSelectedTabValue('email-otp');
        break;
      case 'your-interest':
        setSelectedTabValue('create-password');
        break;
      case 'your-details':
        setSelectedTabValue('your-interest');
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex min-h-dvh items-center justify-center px-4 py-6 sm:px-6">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-4 sm:space-y-5"
        >
          <Tabs value={selectedTabValue} className="w-full space-y-4 sm:space-y-5">
            <Progress
              value={displayProgressValue}
              className="active:bg-red-500"
            />
          <TabsContent value="email-otp">
            <VerifyEmailOtp
              // now uses form context inside component
              onHandleChangeTab={handleNextStep}
            />
          </TabsContent>
          <TabsContent value="create-password">
            <CreatePassword
              onHandleChangeTab={handleNextStep}
              onHandlePreviousTab={handlePreviousStep}
            />
          </TabsContent>
          <TabsContent value="your-interest">
            <YourInterests
              onHandleChangeTab={handleNextStep}
              onHandlePreviousTab={handlePreviousStep}
            />
          </TabsContent>
          <TabsContent value="your-details">
            <YourDetails
              isSubmitting={isSubmitting}
            />
          </TabsContent>
        </Tabs>
        </form>
      </Form>
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="bg-[#191419] border border-white/5">
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4 grid h-24 w-24 place-items-center rounded-full bg-[#0a0f0a]">
              <div className="grid h-20 w-20 place-items-center rounded-full bg-[#00FF00]">
                <Check className="h-10 w-10 text-black" />
              </div>
            </div>
            <DialogTitle className="uppercase">Registration Complete!</DialogTitle>
            <DialogDescription>
              You&apos;re all set and ready to start your livestreaming journey. Explore streams, go live, or connect with friends now!
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={() => {
              window.location.href = "/"
              setShowSuccessModal(false)
            }}
            className="mt-4 h-12 w-full rounded-full bg-[linear-gradient(105deg,#FE39F0_0%,#EE003F_100%)] text-lg font-bold text-white"
          >
            DONE
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateAcountPage;
