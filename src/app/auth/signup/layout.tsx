import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyJwt } from "@/utils/jwt";

export const metadata = {
  title: "ClassCast | Onboarding",
  description: "ClassCast - Educate Hacks '24",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {    
    const cookieStore = cookies();
    if (cookieStore.get('token') && (verifyJwt(cookieStore.get('token')!.value).isValid)) {
        redirect('/portal');
    }
  return (
    <>
        {children}
        <div className="flex gap-1 items-center justify-center w-full px-8 mt-9">
            <p>Already have an account?</p>
            <Link href="/auth/login" className="text-orange-600 hover:underline">Log in.</Link>
        </div>
    </>
  );
}
