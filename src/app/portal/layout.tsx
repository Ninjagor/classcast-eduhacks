import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyJwt } from "@/utils/jwt";

export const metadata = {
  title: "ClassCast | Portal",
  description: "ClassCast - Educate Hacks '24",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {    
    const cookieStore = cookies();
    if ((!(cookieStore.get('token'))) || (!(verifyJwt(cookieStore.get('token')!.value).isValid))) {
        redirect('/auth/signup');
    }
    if (!(cookieStore.get('role')) || (!(cookieStore.get('uid')))) {
        redirect('/auth/signup');
    }    
  return (
    <>
        {children}
    </>
  );
}
