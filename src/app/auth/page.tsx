import TabSwitcher from '@/components/ui/tabswitcher';
import { redirect } from 'next/navigation';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import DonateIcon from '@Images/donate-icon.png';
import Logo from '@Images/logo.png';
import { getUser } from '@/lib/lucia';
import Image from 'next/image';

const AuthenticatePage = async () => {
  const user = await getUser();
  if (user) {
    return redirect('/');
  }

  return (
    <>
        <div className='absolute top-0'>
            <Image src={Logo} alt="Logo" width="200" height="200" className='mx-4 my-4' />
        </div>
        <div className="relative flex min-h-screen overflow-y-scroll no-scrollbar">
            {/* Form Container */}
            <div
                className="pt-8 w-[60vw] min-w-[60vw] flex p-40 mt-28"
            >
                <TabSwitcher FirstTitle="Masuk" SecondTitle="Daftar" FirstTab={<SignInForm />} SecondTab={<SignUpForm />} />
            </div>
            
            
            <div className='w-full bg-[#2C63D2] h-screen flex items-center justify-center'>
                <Image src={DonateIcon} alt="Donate Icon" width="1000" height="1000" objectFit='cover' className='bottom-0'/>
            </div>
        </div>
    </>
  );
};

export default AuthenticatePage;
